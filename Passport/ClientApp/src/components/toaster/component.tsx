import classNames from 'classnames';
import * as React from 'react';
import { PoseGroup } from 'react-pose';

import { PassportContext, PassportContextType } from 'passport/core/passport-context';
import { Error } from 'passport/features/error';
import { Notification } from '../notification';

class ToasterComponent extends React.Component {
  public static contextType = PassportContext;
  public context!: PassportContextType;

  public render() {
    const classes = classNames('px-0 sm:px-4 md:px-8 mx-auto w-full md:w-sm lg:w-md');
    return (
      <div className={classes}>
        <PoseGroup>
          {this.context.error && <Error key="alert" error={this.context.error} onClickClose={this.clearError} />}
          {!!this.context.notification && (
            <Notification
              key="notification"
              message={this.context.notification}
              onClickClose={this.clearNotification}
            />
          )}
        </PoseGroup>
      </div>
    );
  }

  private clearError = () => {
    this.context.clear('error');
  };

  private clearNotification = () => {
    this.context.clear('notification');
  };
}

export const Toaster: React.ComponentClass = ToasterComponent;
