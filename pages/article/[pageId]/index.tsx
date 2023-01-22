import Layout from '@components/Layout'
import ArticlePageComponent from '@components/pages/article/ArticlePageComponent'

export { getStaticPaths, getStaticProps } from './getStatics'

export default function ArticlePage({ title, blocks }) {
  return (
    <Layout>
      <ArticlePageComponent {...{ title, blocks }} />
    </Layout>
  )
}
