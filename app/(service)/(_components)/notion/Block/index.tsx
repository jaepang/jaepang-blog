import Image from '@components/notion/Image'
import Text from '@components/notion/Text'
import Code from '@components/notion/Code'
import List from './List'

import { queryChildrenBlocks } from '@root/shared/notion'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import classNames from 'classnames/bind'
import styles from './Block.module.css'
const cx = classNames.bind(styles)

export default async function Block({ block }: { block: BlockObjectResponse }) {
  const { type, id } = block
  const value = block[type]
  const children = await queryChildrenBlocks(id)
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
          {!!value.children && List({ block })}
        </li>
      )
      break
    case 'to_do':
      content = (
        <label htmlFor={id}>
          <input type="checkbox" id={id} checked={value.checked} disabled />
          {value?.rich_text && <Text text={value.rich_text} />}
        </label>
      )
      break
    case 'toggle':
      // console.log(value)
      content = (
        <details>
          <summary>{value?.rich_text && <Text text={value.rich_text} />}</summary>
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
    case 'code':
      const language = value.language?.toLowerCase() || 'text'
      const code = value?.rich_text?.map(({ text }) => text.content).join('') || ''

      content = (
        <pre>
          <Code language={language}>{code}</Code>
        </pre>
      )
      break
    default:
      console.log('Unknown block type:', type)
      content = null
  }

  return <div className={cx('root', type)}>{content}</div>
}
