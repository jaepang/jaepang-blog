import PageCard from '@components/PageCard'
import Pagination from '@components/Pagination'

import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import classNames from 'classnames/bind'
import styles from './FeedPageComponent.module.css'
const cx = classNames.bind(styles)

interface Props {
  pages: PageObjectResponse[]
  maxPage: number
}

export default function FeedPageComponent({ pages, maxPage }: Props) {
  return (
    <div className={cx('root')}>
      {pages.map(page => (
        <PageCard key={page.id} page={page} />
      ))}
      <Pagination maxPageSize={maxPage} />
    </div>
  )
}
