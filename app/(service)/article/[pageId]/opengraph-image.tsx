import { ImageResponse } from 'next/server'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { retrievePage } from '@shared/notion'
import { getTitlePlaintext, getCoverImageSrc } from '@shared/utils'
import { Props } from './config'

import OGImage from './OGImage'

export async function generateImageMetadata({ params }: Props) {
  const { pageId } = params
  const page = (await retrievePage(pageId)) as PageObjectResponse
  const title = getTitlePlaintext(page)

  return [
    {
      id: pageId,
      contentType: 'image/png',
      size: { width: 1200, height: 600 },
      alt: title,
    },
  ]
}
export const runtime = 'edge'

export default async function Image({ params }: Props) {
  const { pageId } = params
  const page = (await retrievePage(pageId)) as PageObjectResponse
  const title = getTitlePlaintext(page)
  const cover = getCoverImageSrc(page)
  const { tag } = page.properties
  const { multi_select: tags } = tag as {
    multi_select: { id: string; name: string; color: string }[]
  }
  const pretendardBold = fetch(new URL(`@public/font/Pretendard/Pretendard-Bold.woff2`, import.meta.url)).then(res =>
    res.arrayBuffer(),
  )
  const pretendardRegular = fetch(new URL(`@public/font/Pretendard/Pretendard-Regular.woff2`, import.meta.url)).then(
    res => res.arrayBuffer(),
  )

  return new ImageResponse(<OGImage {...{ title, cover, tags }} />, {
    width: 1200,
    height: 600,
    fonts: [
      {
        name: 'Pretendard',
        data: await pretendardBold,
        style: 'normal',
        weight: 800,
      },
      {
        name: 'Pretendard',
        data: await pretendardRegular,
        style: 'normal',
        weight: 400,
      },
    ],
  })
}
