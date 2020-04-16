import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { StoreProvider, useStore } from '~/context/store';
import { AuthRoute, Header } from '~/components';
import { Unauthorized, Admin, Images, Home } from '~/views';


const App: React.SFC = () => {
  const [user, userActionCreators] = useStore('user');

  useEffect(() => {
    userActionCreators.fetch();
  }, []);

  return (
    <Router>
      <div className="bg-dark">
        <Header />
      </div>
      <Switch>
        <Route path="/unauthorized" component={Unauthorized} />
        <AuthRoute path="/admin" component={Admin} redirectTo="/" />
        <Route path="/images" component={Images} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default () => (<StoreProvider><App /></StoreProvider>);
