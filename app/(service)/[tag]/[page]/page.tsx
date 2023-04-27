import Row, { ROW_TYPE } from '@components/layout/Row'
import PageCard from '@components/PageCard'
import Pagination from '@components/Pagination'

import { queryDatabase, calcFeedPageSize } from '@shared/notion'
import { extractDabaseTags } from '@shared/utils/notion'

const tagPropertyName = 'tag'
const postsPerPage = 10

export default async function FeedPageComponent({ params }: { params: { tag: string; page: string } }) {
  const page = parseInt(params.page)
  const { tag } = params
  const filter = [
    {
      property: tagPropertyName,
      multi_select: {
        contains: tag,
      },
    },
  ]
  const pages = await queryDatabase(postsPerPage, page, filter)
  const maxPage = await calcFeedPageSize(postsPerPage, filter)

  return (
    <Row as="section" type={ROW_TYPE.WIDE}>
      <h1>{tag}</h1>
      {pages.map(page => (
        <PageCard key={page.id} page={page} />
      ))}
      <Pagination tag={tag} curPage={page} maxPageSize={maxPage} />
    </Row>
  )
}

export const revalidate = 60
export async function generateStaticParams() {
  const tags = await extractDabaseTags(tagPropertyName)
  const params = []

  for (const tag of tags) {
    const maxPage = await calcFeedPageSize(postsPerPage, [
      {
        property: tagPropertyName,
        multi_select: {
          contains: tag,
        },
      },
    ])
    params.push(
      ...Array.from({ length: maxPage }, (_, i) => i + 1).map(page => ({
        tag,
        page: page.toString(),
      })),
    )
  }

  return params
}
