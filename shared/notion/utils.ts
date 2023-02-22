import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { Title } from './types'

export function getPropertyKeyByType(object: Object, type: string) {
  return Object.keys(object).find(key => object[key].type === type)
}

export function getTitlePlaintext(page: PageObjectResponse): string {
  const properties = page?.properties
  const titles = (properties?.[getPropertyKeyByType(properties, 'title')] as Title).title
  const title = titles.reduce((acc, curr) => {
    if (curr.plain_text) {
      return acc + curr.plain_text
    }
    return acc
  }, '')
  return title ?? ''
}
