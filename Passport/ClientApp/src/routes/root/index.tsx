import * as React from 'react';
import { Route, Switch } from 'react-router';

import { NotFoundPage } from 'passport/pages/not-found';
import { RegisterPage } from 'passport/pages/register';

class RootRouterComponent extends React.Component {
  public render() {
    return (
      <Switch>
        <Route path="/register" exact component={RegisterPage} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export const RootRouter: React.ComponentClass = RootRouterComponent;
