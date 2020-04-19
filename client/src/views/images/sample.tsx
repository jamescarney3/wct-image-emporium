import React, { useEffect } from 'react';

import { useStore, useAccessors } from '~/context/store';
import { ImagePage } from '~/components';

const Sample = () => {
  const [images, imagesActionCreators] = useStore('images');
  const { imageDetail } = useAccessors();
  const { sample, clear } = imagesActionCreators;
  const { imagesCollection } = useAccessors();

  useEffect(() => {
    sample();
    return clear;
  }, []);

  if (images.loading) { return (<div>loading...</div>); }

  return (
    <div>
      [[ filter component pending ]]
      [[ refresh button pending ]]
      <ImagePage images={imagesCollection(images.data)} />
    </div>
  );
};

export default Sample;
