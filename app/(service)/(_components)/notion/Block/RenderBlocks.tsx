import Block from '.'

import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import classNames from 'classnames/bind'
import styles from './Block.module.css'
const cx = classNames.bind(styles)

export default function RenderBlocks({ blocks }: { blocks: BlockObjectResponse[] }) {
  const blockComponents = []
  let idx = 0
  const numBlocks = blocks.length

  while (idx < numBlocks) {
    const block = blocks[idx]
    const { type } = block

    if (type === 'numbered_list_item' || type === 'bulleted_list_item') {
      const start = idx
      let end = idx
      while (idx < numBlocks && blocks?.[end]?.type === type) {
        end++
      }
      const listItems = blocks.slice(start, end)

      blockComponents.push(
        <ol className={cx('list', { ordered: type === 'numbered_list_item' })}>
          {listItems.map(block => (
            /* @ts-expect-error Server Component */
            <Block key={block.id} block={block as BlockObjectResponse} />
          ))}
        </ol>,
      )

      idx = end
    } else {
      /* @ts-expect-error Server Component */
      blockComponents.push(<Block key={block.id} block={block as BlockObjectResponse} />)
      idx++
    }
  }

  return <>{blockComponents.map(block => block)}</>
}
