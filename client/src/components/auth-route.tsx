import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router';

import { useStore } from '~/context/store';


interface IAuthRoute extends RouteProps {
  redirectTo?: string;
}

const AuthRoute: React.SFC<IAuthRoute> = ({ children, redirectTo, ...rest }) => {

  const [user] = useStore('user');

  return (
    <Route {...rest}>
      {user.signedIn ? children : <Redirect to={redirectTo || '/'} />}
    </Route>
  );
};

export default AuthRoute;
