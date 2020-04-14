import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useStore, useAccessors } from '~/context/store';
import { ImageDetail } from '~/components';

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

  if (images.loading) { return (<div>loading...</div>); }

  const image = imageDetail(images.data[0]);

  return (
    <div>
      {image && <ImageDetail image={image} />}
    </div>
  );
};

export default Detail;
