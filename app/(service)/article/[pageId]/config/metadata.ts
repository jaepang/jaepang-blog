import type { Metadata } from 'next'
import { Props } from './consts'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { retrievePage } from '@shared/notion'
import { getTitlePlaintext } from '@shared/utils'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pageId } = params
  const page = (await retrievePage(pageId)) as PageObjectResponse
  const title = getTitlePlaintext(page)

  return {
    title,
    openGraph: {
      title,
      description: title,
    },
  }
}
