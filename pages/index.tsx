<>
  <meta charSet="UTF-8" />
  <title>Dr0's 图床</title>
  <link
    href="https://cdn.bootcdn.net/ajax/libs/bootstrap/5.0.2/css/bootstrap.min.css"
    rel="stylesheet"
  />
  <link href="style.css" rel="stylesheet" />
  <div className="container my-5">
    <div className="row">
      <div className="col-md-6 mx-auto">
        <form id="upload-form">
          <div className="form-group mb-3">
            <h2>Dr0's Imagebed</h2>
            <h4>点击或拖动上传</h4>
            <label htmlFor="file-input">选择图片</label>
            <input
              type="file"
              accept="image/png,image/jpg,image/jpeg"
              className="form-control"
              id="file-input"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="name-input">文件名</label>
            <input
              type="text"
              className="form-control"
              id="name-input"
              placeholder="请输入文件名"
              defaultValue="image.png"
              readOnly=""
            />
          </div>
          <div
            id="progress-bar"
            className="progress progress-striped d-none my-3"
          >
            <div
              className="progress-bar progress-bar-animated bg-success"
              role="progressbar"
              style={{ width: "0%" }}
            />
          </div>
        </form>
        <div id="result" className="d-none mt-3">
          <div className="mb-2">
            <p>图片链接：</p>
            <input
              type="text"
              className="form-control"
              id="link-input"
              readOnly=""
            />
          </div>
          <div>
            <p>Markdown链接：</p>
            <input
              type="text"
              className="form-control"
              id="markdown-input"
              readOnly=""
            />
          </div>
        </div>
        <div id="preview" className="mt-3 d-none" />
      </div>
    </div>
  </div>
</>
