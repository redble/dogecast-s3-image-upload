import { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';


// 创建 S3 实例
const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
 endpoint: 'https://s3.bitiful.net',
    accessKeyId: 'fzjyCPRDJTncIDZ8SytPYLQL',
    secretAccessKey: 'aELJx0vkTNLryRN7TvBpJGiHf79uRmP',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
  if (req.method !== 'POST') {
    res.status(405).json({msg:'不是post'}); // 方法不允许
    return;
  }

  const { data } = req.body;
 res.status(200).json({ data:req.body }); 
/*
  // 解析 base64 编码的图片数据
  const base64Data = Buffer.from(data.replace(/^data:image\/\w+;base64,/, ''), 'base64');

  // 构造上传对象的参数
  const params = {
    Bucket: 'example-bucket',
    Key: `${Date.now()}.jpg`,
    Body: base64Data,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  };

  try {
    // 上传图片到 S3
    const result = await s3.upload(params).promise();

    res.status(200).json({ url: result.Location }); // 返回上传后的路径
  } catch (error) {
    console.error(error);
    res.status(500).end(); // 服务器错误
  }*/
}
