import RenderBlocks from './RenderBlocks'
import { Callout, Code, ImageBlock, Table, Text, ToggleContent } from '@components/notion'
import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

import { ElementType } from 'react'
import { queryChildrenBlocks } from '@shared/notion'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import probe from 'probe-image-size'
import { getPlaiceholder } from 'plaiceholder'

import classNames from 'classnames/bind'
import styles from './Block.module.css'
const cx = classNames.bind(styles)

interface Props {
  block: BlockObjectResponse
  classNames?: string
}

export default async function Block({ block, classNames }: Props) {
  const { type, id, has_children } = block
  const value = block[type]
  const children = has_children && (await queryChildrenBlocks(id))
  const text = value?.rich_text && <Text text={value.rich_text} />
  let Element: ElementType = 'div'
  let content: JSX.Element = text

  switch (type) {
    case 'paragraph':
      Element = 'p'
      break
    case 'quote':
      Element = 'blockquote'
      break
    case 'divider':
      content = <></>
      break

    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
      const Heading: ElementType = type === 'heading_1' ? 'h1' : type === 'heading_2' ? 'h2' : 'h3'
      const isToggle = value?.is_toggleable
      Element = isToggle ? 'details' : Heading
      content = isToggle ? (
        <ToggleContent summary={text} detail={children} summaryClassName={cx('summary-heading')} />
      ) : (
        text
      )
      break

    case 'bulleted_list_item':
    case 'numbered_list_item':
      Element = 'li'
      content = (
        <>
          {text}
          {children?.results && <RenderBlocks blocks={children?.results as BlockObjectResponse[]} />}
        </>
      )
      break

    case 'to_do':
      content = (
        <>
          <div className={cx('checkbox', { checked: value?.checked })} />
          {text}
        </>
      )
      break

    case 'toggle':
      Element = 'details'
      content = <ToggleContent summary={text} detail={children} />
      break

    case 'image':
      const src = value.type === 'external' ? value?.external?.url : value?.file?.url
      const caption = value?.caption ? value.caption[0]?.plain_text : ''
      const size = await probe(src)
      let blurSrc: string | undefined
      try {
        const { base64 } = await getPlaiceholder(src)
        blurSrc = base64
      } catch (e) {
        blurSrc = undefined
      }

      content = (
        <ImageBlock
          {...{
            id,
            src,
            blurSrc,
            caption,
            size,
          }}
        />
      )
      break

    case 'equation':
      content = <BlockMath>{value?.expression}</BlockMath>
      break

    case 'code':
      const code = value?.rich_text?.map(({ text }) => text.content).join('') || ''
      const language = value?.language?.toLowerCase() || 'text'
      content = <Code language={language}>{code}</Code>
      break

    case 'callout':
      content = <Callout value={value}>{text}</Callout>
      break

    case 'table':
      content = <Table table={value} childrenBlocks={children.results as BlockObjectResponse[]} />
      break

    default:
      // console.log('Unknown block type:', type)
      content = null
  }

  if (!content) return null
  return <Element className={cx('root', type, classNames)}>{content}</Element>
}
