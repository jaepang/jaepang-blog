import Link from 'next/link'
import Image from 'next/image'

import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { getTitlePlaintext, getCoverImageSrc } from '@shared/utils/notion'
import { IMAGE_SIZES } from '@shared/consts'

import classNames from 'classnames/bind'
import styles from './PageCard.module.css'
const cx = classNames.bind(styles)

export default function PageCard({ page }: { page: PageObjectResponse }) {
  const title = getTitlePlaintext(page)
  const cover = getCoverImageSrc(page)

  return (
    <Link href={`/article/${page.id}`}>
      <div className={cx('root')}>
        {cover && (
          <div className={cx('cover')}>
            <Image priority src={cover} alt="title" fill className={cx('img')} sizes={IMAGE_SIZES} />
          </div>
        )}
        <h2 className={cx('title')}>{title}</h2>
      </div>
    </Link>
  )
}
