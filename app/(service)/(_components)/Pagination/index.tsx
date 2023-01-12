import Link from 'next/link'

import { calcFeedPageSize } from '@app/shared/notion'

export default async function Pagination({ pageSize }) {
  const maxPageSize = await calcFeedPageSize(pageSize)

  return (
    <div>
      {Array(maxPageSize)
        .fill(0)
        .map((_, i) => (
          <Link key={i} href={`/feed/${i + 1}`}>
            {i + 1}
          </Link>
        ))}
    </div>
  )
}
