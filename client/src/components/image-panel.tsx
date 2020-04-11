import React from 'react';
import { Link } from 'react-router-dom';


const ImagePanel = ({ image }) => {
  return (
    <Link className="my-3 d-block" to={`/images/${image.id}`}>
      <img src={image.url} className="w-100" />
      <h3>{image.title}</h3>
    </Link>
  );
};

export default ImagePanel;
