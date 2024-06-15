import { PageObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import { retrieveDatabase } from '../notion/queries'
import { Title } from '../notion/types'

export function getPropertyKeyByType(object: Object, type: string) {
  return Object.keys(object).find(key => object[key].type === type)
}

export function parsePlainTextFromRichText(richText: RichTextItemResponse[]): string {
  return richText?.reduce((acc, curr) => {
    if (curr.plain_text) {
      return acc + curr.plain_text
    }
    return acc
  }, '')
}

export function getTitlePlaintext(page: PageObjectResponse): string {
  const properties = page?.properties
  const titleRichText = (properties?.[getPropertyKeyByType(properties, 'title')] as Title).title
  return titleRichText ? parsePlainTextFromRichText(titleRichText) : ''
}

export function getPropertyPlainText(page: PageObjectResponse, name: string): string {
  const richText = (page?.properties?.[name] as any)?.rich_text
  return richText ? parsePlainTextFromRichText(richText) : ''
}

export function getCoverImageSrc(page: PageObjectResponse): string {
  if (page.cover?.type === 'external') {
    return page.cover?.external?.url
  }
  if (page.cover?.type === 'file') {
    return page.cover?.file?.url
  }
  return ''
}

export async function extractDabaseTags(tagPropertyName: string): Promise<string[]> {
  const { properties } = await retrieveDatabase()
  const tagProperty = properties[tagPropertyName]
  const { options } = tagProperty['multi_select']
  return options.map(option => option.name)
}
