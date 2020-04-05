import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { StoreProvider } from '~/context/store';
import { Header } from '~/components';
import { Unauthorized } from '~/pages';


const App: React.SFC = () => {
  return (
    <StoreProvider>
      <Router>
        <div className="bg-dark">
          <Header />
        </div>
        <Switch>
          <Route path="/unauthorized" component={Unauthorized} />
          <Route path="/admin"><div>welcome, king.</div></Route>
          <Route path="/"><div>home page</div></Route>
        </Switch>
      </Router>
    </StoreProvider>
  );
};

export default App;
