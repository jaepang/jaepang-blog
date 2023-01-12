import Pagination from '@components/Pagination'

export default function FeedPageLayout({ children }) {
  const pageSize = 10

  return (
    <>
      {children}
      {/* @ts-expect-error Server Component */}
      <Pagination pageSize={pageSize} />
    </>
  )
}
