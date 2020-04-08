import React, { useEffect, useState } from 'react';

import { useStore } from '~/context/store';


const ImageUploadForm: React.SFC = () => {

  const [adminImages, adminImagesActionCreators] = useStore('adminImages');
  const { create, clean } = adminImagesActionCreators;

  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // clear the store on unmount
  useEffect(() => clean, []);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.onerror = () => {
        setPreviewUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    create(new FormData(e.target));
  };

  const successMessage = (adminImages.created &&
    <div className="form-group">
      <div className="alert alert-success" role="alert">
        image record for {adminImages.created.title} succesfully created
      </div>
    </div>
  );

  const loadingMessage = (adminImages.loading &&
    <div className="form-group">
      <div className="alert alert-info" role="alert">
        processing upload
      </div>
    </div>
  );

  const errorMessage = (adminImages.error &&
    <div className="form-group">
      <div className="alert alert-danger" role="alert">
        there was an error submitting your image: {adminImages.error.message}
      </div>
    </div>
  );

  const imagePreview = (previewUrl &&
    <div className="form-group">
      <img className="media-object w-100" src={previewUrl} />
    </div>
  );

  return (
    <form className="mt-5" onSubmit={onSubmit}>
      {successMessage}
      {errorMessage}
      {loadingMessage}
      <div className="form-group">
        <label htmlFor="image[title]">image title</label>
        <input
          type="text"
          className="form-control"
          name="image[title]"
          onChange={(e) => { setTitle(e.target.value); }}
          placeholder="image title"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="image[asset]">image file</label>
        <input
          type="file"
          className="form-control-file"
          name="image[asset]"
          onChange={onFileChange}
          accept="image/*"
        />
      </div>
      {imagePreview}
      <div className="form-group">
        <button type="submit" className="btn btn-primary">submit</button>
      </div>
    </form>
  );
};

export default ImageUploadForm;
