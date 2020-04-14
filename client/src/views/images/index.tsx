import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import Detail from './detail';
import Home from './home';
import Random from './random';
import Sample from './sample';


const Images = ({ match }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <ul className="list-group">
            <li className="list-group-item">
              <Link to={`${match.path}`}>images home</Link>
            </li>
            <li className="list-group-item">
              <Link to={`${match.path}/random`}>random image</Link>
            </li>
            <li className="list-group-item">
              <Link to={`${match.path}/sample`}>random batch</Link>
            </li>
          </ul>
        </div>
        <div className="col-lg-9">
          <Switch>
            <Route path={`${match.path}/random`} component={Random} />
            <Route path={`${match.path}/sample`} component={Sample} />
            <Route path={`${match.path}/:id`} component={Detail} />
            <Route path={`${match.path}`} component={Home} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Images;
