import * as React from 'react';
import { Router } from 'react-router';

import {
  AlertHandler,
  Notification,
  NotifyHandler,
  ToasterActions,
  ToasterContext,
  ToasterContextType,
  ToasterState,
} from '@slashgg/singapore';
import { RootRouter } from 'passport/routes/root';
import { passport } from '../passport';

type State = ToasterState;

class App extends React.Component<{}, State> implements ToasterActions {
  public state: State = {
    errors: [],
    messages: [],
  };

  public render() {
    const contextValue: ToasterContextType = {
      alert: this.alert,
      clear: this.clear,
      notify: this.notify,
      ...this.state,
    };

    return (
      <ToasterContext.Provider value={contextValue}>
        <Router history={passport.history}>
          <RootRouter />
        </Router>
      </ToasterContext.Provider>
    );
  }

  public alert: AlertHandler = error => {
    this.setState(prev => {
      const errors = prev.errors.concat(error);
      return { errors };
    });
  };

  public notify: NotifyHandler = notification => {
    this.setState(prev => {
      const message: Notification = {
        action: () => Promise.resolve(),
        message: notification,
      };
      const messages = prev.messages.concat(message);

      return { messages };
    });
  };

  public clear = (type: 'error' | 'notification') => {
    if (type === 'error') {
      this.setState({
        errors: [],
      });
    } else {
      this.setState({
        messages: [],
      });
    }
  };
}

passport.mount(<App />, document.getElementById('root')!);
