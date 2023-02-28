import RenderBlocks from './RenderBlocks'
import Image from '@components/notion/Image'
import Text from '@components/notion/Text'
import Code from '@components/notion/Code'
import Callout from '@components/notion/Callout'
import 'katex/dist/katex.min.css'
import { BlockMath } from 'react-katex'

import { queryChildrenBlocks } from '@root/shared/notion'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

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

  let content: JSX.Element
  const text = value?.rich_text && <Text text={value.rich_text} />

  switch (type) {
    case 'paragraph':
      content = <p>{text}</p>
      break

    case 'heading_1':
      content = (
        <>
          {value?.is_toggleable ? (
            <details>
              <summary>
                <span className={cx('summary-heading')}>{text}</span>
              </summary>
              {children?.results.map(block => (
                /* @ts-expect-error Server Component */
                <Block key={block.id} block={block as BlockObjectResponse} classNames="summary" />
              ))}
            </details>
          ) : (
            <h1>{text}</h1>
          )}
        </>
      )
      break

    case 'heading_2':
      content = (
        <>
          {value?.is_toggleable ? (
            <details>
              <summary>
                <span className={cx('summary-heading')}>{text}</span>
              </summary>
              {children?.results.map(block => (
                /* @ts-expect-error Server Component */
                <Block key={block.id} block={block as BlockObjectResponse} classNames="summary" />
              ))}
            </details>
          ) : (
            <h2>{text}</h2>
          )}
        </>
      )
      break

    case 'heading_3':
      content = (
        <>
          {value?.is_toggleable ? (
            <details>
              <summary>
                <span className={cx('summary-heading')}>{text}</span>
              </summary>
              {children?.results.map(block => (
                /* @ts-expect-error Server Component */
                <Block key={block.id} block={block as BlockObjectResponse} classNames="summary" />
              ))}
            </details>
          ) : (
            <h3>{text}</h3>
          )}
        </>
      )
      break

    case 'bulleted_list_item':
    case 'numbered_list_item':
      content = (
        <li>
          <Text text={value.rich_text} />
          {children?.results && <RenderBlocks blocks={children?.results as BlockObjectResponse[]} />}
        </li>
      )
      break

    case 'to_do':
      content = (
        <>
          {value.checked ? <div className={cx('checkbox', 'checked')} /> : <div className={cx('checkbox')} />}
          {value?.rich_text && <Text text={value.rich_text} />}
        </>
      )
      break

    case 'toggle':
      content = (
        <details>
          <summary>{text}</summary>
          {children?.results.map(block => (
            /* @ts-expect-error Server Component */
            <Block key={block.id} block={block as BlockObjectResponse} classNames="summary" />
          ))}
        </details>
      )
      break

    case 'image':
      const src = value.type === 'external' ? value?.external?.url : value?.file?.url
      const caption = value?.caption ? value.caption[0]?.plain_text : ''

      content = <Image id={id} src={src} caption={caption} />
      break

    case 'divider':
      content = <hr key={id} />
      break

    case 'quote':
      content = <blockquote>{text}</blockquote>
      break

    case 'equation':
      content = <BlockMath>{value?.expression}</BlockMath>
      break

    case 'code':
      const code = value?.rich_text?.map(({ text }) => text.content).join('') || ''
      content = <Code value={value}>{code}</Code>
      break

    case 'callout':
      content = <Callout value={value}>{text}</Callout>
      break

    default:
      console.log('Unknown block type:', type)
      content = null
  }

  if (!content) return null
  return <div className={cx('root', type, classNames)}>{content}</div>
}
