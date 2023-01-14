import Layout from '@components/Layout'
import PageCard from '@components/PageCard'
import Pagination from '@components/Pagination'

export { getStaticPaths, getStaticProps } from './getStatics'

import classNames from 'classnames/bind'
import styles from './FeedPage.module.css'
const cx = classNames.bind(styles)

export default function FeedPage({ pages, maxPage }) {
  return (
    <Layout>
      <div className={cx('root')}>
        {pages.map(page => (
          <PageCard key={page.id} page={page} />
        ))}
        <Pagination maxPageSize={maxPage} />
      </div>
    </Layout>
  )
}
