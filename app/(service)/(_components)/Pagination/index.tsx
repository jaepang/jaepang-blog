import Link from 'next/link'

export default function Pagination({ tag, maxPageSize }) {
  return (
    <div>
      {Array(maxPageSize)
        .fill(0)
        .map((_, i) => (
          <Link key={i} href={`/${tag}/${i + 1}`}>
            {i + 1}
          </Link>
        ))}
    </div>
  )
}
