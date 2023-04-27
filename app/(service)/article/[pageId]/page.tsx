import Row, { ROW_TYPE } from '@components/layout/Row'
import RenderBlocks from '@components/notion/Block/RenderBlocks'
import Header from './Header'

import { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { queryChildrenBlocks, retrerivePage } from '@shared/notion'

export { revalidate, generateStaticParams } from './config'

interface Props {
  params: {
    pageId: string
  }
}

export default async function ArticlePage({ params }: Props) {
  const page = (await retrerivePage(params.pageId)) as PageObjectResponse
  const blocks = (await queryChildrenBlocks(params.pageId)) as { results: BlockObjectResponse[] }
  const descRichText = (page.properties.description as any)?.rich_text

  /*
  if (descRichText?.length === 0 || descRichText?.[0].plain_text === '') {
    await generateAndUpdateDescription(page)
  }*/

  return (
    <Row as="article" type={ROW_TYPE.FULL_SCREEN}>
      <Header page={page} />
      <RenderBlocks blocks={blocks.results} />
    </Row>
  )
}
