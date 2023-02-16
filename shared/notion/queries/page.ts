import { notion } from '@shared/notion'
import {
  PageObjectResponse,
  GetPageResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints'

export async function queryPageIds(filter: any): Promise<string[]> {
  const database_id = process.env.NOTION_DATABASE_ID
  let cursor = undefined
  let has_more = true
  let res = undefined
  const pageIds = []

  if (database_id) {
    while (has_more) {
      res = await notion.databases.query({
        database_id,
        start_cursor: cursor,
        filter,
      })
      cursor = res.next_cursor
      has_more = res.has_more
      pageIds.push(...(res?.results as PageObjectResponse[]).map(page => page.id))
    }
  }

  return pageIds
}

export async function retrerivePage(pageId: string): Promise<GetPageResponse> {
  const page = await notion.pages.retrieve({
    page_id: pageId,
  })

  return page
}

export async function queryChildrenBlocks(parentId: string): Promise<ListBlockChildrenResponse> {
  const blocks = await notion.blocks.children.list({
    block_id: parentId,
  })

  return blocks
}
