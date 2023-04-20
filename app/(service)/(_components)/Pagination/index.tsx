import Link from 'next/link'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

import { calcPaginationBound } from '@shared/utils'

import classNames from 'classnames/bind'
import styles from './Pagination.module.css'
const cx = classNames.bind(styles)

interface Props {
  tag: string
  curPage: number
  maxPageSize: number
}
const numOfPages = 5

export default function Pagination({ tag, curPage, maxPageSize }: Props) {
  if (curPage === 1 && maxPageSize === 1) return null
  const { from, to } = calcPaginationBound(curPage, maxPageSize, numOfPages)

  return (
    <div className={cx('root')}>
      {curPage - numOfPages >= -Math.floor(numOfPages / 2) && (
        <Link href={`/${tag}/${Math.max(curPage - numOfPages, 1)}`}>
          <div className={cx('link', 'btn')}>
            <BsChevronLeft size={18} />
          </div>
        </Link>
      )}

      {Array(to - from + 1)
        .fill(0)
        .map((_, i) => (
          <Link key={from + i} href={`/${tag}/${from + i}`}>
            <div className={cx('link', { current: from + i == curPage })}>{from + i}</div>
          </Link>
        ))}

      {curPage + numOfPages <= maxPageSize + Math.floor(numOfPages / 2) && (
        <Link href={`/${tag}/${Math.min(curPage + numOfPages, maxPageSize)}`}>
          <div className={cx('link', 'btn')}>
            <BsChevronRight size={18} />
          </div>
        </Link>
      )}
    </div>
  )
}
