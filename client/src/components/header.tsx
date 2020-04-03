import React from 'react';
import { Link } from 'react-router-dom';


interface IHeaderProps {
  signedIn?: boolean;
}

const SIGNED_IN_TEXT = 'admin tools';
const NOT_SIGNED_IN_TEXT = 'admin login';

const SIGNED_IN_PATH = '#'; // figure out what this is gonna be and replace
const NOT_SIGNED_IN_PATH = '/auth/twitter';

const Header: React.FC<IHeaderProps> = ({ signedIn }) => {

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
        <form className="flex-grow-1 my-3 mx-lg-5">
          <label className="sr-only" htmlFor="inlineFormInputGroup">Search</label>
          <div className="input-group">
            <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Search" />
            <div className="input-group-append">
              <div className="input-group-text">🔍</div>
            </div>
          </div>
        </form>
        <a
          className="navbar-navitem d-block my-3 ml-lg-3"
          href={signedIn ? SIGNED_IN_PATH : NOT_SIGNED_IN_PATH}
        >
          {signedIn ? SIGNED_IN_TEXT : NOT_SIGNED_IN_TEXT}
        </a>
      </div>
    </nav>
  );
};

export default Header;
