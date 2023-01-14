import PageCard from '@components/PageCard'
import Pagination from '@components/Pagination'

import classNames from 'classnames/bind'
import styles from './FeedPageComponent.module.css'
const cx = classNames.bind(styles)

export default function FeedPageComponent({ pages, maxPage }) {
  return (
    <div className={cx('root')}>
      {pages.map(page => (
        <PageCard key={page.id} page={page} />
      ))}
      <Pagination maxPageSize={maxPage} />
    </div>
  )
}
