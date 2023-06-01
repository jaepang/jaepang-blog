import Row, { ROW_TYPE } from '@components/layout/Row'
import RenderBlocks from '@components/notion/Block/RenderBlocks'
import Header from './Header'

import { Props } from './config'
import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { queryChildrenBlocks, retrievePage } from '@shared/notion'

export { revalidate, generateStaticParams, generateMetadata } from './config'

export default async function ArticlePage({ params }: Props) {
  const page = (await retrievePage(params.pageId)) as PageObjectResponse
  const blocks = (await queryChildrenBlocks(params.pageId)) as { results: BlockObjectResponse[] }

  return (
    <Row as="article" type={ROW_TYPE.FULL_SCREEN}>
      <Header page={page} />
      <RenderBlocks blocks={blocks.results} />
    </Row>
  )
}
