import * as React from 'react';
import { Route, Switch } from 'react-router';

import { ForgotPasswordPage } from 'passport/pages/forgot-password';
import { HomePage } from 'passport/pages/home';
import { NotFoundPage } from 'passport/pages/not-found';
import { PasswordResetPage } from 'passport/pages/password-reset';
import { RegisterPage } from 'passport/pages/register';
import { SigninPage } from 'passport/pages/signin';
import { SignoutPage } from 'passport/pages/signout';
import { VerifyEmailPage } from 'passport/pages/verify-email';

class RootRouterComponent extends React.Component {
  public render() {
    return (
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/signin" exact component={SigninPage} />
        <Route path="/signout" exact component={SignoutPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/forgot-password" exact component={ForgotPasswordPage} />
        <Route path="/password-reset" exact component={PasswordResetPage} />
        <Route path="/verify-email" exact component={VerifyEmailPage} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export const RootRouter: React.ComponentClass = RootRouterComponent;
