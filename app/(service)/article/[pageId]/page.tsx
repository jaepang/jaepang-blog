import Block from '@components/notion/Block'
import Header from '@components/article/Header'

import { getTitlePlaintext, queryBlocks, queryPageIds, retrerivePage } from '@shared/notion'
import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import classNames from 'classnames/bind'
import styles from './ArticlePage.module.css'
const cx = classNames.bind(styles)

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
      <Header page={page as PageObjectResponse} />
      {blocks.results.map(block => Block(block as BlockObjectResponse))}
    </div>
  )
}
