import Link from 'next/link'

export default function Pagination({ maxPageSize }) {
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
