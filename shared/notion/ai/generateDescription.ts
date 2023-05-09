import { notion } from '@shared/notion'
import { v4 as uuid } from 'uuid'
import { getTitlePlaintext, getPagePropertiesString } from '@shared/utils/notion'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

const url = 'https://www.notion.so/api/v3/getCompletion'
const tokenV2 = process.env.NOTION_TOKEN_V2
const headers = {
  accept: 'application/json',
  'content-type': 'application/json',
  Cookie: `token_v2=${tokenV2}`,
}
const bodySkeleton = {
  model: 'openai-3',
  spaceId: process.env.NOTION_SPACE_ID,
  isSpacePermission: true,
}

async function parseAiResponse(res: Response) {
  const resStr = (await res.text()).split('\n')

  const description = []
  for (const line of resStr) {
    try {
      const { type, completion } = JSON.parse(line)
      if (type === 'success') description.push(completion)
    } catch (e) {
      /** do_nothing */
    }
  }

  return description.join('').replaceAll('\n', '')
}

export async function generateDescription(page: PageObjectResponse) {
  const title = getTitlePlaintext(page)
  const properties = await getPagePropertiesString(page.properties)

  const body = {
    id: uuid(),
    ...bodySkeleton,
    context: {
      type: 'summarize',
      pageTitle: title,
      slectedText: properties,
    },
  }
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  return await parseAiResponse(res)
}

type language =
  | 'english'
  | 'korean'
  | 'chinese'
  | 'japanese'
  | 'spanish'
  | 'russiab'
  | 'french'
  | 'german'
  | 'italian'
  | 'portuguese'
  | 'dutch'
  | 'indonesia'
  | 'tagalog'
  | 'vietnamese'
export async function translate(text: string, language: language) {
  if (!text) return ''
  const body = {
    id: uuid(),
    ...bodySkeleton,
    context: {
      type: 'translate',
      language,
      text,
    },
  }
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  return await parseAiResponse(res)
}
