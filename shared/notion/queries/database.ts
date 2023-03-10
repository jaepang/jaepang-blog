import { notion } from '@shared/notion'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export async function queryDatabase(PAGE_SIZE: number, page: number, filter: any): Promise<PageObjectResponse[]> {
  const database_id = process.env.NOTION_DATABASE_ID
  let cursor = undefined
  let has_more = true
  let curPage = 0
  let res = undefined

  if (database_id) {
    while (has_more && curPage < page) {
      res = await notion.databases.query({
        database_id,
        filter,
        start_cursor: cursor,
        page_size: PAGE_SIZE,
      })
      cursor = res.next_cursor
      has_more = res.has_more
      curPage++
    }
  }

  return (res?.results as PageObjectResponse[]) ?? []
}

export async function calcFeedPageSize(PAGE_SIZE: number, filter: any): Promise<number> {
  /** pretty slow, but there are no way of fetching database size */
  /** used on static site generation */
  const database_id = process.env.NOTION_DATABASE_ID
  let cnt = 0
  let has_more = true
  let reqs = 0
  let cursor = undefined

  if (database_id) {
    while (has_more) {
      const res = await notion.databases.query({
        database_id,
        start_cursor: cursor,
        filter,
      })
      cnt += res.results.length
      has_more = res.has_more
      cursor = res.next_cursor
      reqs++
    }
  }

  return Math.ceil(cnt / PAGE_SIZE)
}
