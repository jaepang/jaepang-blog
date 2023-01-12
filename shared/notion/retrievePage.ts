import { notion } from '.'
import { GetPageParameters, GetPageResponse } from '@notionhq/client/build/src/api-endpoints'

export async function retrievePage(variables: GetPageParameters): Promise<GetPageResponse> {
  return await notion.pages.retrieve(variables)
}
