import { Notification as Message, OperationError, ToasterContext, ToasterContextType } from '@slashgg/singapore';
import classNames from 'classnames';
import { Notification } from 'passport/components/notification';
import { Error } from 'passport/features/error';
import * as React from 'react';
import { PoseGroup } from 'react-pose';

class ToasterComponent extends React.Component {
  public static contextType = ToasterContext;
  public context!: ToasterContextType;

  public render() {
    const classes = classNames('px-0 sm:px-4 md:px-8 mx-auto w-full md:w-sm lg:w-md');
    const errors = this.context.errors.map(this.renderError);
    const messages = this.context.messages.map(this.renderNotification);
    return (
      <div className={classes}>
        <PoseGroup>{errors}</PoseGroup>
        <PoseGroup>{messages}</PoseGroup>
      </div>
    );
  }

  private renderError = (error: OperationError, index: number) => (
    <Error key={`${error.Code}:index`} error={error} onClickClose={this.clearError} />
  );

  private renderNotification = (notification: Message, index: number) => (
    <Notification
      key={`${notification.message}:1`}
      message={notification.message}
      onClickClose={this.clearNotification}
    />
  );

  private clearError = () => {
    this.context.clear('error');
  };

  private clearNotification = () => {
    this.context.clear('notification');
  };
}

export const Toaster: React.ComponentClass = ToasterComponent;
