import React from 'react';


const ImageUploadForm: React.SFC = () => {
  return (
    <form className="mt-lg-5">
      <div className="form-group">
        <label htmlFor="image-upload-title">image title</label>
        <input type="text" className="form-control" name="image-upload-title" placeholder="image title" required />
      </div>
      <div className="form-group">
        <label htmlFor="image-upload-file">image file</label>
        <input type="file" className="form-control-file" name="image-upload-file" />
      </div>
    </form>
  );
};

export default ImageUploadForm;
