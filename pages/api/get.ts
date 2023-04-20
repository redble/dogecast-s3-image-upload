import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).end(); // 方法不允许
    return;
  }

  const { fileName } = req.query; // 获取文件名参数

  if (typeof fileName !== 'string') {
    res.status(400).end(); // 参数无效
    return;
  }

  // 构造 S3 图片 URL
  const imageUrl = `https://imagebed.s3.bitiful.net/${fileName}`;

  // 从 S3 下载图片到响应流
  try {
    const response = await axios.get(imageUrl, { responseType: 'stream' });
    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
    response.data.pipe(res);
  } catch {
    res.status(404).end(); // 图片不存在
  }
}
