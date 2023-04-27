import Row, { ROW_TYPE } from '@components/layout/Row'
import PageCard from '@components/PageCard'
import Pagination from '@components/Pagination'

import { queryDatabase, calcFeedPageSize } from '@shared/notion'
import { tagPropertyName, postsPerPage } from './config'

export { revalidate, generateStaticParams } from './config'

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
