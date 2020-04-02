import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// var a = 'foo';

const App: React.SFC = () => {
  return (
    <Router>
      <h1>Praise be to SMARF</h1>
      <a href="/auth/twitter">sign in</a>
      <Switch>
        <Route path="/"><div>home page</div></Route>
        <Route path="/unauthorized"><div>get outa here!</div></Route>
        <Route path="/admin"><div>welcome, king.</div></Route>
      </Switch>
    </Router>
  );
};

export default App;
