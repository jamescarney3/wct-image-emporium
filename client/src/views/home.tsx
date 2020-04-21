import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ImagePage } from '~/components';
import { useStore, useAccessors } from '~/context/store';


const Home = () => {
  const [images, imagesActionCreators] = useStore('images');
  const { index, clear: recentClear } = imagesActionCreators;
  const [randomImages, randomImagesActionCreators] = useStore('randomImages');
  const { sample, clear: randomClear } = randomImagesActionCreators;
  const { imagesCollection } = useAccessors();

  useEffect(() => {
    recentClear();
    randomClear();
    index({ limit: 8 });
    sample({ limit: 8 });
    return () => {
      recentClear();
      randomClear();
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <p className="my-3 text-center">
            welcome, traveler, to da un0fficial & possibly only art museum of
            weird celtics twitter. this tool is intended to store and index the
            strange and beautiful art produced by the community so that through
            strong consideration one day we can open our 3rd eyes and preside
            over erotic city for 420 years each from the top of a rotating
            36-stepped emerald pyramid. no cowards ☘️
          </p>
        </div>
        <div className="col-lg-9">
          <div className="clearfix mt-3">
            <h2 className="float-left">recent artifacts:</h2>
            <Link to="/images" className="float-right">browse all images</Link>
          </div>
          <div className="row">
            <ImagePage images={imagesCollection(images.data)} />
          </div>
          <hr />
          <div className="clearfix mt-3">
            <h2 className="float-left">random artifacts:</h2>
            <Link to="/images/sample" className="float-right">sample random images</Link>
          </div>
          <div className="row">
            <ImagePage images={imagesCollection(randomImages.data)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
