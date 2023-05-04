'use client'

import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { useTable } from './useTable'

import classNames from 'classnames/bind'
import styles from './Table.module.css'
const cx = classNames.bind(styles)

interface Props {
  table: {
    has_column_header: boolean
    has_row_header: boolean
    table_width: number
  }
  childrenBlocks: BlockObjectResponse[]
}

export default function Table({ table, childrenBlocks }: Props) {
  const { has_column_header, has_row_header } = table
  const { data, paddingLeft, rowLength, columnLength } = useTable(childrenBlocks)

  return (
    <div
      className={cx('root')}
      style={{
        paddingLeft,
        gridTemplateColumns: `repeat(${columnLength + 1}, minmax(150px, max-content))`,
        gridTemplateRows: `repeat(${rowLength}, minmax(50px, auto))`,
      }}>
      {data?.map((cell, idx) => (
        <div
          key={idx}
          className={cx('cell', {
            'last-row': idx >= data.length - columnLength - 1,
            highlight:
              (has_column_header && idx % (columnLength + 1) === 0) || (has_row_header && idx < columnLength + 1),
            bumper: (idx + 1) % (columnLength + 1) === 0,
          })}>
          {cell}
        </div>
      ))}
    </div>
  )
}
