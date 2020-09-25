import React, { useEffect } from 'react';

import { useStore, useAccessors } from '~/context/store';
import { ImagePage, LoadingSpinner } from '~/components';

const ImagesIndex = () => {
  const [adminImages, { index, clear }] = useStore('adminImages');
  const { imagesCollection } = useAccessors();

  useEffect(() => {
    clear();
    index({ admin: true });
    return clear;
  }, []);

  if (adminImages.loading) { return (<LoadingSpinner className="mx-auto my-5" />); }

  return (
    <div className="container mt-3">
      <ImagePage images={imagesCollection(adminImages.data)} admin />
    </div>
  );
};

export default ImagesIndex;
