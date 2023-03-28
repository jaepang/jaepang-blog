import { PageObjectResponse, TextRichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import { generateDescription } from './ai/generateDescription'
import { updatePageProperty } from './queries'
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

export async function getPagePropertiesString(properties: any) {
  const propertiesString = Object.keys(properties).reduce((acc, key) => {
    const property = properties[key]
    const { type } = property

    if (!!!property[property.type]) return acc

    let content = key + ': '
    switch (type) {
      case 'multi_select':
        content += property.multi_select
          .reduce((acc, curr) => {
            return acc + ', ' + curr.name
          }, '')
          .slice(2)
        break
      case 'select':
        content += property.select.name
        break
      case 'rich_text':
      case 'title':
        content += property[type].reduce((acc, curr) => {
          return acc + curr.plain_text
        }, '')
        break
      case 'created_time':
      case 'last_edited_time':
        content += property[type].toLocaleString()
        break
      default:
        content += property[type].toString()
    }

    return acc + '\n' + content
  }, '')

  return propertiesString.slice(1) + '\n\n\n'
}

export async function generateAndUpdateDescription(page: PageObjectResponse) {
  const description = await generateDescription(page)

  const newDescription = page.properties.description as any
  const richText = { text: { content: description } } as TextRichTextItemResponse
  newDescription.rich_text.push(richText)

  try {
    await updatePageProperty(page.id, { description: newDescription })
  } catch {
    /** do_nothing */
  }
}
