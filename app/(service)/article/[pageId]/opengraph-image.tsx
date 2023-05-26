import { ImageResponse } from 'next/server'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { retrievePage } from '@shared/notion'
import { getTitlePlaintext, getCoverImageSrc } from '@shared/utils'
import { Props } from './config'

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

export default async function Image({ params }: Props) {
  const { pageId } = params
  const page = (await retrievePage(pageId)) as PageObjectResponse
  const title = getTitlePlaintext(page)
  const cover = getCoverImageSrc(page)

  return new ImageResponse(
    (
      <div
        style={{
          background: cover ? `url(${cover})` : '#000',
          fontSize: '128',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {title ?? ''}
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  )
}
