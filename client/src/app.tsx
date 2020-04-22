import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { StoreProvider, useStore } from '~/context/store';
import { SearchParamsProvider } from '~/context/search-params';
import { AuthRoute, Header } from '~/components';
import { Unauthorized, Admin, Images, Home } from '~/views';


const App: React.SFC = () => {
  const [user, userActionCreators] = useStore('user');

  useEffect(() => {
    userActionCreators.fetch();
  }, []);

  return (
    <Router>
      <SearchParamsProvider>
        <div className="bg-dark">
          <Header />
        </div>
        <Switch>
          <Route path="/unauthorized" component={Unauthorized} />
          <AuthRoute path="/admin" component={Admin} redirectTo="/" />
          <Route path="/images" component={Images} />
          <Route path="/" component={Home} />
        </Switch>
      </SearchParamsProvider>
      <footer className="pt-4 my-4 border-top container">
        <div className="row">
          <div className="col-12 col-md">
            <h5>WCT arts & crafts guild</h5>
            <p>marcus smart for lifetime DPOY</p>
            <small className="d-block mb-3 text-muted">2020</small>
          </div>
        </div>
      </footer>
    </Router>
  );
};

export default () => (<StoreProvider><App /></StoreProvider>);
