import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useStore, useAccessors } from '~/context/store';
import { ImageDetail } from '~/components';

const Random = () => {
  const [images, imagesActionCreators] = useStore('images');
  const { imageDetail } = useAccessors();
  const [records] = useStore('records');
  const { random, clear } = imagesActionCreators;

  useEffect(() => {
    random();
    return clear;
  }, []);

  const image = imageDetail(images.data[0]);

  if (images.loading) { return (<div>loading...</div>); }

  return (
    <div>
      [[ refresh button pending ]]
      {image && <ImageDetail image={image} />}
    </div>
  );
};

export default Random;
