import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { StoreProvider } from '~/context/store';
import { AuthRoute, Header } from '~/components';
import { Unauthorized, Admin, Images, Home } from '~/views';


const App: React.SFC = () => {
  return (
    <StoreProvider>
      <Router>
        <div className="bg-dark">
          <Header />
        </div>
        <Switch>
          <Route path="/unauthorized" component={Unauthorized} />
          <AuthRoute path="/admin" component={Admin} />
          <Route path="/images" component={Images} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </StoreProvider>
  );
};

export default App;
