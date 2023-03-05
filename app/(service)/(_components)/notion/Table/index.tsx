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
  const paddingLeft = width > 700 ? (width - 700) / 2 : 0
  const rows = childrenBlocks as TableRowBlockObjectResponse[]

  return (
    <>
      <div
        className={cx('root')}
        style={{
          paddingLeft,
        }}>
        {rows.map((row, rowIndex) => {
          const { table_row: tableRow } = row
          return (
            <div
              key={row.id}
              className={cx('row', {
                highlight: rowIndex === 0 && has_row_header,
              })}
              style={{
                // +1: bumper
                gridTemplateColumns: `repeat(${tableRow.cells.length + 1}, 15%)`,
              }}>
              {tableRow.cells.map((cell, cellIndex) => (
                <div
                  key={`${row.id}-${cellIndex}`}
                  className={cx('cell', {
                    highlight: cellIndex === 0 && has_column_header,
                  })}>
                  <Text text={cell} />
                </div>
              ))}
              <div className={cx('bumper')} />
            </div>
          )
        })}
      </div>
    </>
  )
}
