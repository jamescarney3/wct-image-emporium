import React from 'react';

import { ImagePanel } from '~/components';

const ImagePage = ({ images }) => {
  const renderImagePanel = (image) => {
    return (
      <div className="col-lg-3" key={`image-panel-${image.id}`}>
        <ImagePanel image={image} />
      </div>
    );
  };

  return (
    <div className="container">
      <h2>[[ image page ]]</h2>
      <div className="row">
        {images.map(renderImagePanel)}
      </div>
    </div>
  );
};

export default ImagePage;
