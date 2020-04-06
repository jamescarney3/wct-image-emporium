import React from 'react';
import { Link } from 'react-router-dom';

import { useStore } from '~/context/store';


const AdminHome = () => {

  const [user, userActionCreators] = useStore('user');
  const { signOut } = userActionCreators;

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <ul className="list-group">
            <li className="list-group-item">
              <Link to="/admin">admin home</Link>
            </li>
            <li className="list-group-item">
              <Link to="/admin/images">my images</Link>
            </li>
            <li className="list-group-item">
              <Link to="/admin/tags">my tags</Link>
            </li>
            <li className="list-group-item">
              <button className="btn btn-link p-0" onClick={signOut}>log out</button>
            </li>
          </ul>
        </div>
        <div className="col-lg-9">[[ main content placeholder ]]</div>
      </div>
    </div>
  );
};

export default AdminHome;
