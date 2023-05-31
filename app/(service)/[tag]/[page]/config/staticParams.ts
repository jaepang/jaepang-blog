import { calcFeedPageSize } from '@shared/notion'
import { extractDabaseTags } from '@shared/utils/notion'
import { tagPropertyName, postsPerPage } from './consts'

export async function generateStaticParams() {
  const tags = await extractDabaseTags(tagPropertyName)
  const params = []

  for (const tag of tags) {
    const maxPage = await calcFeedPageSize(postsPerPage, [
      {
        property: tagPropertyName,
        multi_select: {
          contains: tag,
        },
      },
    ])
    params.push(
      ...Array.from({ length: maxPage }, (_, i) => i + 1).map(page => ({
        tag,
        page: page?.toString() ?? '',
      })),
    )
  }

  return params
}
