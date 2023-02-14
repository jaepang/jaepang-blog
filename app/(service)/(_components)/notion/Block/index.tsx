import Image from '@components/notion/Image'
import Text from '@components/notion/Text'
import List from './List'

import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import classNames from 'classnames/bind'
import styles from './Block.module.css'
const cx = classNames.bind(styles)

export default function Block(block: BlockObjectResponse) {
  const { type, id } = block
  const value = block[type]
  let content: JSX.Element

  switch (type) {
    case 'paragraph':
      content = <p>{value?.rich_text && <Text text={value.rich_text} />}</p>
      break
    case 'heading_1':
      content = <h1>{value?.rich_text && <Text text={value.rich_text} />}</h1>
      break
    case 'heading_2':
      content = <h2>{value?.rich_text && <Text text={value.rich_text} />}</h2>
      break
    case 'heading_3':
      content = <h3>{value?.rich_text && <Text text={value.rich_text} />}</h3>
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
          {value.children?.map(child => Block(child))}
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
      content = (
        <pre>
          <code>{value?.rich_text && <Text text={value.rich_text} />}</code>
        </pre>
      )
      break
    default:
      console.log('Unknown block type:', type)
      content = null
  }

  return <div className={cx('root', type)}>{content}</div>
}
