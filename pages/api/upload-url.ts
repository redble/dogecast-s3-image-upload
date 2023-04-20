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

  const fileType = req.query.fileType

  // 验证 Content-Type 是否为图像
  if (!/^image\//.test(fileType)) {
    return res.status(400).json({ message: '文件类型必须为图像！' })
  }

  const post = await s3.createPresignedPost({
    Bucket: process.env.BUCKET_NAME,
    Fields: {
      key: req.query.file,
      'Content-Type': fileType,
    },
    Expires: 60, // seconds
    Conditions: [
      ['content-length-range', 0, 5242880], // up to 5 MB
    ],
  })

  return res.status(200).json(post)
}
