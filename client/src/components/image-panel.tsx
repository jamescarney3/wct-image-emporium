import React from 'react';


const ImagePanel = ({ image }) => {
  return (
    <div className="my-2">
      <img src={image.url} className="w-100" />
      <div>{image.title}</div>
    </div>
  );
};

export default ImagePanel;
