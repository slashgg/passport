import * as React from 'react';
import { Router } from 'react-router';

import { RootRouter } from 'passport/routes/root';
import { passport } from '../passport';
import {
  LoginHandler,
  LogoutHandler,
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
      login: this.login,
      logout: this.logout,
      user: this.state.user,
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
}

passport.mount(<App />, document.getElementById('root')!);
