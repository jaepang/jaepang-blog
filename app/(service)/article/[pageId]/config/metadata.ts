import type { Metadata } from 'next'
import { Props } from './consts'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { retrievePage } from '@shared/notion'
import { getTitlePlaintext, getPropertyPlainText } from '@shared/utils'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pageId } = params
  const page = (await retrievePage(pageId)) as PageObjectResponse
  const title = getTitlePlaintext(page)
  const description = getPropertyPlainText(page, 'description')

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  }
}
