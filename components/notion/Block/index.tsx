import Image from 'next/image'
import Text from '@components/notion/Text'
import List from './List'

import { useState } from 'react'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import classNames from 'classnames/bind'
import styles from './Block.module.css'
const cx = classNames.bind(styles)

export default function Block(block: BlockObjectResponse) {
  const [imgClicked, setImgClicked] = useState(false)
  const { type, id } = block
  const value = block[type]
  console.log(type)

  function handleImgClick() {
    setImgClicked(!imgClicked)
  }

  switch (type) {
    case 'paragraph':
      return <p>{value?.rich_text && <Text text={value.rich_text} />}</p>
    case 'heading_1':
      return <h1>{value?.rich_text && <Text text={value.rich_text} />}</h1>
    case 'heading_2':
      return <h2>{value?.rich_text && <Text text={value.rich_text} />}</h2>
    case 'heading_3':
      return <h3>{value?.rich_text && <Text text={value.rich_text} />}</h3>
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li>
          <Text text={value.rich_text} />
          {!!value.children && List({ block })}
        </li>
      )
    case 'to_do':
      return (
        <label htmlFor={id}>
          <input type="checkbox" id={id} checked={value.checked} disabled />
          {value?.rich_text && <Text text={value.rich_text} />}
        </label>
      )
    case 'toggle':
      console.log(value)
      return (
        <details>
          <summary>{value?.rich_text && <Text text={value.rich_text} />}</summary>
          {value.children?.map(child => Block(child))}
        </details>
      )
    case 'image':
      const src = value.type === 'external' ? value?.external.url : value?.file.url
      const caption = value?.caption ? value.caption[0]?.plain_text : ''

      return (
        <figure onClick={handleImgClick}>
          <div className={cx('image-wrapper')}>
            <Image src={src} alt={caption} />
          </div>
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      )
    case 'divider':
      return <hr key={id} />
    case 'quote':
      return <blockquote>{value?.rich_text && <Text text={value.rich_text} />}</blockquote>
    case 'code':
      return (
        <pre>
          <code>{value?.rich_text && <Text text={value.rich_text} />}</code>
        </pre>
      )
    default:
      return null
  }
}
