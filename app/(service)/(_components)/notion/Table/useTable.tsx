import Text from '@components/notion/Text'

import { useWindowSize } from '@hooks/useWindowSize'
import { BlockObjectResponse, TableRowBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export function useTable(childrenBlocks: BlockObjectResponse[]) {
  const { width } = useWindowSize()
  const paddingLeft = width > 732 ? `${(width - 700) / 2}px` : '16px'
  const rows = childrenBlocks as TableRowBlockObjectResponse[]
  const columnLength = rows[0].table_row.cells.length
  const data = []
  rows.forEach(row => {
    const cells = row.table_row.cells
    cells.forEach(cell => {
      data.push(<Text text={cell} />)
    })
    data.push(undefined)
  })

  return {
    data,
    paddingLeft,
    rowLength: rows.length,
    columnLength,
  }
}
