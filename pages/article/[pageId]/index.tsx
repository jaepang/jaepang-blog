import Layout from '@components/Layout'
import ArticlePageComponent from '@components/pages/article/ArticlePageComponent'

import { useRouter } from 'next/router'

export { getStaticPaths, getStaticProps } from './getStatics'

export default function ArticlePage({ title, blocks }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <ArticlePageComponent {...{ title, blocks }} />
    </Layout>
  )
}
