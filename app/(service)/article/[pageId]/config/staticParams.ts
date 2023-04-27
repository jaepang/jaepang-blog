import { queryPageIds } from '@shared/notion'

export async function generateStaticParams() {
  const pageIds = await queryPageIds(undefined)
  return pageIds.map(pageId => ({ pageId: pageId }))
}
