import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useStore, useAccessors } from '~/context/store';


const ImagesEdit = () => {
  const { id } = useParams();
  const [images, imagesActionCreators] = useStore('images');
  const { imageDetail } = useAccessors();
  const [records] = useStore('records');
  const { show, clear } = imagesActionCreators;

  useEffect(() => {
    clear();
    show(id);
    return clear;
  }, []);

  return (<div>[[ edit form goes here for {JSON.stringify(imageDetail(id))} ]]</div>);
};

export default ImagesEdit;
