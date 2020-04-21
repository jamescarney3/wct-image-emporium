import React from 'react';
import { Link } from 'react-router-dom';

import { ImagePanel } from '~/components';


interface IImagePage {
  images: any[],
  admin?: boolean,
}

const ImagePage: React.SFC<IImagePage> = ({ images, admin }) => {
  const renderAdminControls = (image) => {
    if (!admin) { return null; }
    return (
      <div>
        <Link to={`/admin/images/${image.id}/edit`}>edit</Link>
        {' '}
        <Link to={`/admin/images/${image.id}/delete`}>delete</Link>
      </div>
    );
  };

  const renderImagePanel = (image) => {
    return (
      <div className="col-lg-3 my-3" key={`image-panel-${image.id}`}>
        <ImagePanel image={image} />
        {renderAdminControls(image)}
      </div>
    );
  };


  return (
    <div className="container">
      <div className="row">
        {!!images.length && images.map(renderImagePanel)}
      </div>
    </div>
  );
};

export default ImagePage;
