import Block from '@components/notion/Block'

import { BlockObjectResponse, ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'

import classNames from 'classnames/bind'
import styles from './ArticlePageComponent.module.css'
const cx = classNames.bind(styles)

interface Props {
  title: string
  blocks: ListBlockChildrenResponse
}

export default function ArticlePageComponent({ title, blocks }: Props) {
  return (
    <div className={cx('root')}>
      <h1>{title}</h1>
      {blocks.results.map(block => Block(block as BlockObjectResponse))}
    </div>
  )
}
