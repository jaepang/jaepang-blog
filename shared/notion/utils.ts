import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { Title } from './types'

export function getPropertyKeyByType(object: Object, type: string) {
  return Object.keys(object).find(key => object[key].type === type)
}

export function getTitlePlaintext(page: PageObjectResponse): string {
  const properties = page?.properties
  return (properties?.[getPropertyKeyByType(properties, 'title')] as Title).title[0].plain_text ?? ''
}
