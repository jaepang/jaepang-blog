import { queryPageIds, retrerivePage, queryBlocks, getTitlePlaintext } from '@shared/notion'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export async function getStaticPaths() {
  const pageIds = await queryPageIds(undefined)

  const paths = pageIds.map((pageId, i) => ({
    params: {
      pageId,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { pageId } }) {
  const page = await retrerivePage(pageId)
  const title = getTitlePlaintext(page as PageObjectResponse)
  const blocks = await queryBlocks(pageId)

  return {
    props: {
      title,
      blocks,
    },
    revalidate: 10,
  }
}
