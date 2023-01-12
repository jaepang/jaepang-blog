import { APIErrorCode, ClientErrorCode, isNotionClientError } from '@notionhq/client'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { queryDatabase } from '@shared/notion'
import { NextApiRequest, NextApiResponse } from 'next'

export interface DatabaseRes {
  error?: string
  database: QueryDatabaseResponse | null
  code?: ClientErrorCode | APIErrorCode
}

async function getHandler(req: NextApiRequest, res: NextApiResponse<DatabaseRes>) {
  const databaseId = process.env.NOTION_DATABASE_ID
  const variables = { ...req.body, database_id: databaseId }

  try {
    const database = await queryDatabase(variables)
    res.status(200).json({ database })
  } catch (e: unknown) {
    if (isNotionClientError(e)) {
      res.status(500).json({ error: e.message, database: null, code: e.code })
    } else {
      throw e
    }
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<DatabaseRes>) {
  return getHandler(req, res)
}
