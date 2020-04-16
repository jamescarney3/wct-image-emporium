import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router';

import { useStore } from '~/context/store';


interface IAuthRoute extends RouteProps {
  redirectTo?: string;
}

const AuthRoute: React.SFC<IAuthRoute> = ({ redirectTo, ...rest }) => {

  const [user] = useStore('user');

  if (!user.pending && !user.signedIn) {
    return (<Redirect to={redirectTo || '/'} />);
  }

  if (user.pending) {
    return (<div>loading...</div>);
  }

  return (
    <Route {...rest} />
  );
};

export default AuthRoute;
