import Link from 'next/link'

interface Props {
  tag: string
  curPage: number
  maxPageSize: number
}
const numOfPadPages = 2

export default function Pagination({ tag, curPage, maxPageSize }: Props) {
  const from = Math.max(1, curPage - numOfPadPages)
  const to = Math.min(maxPageSize, curPage + numOfPadPages)
  return (
    <div>
      {Array(to - from + 1)
        .fill(0)
        .map((_, i) => (
          <Link key={from + i} href={`/${tag}/${from + i}`}>
            {from + i}
          </Link>
        ))}
    </div>
  )
}
