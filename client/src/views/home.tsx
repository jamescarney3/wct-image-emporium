import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <h3>[[ about this page copy pending ]]</h3>
        </div>
        <div className="col-lg-9">
          <div className="clearfix">
            <Link to="/images" className="float-right">browse all images</Link>
          </div>
          <div className="row">
            <div className="col">
              [[ recent images grid here ]
            </div>
          </div>
          <div className="clearfix">
            <Link to="/images/sample" className="float-right">sample random images</Link>
          </div>
          <div className="row">
            <div className="col">
              [[ random images page here ]]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
