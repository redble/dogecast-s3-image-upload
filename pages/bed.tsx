import React, { useState } from 'react';
import Helmet from "react-helmet";
const Upload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [uploading, setUploading] = useState<boolean>(false);

  const fileInputRef = React.createRef<HTMLInputElement>();

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0]);
    setPreviewUrl(URL.createObjectURL(event.target.files?.[0]));
  };

  const handleUploadButtonClick = async () => {
    
    if (selectedFile) {
      setUploading(true);

      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onload = async () => {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: reader.result,name:selectedFile.name })
        });

        if (res.ok) {
          const { url } = await res.json();
          setPreviewUrl(url);
        }

        setUploading(false);
      };
    }
  };

  return (
    <div>
      <Helmet>
       <link href="https://cdn.bootcdn.net/ajax/libs/picocss/1.5.9/pico.min.css" rel="stylesheet" />
      </Helmet>
      <input type="file" ref={fileInputRef} onChange={handleFileInputChange} accept="image/*" />
      <button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
        选择图片
      </button>
      <button onClick={handleUploadButtonClick} disabled={!selectedFile || uploading}>
        上传图片
      </button>
      {previewUrl && <img src={previewUrl} alt="预览图" />}
    </div>
  );
};

export default Upload;
