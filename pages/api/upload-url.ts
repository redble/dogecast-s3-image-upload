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
  const randstr=(length)=>{
  let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result

  };
  const tmp_keys=`${randstr(10)}_${req.query.file}`;
  const post = await s3.createPresignedPost({
    Bucket: process.env.BUCKET_NAME,
    Fields: {
      key: tmp_keys,
      'Content-Type': 'image/*',
    },
    Expires: 60, // seconds
    Conditions: [
      ['content-length-range', 0, 5242880], // up to 5 MB
    ],
  })
  const params = {
    Bucket: 'imagebed',
    CopySource: encodeURIComponent('s3.bitiful.net/imagebed/'+tmp_keys),
    Key: 'your-key',
    ContentType: 'image/*',
  }
  let tmp={};
   s3.copyObject(params, (err, data) => {
   tmp=data;
  })
  return res.status(200).json({info:post,ext:tmp});
}
