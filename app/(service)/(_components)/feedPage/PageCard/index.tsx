import { PageObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { getTitlePlaintext } from '@client/utils'

interface Props {
  page: PageObjectResponse | PartialPageObjectResponse
}

export default function PageCard({ page }: Props) {
  const title = getTitlePlaintext(page as PageObjectResponse)

  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}
