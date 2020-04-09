import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { AdminHome, ImageUpload } from '~/views';
import { AuthRoute } from '~/components';
import { useStore } from '~/context/store';


interface IAdmin {
  match: { path: string };
}

const Admin: React.SFC<IAdmin> = ({ match }) => {

  const [user, userActionCreators] = useStore('user');
  const { signOut } = userActionCreators;

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <ul className="list-group">
            <li className="list-group-item">
              <Link to={match.path}>admin home</Link>
            </li>
            <li className="list-group-item">
              <Link to={`${match.path}/images`}>my images</Link>
            </li>
            <li className="list-group-item">
              <Link to={`${match.path}/tags`}>my tags</Link>
            </li>
            <li className="list-group-item">
              <Link to={`${match.path}/image-upload`}>image upload</Link>
            </li>
            <li className="list-group-item">
              <button className="btn btn-link p-0" onClick={signOut}>log out</button>
            </li>
          </ul>
        </div>
        <div className="col-lg-9">
          <Switch>
            <AuthRoute path={`${match.path}/image-upload`} component={ImageUpload} />
            <AuthRoute path={`${match.path}`} component={AdminHome} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Admin;
