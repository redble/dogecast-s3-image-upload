import React, { useState } from 'react';
import Helmet from "react-helmet";
import axios from "axios";

const Upload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const fileInputRef = React.createRef<HTMLInputElement>();

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0]);
    setPreviewUrl(URL.createObjectURL(event.target.files?.[0]));
  };

  const handleUploadButtonClick = async () => {
    if (selectedFile) {
      setUploading(true);

      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const res = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (res.status === 200) {
          setImageUrl(res.data.url);
        }

        setUploading(false);
      } catch (err) {
        console.error(err);
        setUploading(false);
      }
    }
  };

  return (
    <div className="container mt-5">
      <Helmet>
        <title>图床</title>
        <meta name="description" content="图床" />
        <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.1.0/css/bootstrap.min.css" />
      </Helmet>
      <div className="card">
        <div className="card-header">上传图片</div>
        <div className="card-body">
          <div className="mb-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept="image/*"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="btn btn-primary me-2">
              选择图片
            </button>
            <button onClick={handleUploadButtonClick} disabled={!selectedFile || uploading} className="btn btn-success">
              上传图片
            </button>
          </div>
          {previewUrl && <img src={previewUrl} alt="预览图" className="img-thumbnail mb-3" />}
          {imageUrl && (
            <div className="alert alert-success mb-3">
              <p>上传成功！您可以使用以下链接来访问您的图片：</p>
              <a href={imageUrl} target="_blank" rel="noreferrer">
                {imageUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
