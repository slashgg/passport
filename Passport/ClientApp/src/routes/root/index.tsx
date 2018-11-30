import * as React from 'react';
import { Route, Switch } from 'react-router';

import { HomePage } from 'passport/pages/home';
import { NotFoundPage } from 'passport/pages/not-found';
import { RegisterPage } from 'passport/pages/register';
import { SigninPage } from 'passport/pages/signin';

class RootRouterComponent extends React.Component {
  public render() {
    return (
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/signin" exact component={SigninPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export const RootRouter: React.ComponentClass = RootRouterComponent;
