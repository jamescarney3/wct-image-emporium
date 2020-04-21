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

  const renderContent = () => {
    if (images.loading) { return (<div>loading...</div>); }
    if (images.error) { return (<div>error fetching page data!</div>); }
    return (image && <ImageDetail image={image} />);
  };



  return (
    <div>
      <div className="mt-3 clearfix">
        <h2 className="float-left">random artifact:</h2>
        <button className="btn btn-primary btn-sm float-right" onClick={random}>
          refresh
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default Random;
