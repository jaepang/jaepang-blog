import { calcFeedPageSize, queryDatabase } from '@shared/notion'

const PAGE_SIZE = 10

export async function getStaticPaths() {
  const maxPage = await calcFeedPageSize(PAGE_SIZE, undefined)

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
    revalidate: 60,
  }
}

export async function getStaticProps({ params: { page } }) {
  const pages = await queryDatabase(PAGE_SIZE, parseInt(page), undefined)
  const maxPage = await calcFeedPageSize(PAGE_SIZE, undefined)

  return {
    props: {
      pages,
      maxPage,
    },
    revalidate: 60,
  }
}
