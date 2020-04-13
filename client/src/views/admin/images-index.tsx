import React, { useEffect } from 'react';

import { useStore, useAccessors } from '~/context/store';
import { ImagePage } from '~/components';

const ImagesIndex = () => {
  const [adminImages, { index, clear }] = useStore('adminImages');
  const { imagesCollection } = useAccessors();

  useEffect(() => {
    clear();
    index({ admin: true });
    return clear;
  }, []);

  if (adminImages.loading) { return (<div>loading...</div>); }

  return (
    <div className="container">
      <ImagePage images={imagesCollection(adminImages.data)} admin />
    </div>
  );
};

export default ImagesIndex;
