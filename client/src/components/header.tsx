import React from 'react';
import { Link } from 'react-router-dom';

import { useStore } from '~/context/store';


interface IHeaderProps {
  signedIn?: boolean;
}

const Header: React.FC<IHeaderProps> = () => {
  const [user] = useStore('user');
  const { signedIn } = user;

  const signInLink = (<a href="/auth/twitter">admin login</a>);
  const adminLink = (<Link to="/admin">admin tools</Link>);

  const onSearch = (e) => {
    e.preventDefault();
    alert('search feature under construction; bug me on twitter to finish it');
  };

  return (
    <nav className="container navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="#navbarToggler"
        aria-expanded="false"
        aria-label="toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link className="navbar-brand" to="/">WCT Image Emporium</Link>
      <div className="collapse navbar-collapse" id="navbarToggler">
        <form className="flex-grow-1 my-3 mx-lg-5" onSubmit={onSearch}>
          <label className="sr-only" htmlFor="inlineFormInputGroup">Search</label>
          <div className="input-group">
            <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Search" />
            <div className="input-group-append">
              <div className="input-group-text" onClick={onSearch}>🔍</div>
            </div>
          </div>
        </form>
        <div className="navbar-navitem my-3 ml-lg-3 flex-grow-2">
          {signedIn ? adminLink : signInLink}
        </div>
      </div>
    </nav>
  );
};

export default Header;
