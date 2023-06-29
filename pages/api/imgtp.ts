import axios from 'axios';
import FormData from 'form-data';

export default async function handler(req, res) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "*");
    console.info(req);
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const url = 'https://www.imgtp.com/upload/upload.html';
    const form = new FormData();

    form.append('image', Buffer.from(image, 'base64'), {
      filename: `${Date.now()}.png`,
      contentType: 'image/png',
    });
    form.append('fileId', `217_image.png`);
    form.append('initialPreview', '[]');
    form.append('initialPreviewConfig', '[]');
    form.append('initialPreviewThumbTags', '[]');

    const response = await axios.post(url, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
