import { notion } from '@shared/notion'
import { NotionToMarkdown } from 'notion-to-md'
import { v4 as uuid } from 'uuid'
import { getTitlePlaintext, getPagePropertiesString } from '@shared/notion/utils'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export async function generateDescription(page: PageObjectResponse) {
  const tokenV2 = process.env.NOTION_TOKEN_V2
  const url = 'https://www.notion.so/api/v3/getCompletion'
  const title = getTitlePlaintext(page)
  const properties = await getPagePropertiesString(page.properties)
  const n2m = new NotionToMarkdown({ notionClient: notion })
  const mdBlocks = await n2m.pageToMarkdown(page.id)
  const content = n2m.toMarkdownString(mdBlocks)

  const headers = {
    accept: 'application/json',
    'content-type': 'application/json',
    Cookie: `token_v2=${tokenV2}`,
  }
  const body = {
    id: uuid(),
    context: {
      type: 'summarize',
      pageTitle: title,
      slectedText: properties + content,
    },
    model: 'openai-3',
    spaceId: process.env.NOTION_SPACE_ID,
    isSpacePermission: true,
  }

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
  const resStr = (await res.text()).split('\n')

  const description = []
  for (const line of resStr) {
    try {
      const { type, completion } = JSON.parse(line)
      if (type === 'success') description.push(completion)
    } catch (e) {
      // console.log(title, 'made error on generating description', e.message)
      /** do_nothing */
    }
  }

  return description.join('').replaceAll('\n', '')
}
