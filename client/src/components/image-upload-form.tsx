import React from 'react';
import JSFormData from 'js-form-data';


const ImageUploadForm: React.SFC = () => {

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new JSFormData.default(e.target);

    fetch('/api/images', {
      body: new FormData(e.target),
      credentials: 'same-origin',
      headers: { // lol this sucks, make a service
        'X-CSRF-Token': (document.getElementsByName('csrf-token')[0] as any).content,
      },
      method: 'POST',
    }).then(
      (res) => console.log(res) // tslint:disable-line
    ).catch(
      (err) => console.log(err) // tslint:disable-line
    );
  };

  return (
    <form className="mt-lg-5" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="image[title]">image title</label>
        <input type="text" className="form-control" name="image[title]" placeholder="image title" required />
      </div>
      <div className="form-group">
        <label htmlFor="image[asset]">image file</label>
        <input type="file" className="form-control-file" name="image[asset]" accept="image/*" />
      </div>
      <button type="submit" className="btn btn-primary">submit</button>
    </form>
  );
};

export default ImageUploadForm;
