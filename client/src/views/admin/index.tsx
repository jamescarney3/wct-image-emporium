import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import Home from './admin-home';
import ImagesIndex from './images-index';
import ImagesEdit from './images-edit';
import ImagesNew from './images-new';
import ImagesDelete from './images-delete';


const Admin = ({ match }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <ul className="list-group">
            <li className="list-group-item">
              <Link to={`${match.path}`}>admin home</Link>
            </li>
            <li className="list-group-item">
              <Link to={`${match.path}/images`}>my uploads</Link>
            </li>
            <li className="list-group-item">
              <Link to={`${match.path}/images/new`}>upload image</Link>
            </li>
          </ul>
        </div>
        <div className="col-lg-9">
          <Switch>
            <Route path={`${match.path}/images/:id/edit`} component={ImagesEdit} />
            <Route path={`${match.path}/images/:id/delete`} component={ImagesDelete} />
            <Route path={`${match.path}/images/new`} component={ImagesNew} />
            <Route path={`${match.path}/images`} component={ImagesIndex} />
            <Route path={`${match.path}`} component={Home} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Admin;
