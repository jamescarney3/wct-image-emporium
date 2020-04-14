import React, { useEffect } from 'react';

import { useStore, useAccessors } from '~/context/store';
import { ImagePage } from '~/components';


const ImagesHome = () => {
  const [images, imagesActionCreators] = useStore('images');
  const { index, clear } = imagesActionCreators;
  const { imagesCollection } = useAccessors();


  useEffect(() => {
    index();
    return clear;
  }, []);

  if (images.loading) { return (<div>loading...</div>); }

  return (
    <div>
      <ImagePage images={imagesCollection(images.data)} />
    </div>
  );
};

export default ImagesHome;
