import S3 from 'aws-sdk/clients/s3'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const s3 = new S3({
    apiVersion: '2006-03-01',
      endpoint: 'https://s3.bitiful.net',
      accessKeyId: 'fzjyCPRDJTncIDZ8SytPYLQL',
  secretAccessKey: 'aELJx0vkTNLryRN7TvBpJGiHf79uRmP',
  })

  const post = await s3.createPresignedPost({
    Bucket: process.env.BUCKET_NAME,
    Fields: {
      key: req.query.file,
      'Content-Type': req.query.fileType,
    },
    Expires: 60, // seconds
    Conditions: [
      ['content-length-range', 0, 1048576], // up to 1 MB
    ],
   
  })

  res.status(200).json(post)
}
