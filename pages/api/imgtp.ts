import axios from 'axios';
import FormData from 'form-data';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { image } = req.files;
    if (!image) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const url = 'https://www.imgtp.com/upload/upload.html';
    const form = new FormData();

    form.append('image', image.data, {
      filename: image.name || `${Date.now()}.png`,
      contentType: image.type,
    });
    form.append('fileId', `217_${image.name}`);
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
