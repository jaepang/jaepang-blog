import Block from '@components/notion/Block'

import { getTitlePlaintext, queryBlocks, queryPageIds, retrerivePage } from '@shared/notion'

import {
  BlockObjectResponse,
  ListBlockChildrenResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

/*
import classNames from 'classnames/bind'
import styles from './ArticlePageComponent.module.css'
const cx = classNames.bind(styles)
*/

export const revalidate = 60
export async function generateStaticParams() {
  const pageIds = await queryPageIds(undefined)
  return pageIds.map(pageId => ({ pageId: pageId }))
}

export default async function ArticlePage({ params }: { params: { pageId: string } }) {
  const page = await retrerivePage(params.pageId)
  const title = getTitlePlaintext(page as PageObjectResponse)
  const blocks = await queryBlocks(params.pageId)

  return (
    <div>
      <h1>{title}</h1>
      {blocks.results.map(block => Block(block as BlockObjectResponse))}
    </div>
  )
}
