import PageCard from '@components/PageCard'

import { queryDatabase, calcFeedPageSize } from '@shared/notion'

import classNames from 'classnames/bind'
import styles from './FeedPage.module.css'
const cx = classNames.bind(styles)

const PAGE_SIZE = 10

export default function FeedPage({ pages }) {
  return (
    <div className={cx('root')}>
      {pages.map(page => (
        <PageCard key={page.id} page={page} />
      ))}
    </div>
  )
}

export async function getStaticPaths() {
  const maxPage = await calcFeedPageSize(PAGE_SIZE)

  const paths = Array(maxPage)
    .fill(0)
    .map((_, i) => ({
      params: {
        page: (i + 1).toString(),
      },
    }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params: { page } }) => {
  const pages = await queryDatabase(PAGE_SIZE, parseInt(page), undefined)

  return {
    props: {
      pages,
    },
  }
}
