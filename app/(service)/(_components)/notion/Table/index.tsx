'use client'

import Text from '@components/notion/Text'

import { BlockObjectResponse, TableRowBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { useWindowSize } from '@hooks/useWindowSize'

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
  const { width } = useWindowSize()
  const paddingLeft = width > 732 ? `${(width - 700) / 2}px` : '16px'
  const rows = childrenBlocks as TableRowBlockObjectResponse[]
  const columns = rows[0].table_row.cells.length
  const data = []
  rows.forEach(row => {
    const cells = row.table_row.cells
    cells.forEach(cell => {
      data.push(<Text text={cell} />)
    })
    data.push(undefined)
  })

  return (
    <div
      className={cx('root')}
      style={{
        paddingLeft,
        gridTemplateColumns: `repeat(${columns + 1}, minmax(150px, max-content))`,
        gridTemplateRows: `repeat(${rows.length}, minmax(50px, auto))`,
      }}>
      {data?.map((cell, idx) => (
        <div
          key={idx}
          className={cx('cell', {
            'last-row': idx >= data.length - columns - 1,
            highlight: (has_column_header && idx % (columns + 1) === 0) || (has_row_header && idx < columns + 1),
            bumper: (idx + 1) % (columns + 1) === 0,
          })}>
          {cell}
        </div>
      ))}
    </div>
  )
}
