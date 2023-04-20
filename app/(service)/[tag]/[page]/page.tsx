import Row, { ROW_TYPE } from '@components/layout/Row'
import PageCard from '@components/PageCard'
import Pagination from '@components/Pagination'

import { queryDatabase, calcFeedPageSize } from '@shared/notion'
import { extractDabaseTags } from '@shared/utils/notion'

const tagPropertyName = 'tag'
export const revalidate = 600
export async function generateStaticParams() {
  const tags = await extractDabaseTags(tagPropertyName)
  const params = []

  for (const tag of tags) {
    const maxPage = await calcFeedPageSize(10, [
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

export default async function FeedPageComponent({ params }: { params: { tag: string; page: string } }) {
  const page = parseInt(params.page)
  const filter = [
    {
      property: tagPropertyName,
      multi_select: {
        contains: params.tag,
      },
    },
  ]
  const pages = await queryDatabase(10, page, filter)
  const maxPage = await calcFeedPageSize(10, filter)

  return (
    <Row type={ROW_TYPE.FULL_SCREEN}>
      {pages.map(page => (
        <PageCard key={page.id} page={page} />
      ))}
      <Pagination tag={params.tag} curPage={page} maxPageSize={maxPage} />
    </Row>
  )
}
