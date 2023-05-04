import type { Metadata } from 'next'
import { Props } from './consts'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { retrerivePage } from '@shared/notion'
import { getTitlePlaintext, getCoverImageSrc } from '@shared/utils'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pageId } = params
  const page = (await retrerivePage(pageId)) as PageObjectResponse
  const title = getTitlePlaintext(page)
  const cover = getCoverImageSrc(page)

  return {
    title,
    openGraph: {
      title,
      images: [cover],
    },
  }
}
