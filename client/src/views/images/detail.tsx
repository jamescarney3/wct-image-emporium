import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useStore, useAccessors } from '~/context/store';
import { ImageDetail, LoadingSpinner } from '~/components';

const Detail = () => {
  const { id } = useParams();
  const [images, imagesActionCreators] = useStore('images');
  const { imageDetail } = useAccessors();
  const [records] = useStore('records');
  const { show, clear } = imagesActionCreators;

  useEffect(() => {
    show(id);
    return clear;
  }, []);

  if (images.loading) { return (<LoadingSpinner className="mx-auto my-5" />); }

  const image = imageDetail(images.data[0]);

  return (
    <div>
      {image && <ImageDetail image={image} />}
    </div>
  );
};

export default Detail;
