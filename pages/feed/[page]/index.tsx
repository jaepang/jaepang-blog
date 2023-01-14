import Layout from '@components/Layout'
import FeedPageComponent from '@components/pages/feed/FeedPageComponent'

export { getStaticPaths, getStaticProps } from './getStatics'

export default function FeedPage({ pages, maxPage }) {
  return (
    <Layout>
      <FeedPageComponent {...{ pages, maxPage }} />
    </Layout>
  )
}
