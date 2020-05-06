import { NowRequest, NowResponse } from '@now/node'
import connectToDB from '../components/db'
import ProjectContent from '../components/models/ProjectContent'

export default async (req: NowRequest, res: NowResponse) => {
  if (req.method !== 'GET') {
    res.status(405).end()
    return
  }
  const connectedToDB = await connectToDB()
  if (!connectedToDB) {
    res.status(500).end('Database connection failed')
  } else if (!req.query.id) {
    res.status(400).end('Please provide Project Content ID')
  } else {
    const content = await ProjectContent.findById(req.query.id)
    if (content) {
      res.status(200).end(JSON.stringify(content))
    } else {
      res.status(400).end("Project Content doesn't exist")
    }
  }
}
