import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useRouteMatch } from 'react-router-dom';

import { useStore, useAccessors } from '~/context/store';


const ImagesDelete = () => {
  const { id } = useParams();
  const location = useLocation();
  const routeMatch = useRouteMatch();
  const [images, { destroy, show, clear }] = useStore('adminImages');
  const { imageDetail } = useAccessors();

  useEffect(() => {
    clear();
    show(id);
    return clear;
  }, []);

  const image = imageDetail(id);
  const { deleted } = images;

  const onFormSubmit = (e) => {
    e.preventDefault();
    destroy(id);
  };

  const mainContent = (!deleted && !!image &&
    <>
      <h2>HOLD UP</h2>
      <p>
        Are you sure you want to delete this image?
      </p>
      <img src={image.url} className="w-100" />
      <h3>{image.title}</h3>
      <button type="submit" className="btn btn-danger">delete it</button>
      {' '}
      <Link to="/admin/images" className="btn btn-outline-secondary">cancel</Link>
    </>
  );

  const successMessage = (deleted &&
    <div className="form-group">
      <div className="alert alert-success" role="alert">
        image record for {deleted.title} successfully deleted
      </div>
    </div>
  );

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-9">
          <form onSubmit={onFormSubmit}>
            {mainContent}
            {successMessage}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ImagesDelete;
