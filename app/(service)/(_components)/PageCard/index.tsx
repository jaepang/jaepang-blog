import Link from 'next/link'

import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { getTitlePlaintext } from '@shared/utils/notion'

import classNames from 'classnames/bind'
import styles from './PageCard.module.css'
const cx = classNames.bind(styles)

interface Props {
  page: PageObjectResponse
}

export default function PageCard({ page }: Props) {
  const title = getTitlePlaintext(page)

  return (
    <div className={cx('root')}>
      <Link href={`/article/${page.id}`}>
        <div className={cx('title')}>{title}</div>
      </Link>
    </div>
  )
}
