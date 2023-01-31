import PageCard from '@components/PageCard'
import Pagination from '@components/Pagination'

import { queryDatabase, calcFeedPageSize } from '@shared/notion'

/*
import classNames from 'classnames/bind'
import styles from './FeedPageComponent.module.css'
const cx = classNames.bind(styles)
*/

export async function generateStaticParams() {
  const maxPage = await calcFeedPageSize(10, undefined)

  return Array.from({ length: maxPage }, (_, i) => i + 1).map(page => ({
    page: page.toString(),
  }))
}

export default async function FeedPageComponent({ params }: { params: { page: string } }) {
  const page = parseInt(params.page)

  const pages = await queryDatabase(10, page, undefined)
  const maxPage = await calcFeedPageSize(10, undefined)

  return (
    <div>
      {pages.map(page => (
        <PageCard key={page.id} page={page} />
      ))}
      <Pagination maxPageSize={maxPage} />
    </div>
  )
}
