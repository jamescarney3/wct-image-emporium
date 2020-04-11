import React from 'react';

import { ImagePanel } from '~/components';

const ImagePage = ({ images }) => {
  const renderImagePanel = (image) => {
    return (
      <div className="col-lg-6" key={`image-panel-${image.id}`}>
        <ImagePanel image={image} />
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row">
        {images.map(renderImagePanel)}
      </div>
    </div>
  );
};

export default ImagePage;
