import axios from 'axios';
import multer from 'multer';

const upload = multer().single('image');

export default async function handler(req, res) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    upload(req, res, async (error) => {
      if (error) {
        console.error(error);
        return res.status(400).json({ error: 'Image upload failed' });
      }

      const { file } = req;
      if (!file) {
        return res.status(400).json({ error: 'Image file is required' });
      }

      const url = 'https://www.imgtp.com/upload/upload.html';
      const form = new FormData();

      form.append('image', file.buffer, {
        filename: file.originalname || `${Date.now()}.png`,
        contentType: file.mimetype,
      });
      form.append('fileId', `217_${file.originalname}`);
      form.append('initialPreview', '[]');
      form.append('initialPreviewConfig', '[]');
      form.append('initialPreviewThumbTags', '[]');

      const response = await axios.post(url, form, {
        headers: {
          ...form.getHeaders(),
        },
      });

      return res.status(200).json(response.data);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
