'use client'

import PageCard from '@root/src/app/(service)/(_components)/feedPage/PageCard'

import { useDatabase } from '@root/src/client/hooks'

import classNames from 'classnames/bind'
import styles from './style/FeedPage.module.css'
const cx = classNames.bind(styles)

export default function FeedPageComponent({ prefetched }) {
  const { items, isLoading, hasNextPage, fetchNextPage } = useDatabase(prefetched)

  function handleLoadMore() {
    if (hasNextPage) fetchNextPage()
  }

  return (
    <div className={cx('root')}>
      {!isLoading && items.map(item => <PageCard key={item.id} page={item} />)}
      {hasNextPage && <button onClick={handleLoadMore}>Click me!</button>}
    </div>
  )
}
