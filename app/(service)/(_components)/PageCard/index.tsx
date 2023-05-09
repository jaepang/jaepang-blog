import Link from 'next/link'
import Image from 'next/image'

import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { getTitlePlaintext, getCoverImageSrc } from '@shared/utils'
import { IMAGE_SIZES } from '@shared/consts'

import classNames from 'classnames/bind'
import styles from './PageCard.module.css'
const cx = classNames.bind(styles)

export default async function PageCard({ page }: { page: PageObjectResponse }) {
  const title = getTitlePlaintext(page)
  const coverImgSrc = getCoverImageSrc(page)

  return (
    <Link href={`/article/${page.id}`}>
      <div className={cx('root')}>
        {coverImgSrc && (
          <div className={cx('cover')}>
            <Image
              priority
              fill
              src={coverImgSrc}
              alt={title}
              sizes={IMAGE_SIZES}
              placeholder="empty"
              className={cx('img')}
            />
          </div>
        )}
        <h2 className={cx('title')}>{title}</h2>
      </div>
    </Link>
  )
}
