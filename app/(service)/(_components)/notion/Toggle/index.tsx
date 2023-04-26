import Block from '../Block'

import { BlockObjectResponse, ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'

interface Props {
  summary: React.ReactNode
  detail: ListBlockChildrenResponse
  summaryClassName?: string
}

export function ToggleContent({ summary, detail, summaryClassName }: Props) {
  return (
    <>
      <summary className={summaryClassName}>{summary}</summary>
      {detail?.results?.map(block => (
        /* @ts-expect-error Server Component */
        <Block key={block.id} block={block as BlockObjectResponse} classNames="summary" />
      ))}
    </>
  )
}
