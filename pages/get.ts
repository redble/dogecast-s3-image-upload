import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({msg:'不是get'}); // 方法不允许
    return;
  }

  const { fileName } = req.query; // 获取文件名参数

  if (typeof fileName !== 'string') {
    res.status(400).json({msg:'无效参数'}); // 参数无效
    return;
  }

  // 构造 S3 图片 URL
  const imageUrl = `https://imagebed.s3.bitiful.net/${fileName}`;

  // 从 S3 下载图片到响应流
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error('Response not ok');
    }
    const contentType = response.headers.get('content-type');
    res.setHeader('Content-Type', contentType || 'application/octet-stream');
    res.setHeader('Content-Disposition', `inline; filename="${fileName}"`);
    response.body.pipe(res);
  } catch {
    res.status(404).json({msg:'找不到图片'}); // 图片不存在
  }
}
