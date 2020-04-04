import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Unauthorized } from '~/pages';


const App: React.SFC = () => {
  return (
    <Router>
      <h1>Praise be to SMARF</h1>
      <a href="/auth/twitter">sign in</a>
      <Switch>
        <Route path="/unauthorized" component={Unauthorized} />
        <Route path="/admin"><div>welcome, king.</div></Route>
        <Route path="/"><div>home page</div></Route>
      </Switch>
    </Router>
  );
};

export default App;
