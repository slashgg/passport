import * as Sentry from '@sentry/browser';
import {
  AlertHandler,
  Notification,
  NotifyHandler,
  ToasterActions,
  ToasterContext,
  ToasterContextType,
  ToasterState,
} from '@slashgg/singapore';
import { GlobalErrorHandler } from 'passport/features/global-error-handler';
import { RootRouter } from 'passport/routes/root';
import * as React from 'react';
import { Router } from 'react-router';
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

Sentry.init({
  dsn: 'https://127c882dba4d4a86bd815a0675b53ebe@sentry.io/1370311',
});

passport.mount(
  <GlobalErrorHandler>
    <App />
  </GlobalErrorHandler>,
  document.getElementById('root')!
);
