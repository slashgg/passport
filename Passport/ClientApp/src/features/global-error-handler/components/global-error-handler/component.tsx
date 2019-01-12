import * as Sentry from '@sentry/browser';
import * as React from 'react';

interface State {
  hasError: boolean;
}

class GlobalErrorHandlerComponent extends React.Component<{}, State> {
  public state: State = {
    hasError: false,
  };

  public componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      hasError: true,
    });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center">
          <h2 className="text-danger my-2">Something bad happened :(</h2>
          <a className="text-alternative" href="#" onClick={() => Sentry.showReportDialog()}>
            Report feedback
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

export const GlobalErrorHandler: React.ComponentClass = GlobalErrorHandlerComponent;
