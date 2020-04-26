import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { useStore, useAccessors } from '~/context/store';
import SearchParams from '~/context/search-params';
import { ImagePage, Paginator } from '~/components';

const ImagesIndex = () => {
  const [adminImages, { index, clear }] = useStore('adminImages');
  const { imagesCollection } = useAccessors();

  const { dataParams, serverParams, mergeServerParams, setParams } = useContext(SearchParams);
  const { search } = useLocation();

  useEffect(() => {
    clear();
    return clear;
  }, []);

  useEffect(() => {
    if (!search) {
      index('admin=true');
    } else if (serverParams && !adminImages.loading) {
      index(mergeServerParams({ admin: true }));
    }
  }, [serverParams]);

  const paginatorProps = {
    offset: parseInt(dataParams.offset, 10) || 0,
    limit: parseInt(dataParams.limit, 10) || 2,
    count: adminImages.meta.count || 0,
  };

  if (adminImages.loading) { return (<div>loading...</div>); }

  return (
    <div className="container mt-3">
      <ImagePage images={imagesCollection(adminImages.data)} admin />
      {adminImages.meta.count > adminImages.meta.limit && <Paginator {...paginatorProps} />}
    </div>
  );
};

export default ImagesIndex;
