import React, { useEffect } from 'react';

import { useStore } from '~/context/store';
import { ImagePage } from '~/components';



const AdminHome = () => {
  const [records] = useStore('records');
  const [adminImages, adminImageActionCreators] = useStore('adminImages');
  const { index } = adminImageActionCreators;

  useEffect(index, []);

  const images = adminImages.data.map((id) => records.images[id]);

  return (
    <div className="container">
      <ImagePage images={images} />
    </div>
  );
};

export default AdminHome;
