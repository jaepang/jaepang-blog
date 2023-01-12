import PageCard from '@components/PageCard'
import Pagination from '@components/Pagination'

import { queryDatabase, calcFeedPageSize } from '@app/shared/notion'

import classNames from 'classnames/bind'
import styles from './FeedPage.module.css'
const cx = classNames.bind(styles)

const PAGE_SIZE = 10

export default async function FeedPage({ params: { page } }) {
  const pages = await queryDatabase(PAGE_SIZE, page, undefined)

  return (
    <div className={cx('root')}>
      {pages.map(page => (
        <PageCard key={page.id} page={page} />
      ))}
    </div>
  )
}
