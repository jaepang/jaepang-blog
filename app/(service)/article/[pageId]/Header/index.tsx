import Link from 'next/link'
import CreatedAt from './CreatedAt'

import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { getTitlePlaintext } from '@shared/utils/notion'

import classNames from 'classnames/bind'
import styles from './Header.module.css'
const cx = classNames.bind(styles)

export default function Header({ page }: { page: PageObjectResponse }) {
  const title = getTitlePlaintext(page)
  const { created_time: createdTime, properties } = page
  const { tag } = properties
  const { multi_select: tags } = tag as {
    multi_select: { id: string; name: string; color: string }[]
  }

  return (
    <header className={cx('root')}>
      <h1 className={cx('title')}>{title}</h1>
      <CreatedAt createdTime={createdTime} />
      {tags && (
        <div className={cx('tags')}>
          {tags.map(tag => (
            <Link
              href={`/${tag.name}/1`}
              key={tag.id}
              className={cx('tag')}
              style={{
                backgroundColor: `var(--color-bg-${tag.color})`,
              }}>
              {tag.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
