import { queryPageIds, retrerivePage } from '@shared/notion'

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

  return {
    props: {
      page,
    },
  }
}
