import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { StoreProvider } from '~/context/store';
import { AuthRoute, Header } from '~/components';
import { Unauthorized, AdminHome } from '~/pages';


const App: React.SFC = () => {
  return (
    <StoreProvider>
      <Router>
        <div className="bg-dark">
          <Header />
        </div>
        <Switch>
          <Route path="/unauthorized" component={Unauthorized} />
          <AuthRoute path="/admin" component={AdminHome} />
          <Route path="/"><div>home page</div></Route>
        </Switch>
      </Router>
    </StoreProvider>
  );
};

export default App;
