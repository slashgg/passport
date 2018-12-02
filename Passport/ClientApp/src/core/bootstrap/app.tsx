import * as React from 'react';
import { Router } from 'react-router';

import { RootRouter } from 'passport/routes/root';
import { passport } from '../passport';
import {
  AlertHandler,
  LoginHandler,
  LogoutHandler,
  NotifyHandler,
  PassportActions,
  PassportContext,
  PassportContextType,
  PassportState,
} from '../passport-context';

class App extends React.Component<{}, PassportState> implements PassportActions {
  public state: PassportState = {
    user: undefined,
  };

  public render() {
    const contextValue: PassportContextType = {
      alert: this.alert,
      clear: this.clear,
      login: this.login,
      logout: this.logout,
      notify: this.notify,
      ...this.state,
    };

    return (
      <PassportContext.Provider value={contextValue}>
        <Router history={passport.history}>
          <RootRouter />
        </Router>
      </PassportContext.Provider>
    );
  }

  public login: LoginHandler = user => {
    this.setState({
      user,
    });
  };

  public logout: LogoutHandler = () => {
    this.setState({
      user: undefined,
    });
  };

  public alert: AlertHandler = error => {
    this.setState({
      error,
    });
  };

  public notify: NotifyHandler = notification => {
    this.setState({
      notification,
    });
  };

  public clear = (type: 'error' | 'notification') => {
    this.setState({
      [type]: undefined,
    });
  };
}

passport.mount(<App />, document.getElementById('root')!);
