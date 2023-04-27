export function calcPaginationBound(curPage: number, maxPageSize: number, numOfPages: number) {
  let from: number, to: number

  if (curPage <= Math.floor(numOfPages / 2)) {
    from = 1
    to = Math.min(numOfPages, maxPageSize)
  } else if (curPage > maxPageSize - Math.floor(numOfPages / 2) + 1) {
    from = maxPageSize - numOfPages + 1
    to = maxPageSize
  } else {
    from = curPage - Math.floor(numOfPages / 2)
    to = curPage + Math.floor(numOfPages / 2)
  }

  return { from, to }
}

export function calcCenterZoomTransform(width: number, height: number, imgProperty: DOMRect) {
  if (imgProperty) {
    const scale = Math.min(width / imgProperty.width, height / imgProperty.height)
    const translateY = -imgProperty.y + (height - imgProperty.height) / 2

    return `translateY(${translateY}px) scale(${scale})`
  }
  return 'none'
}
