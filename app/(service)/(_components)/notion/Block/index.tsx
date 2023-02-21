import RenderBlocks from './RenderBlocks'
import Image from '@components/notion/Image'
import Text from '@components/notion/Text'
import Code from '@components/notion/Code'
import 'katex/dist/katex.min.css'
import { BlockMath } from 'react-katex'

import { queryChildrenBlocks } from '@root/shared/notion'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { CSSProperties } from 'react'

import classNames from 'classnames/bind'
import styles from './Block.module.css'
const cx = classNames.bind(styles)

export default async function Block({ block }: { block: BlockObjectResponse }) {
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
                <Block key={block.id} block={block as BlockObjectResponse} />
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
                <Block key={block.id} block={block as BlockObjectResponse} />
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
                <Block key={block.id} block={block as BlockObjectResponse} />
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
            <Block key={block.id} block={block as BlockObjectResponse} />
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
      content = <blockquote>{value?.rich_text && <Text text={value.rich_text} />}</blockquote>
      break

    case 'equation':
      content = <BlockMath>{value?.expression}</BlockMath>
      break

    case 'code':
      const language = value.language?.toLowerCase() || 'text'
      const code = value?.rich_text?.map(({ text }) => text.content).join('') || ''

      content = (
        <pre>
          <Code language={language}>{code}</Code>
        </pre>
      )
      break

    case 'callout':
      const { color } = value
      let style: CSSProperties

      if (color?.includes('background')) {
        style = {
          backgroundColor: `var(--color-bg-${color.slice(0, -11) ?? 'gray'})`,
        }
      } else {
        style = {
          backgroundColor: 'transparent',
          border: '1px solid var(--color-light-gray-border)',
          color: `var(--color-text-${color}) !important`,
        }
      }

      content = (
        <div className={cx('callout-body')} style={style}>
          {value?.icon?.emoji && <span className={cx('emoji')}>{value.icon.emoji}</span>}
          <div className={cx('text')}>{value?.rich_text && <Text text={value.rich_text} />}</div>
        </div>
      )
      break

    default:
      console.log('Unknown block type:', type)
      content = null
  }

  if (!content) return null
  return <div className={cx('root', type)}>{content}</div>
}
