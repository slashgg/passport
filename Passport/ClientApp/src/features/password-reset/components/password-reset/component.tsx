import * as React from 'react';

import { Panel } from 'passport/components/panel';
import { PassportContext, PassportContextType } from 'passport/core/passport-context';
import { OperationError } from 'passport/features/error/models/operation-error';
import { PasswordResetModel } from '../../models/password-reset-model';
import { ResetPasswordForm } from '../password-reset-form';

export interface PublicProps {
  token: string;
  userId: string;
}

export interface State {
  isSubmitting: boolean;
}

type Props = PublicProps;

class PasswordResetComponent extends React.Component<Props, State> {
  public static contextType = PassportContext;
  public context!: PassportContextType;
  public state: State = {
    isSubmitting: false,
  };

  private isUnmounted = false;

  public componentWillUnmount() {
    this.isUnmounted = true;
  }

  public render() {
    return (
      <Panel heading="Password Reset">
        <ResetPasswordForm onSubmit={this.handleFormSubmit} isSubmitting={this.state.isSubmitting} />
      </Panel>
    );
  }

  private handleFormSubmit = (password: string) => {
    this.setState({
      isSubmitting: true,
    });

    const dto: PasswordResetModel = {
      password,
      token: this.props.token,
      userId: this.props.userId,
    };

    // We generate alerts so we should clear them before we send
    this.context.clear('error');

    window
      .fetch('api/v1/password', {
        body: JSON.stringify(dto),
        headers: { 'Content-Type': 'application/json' },
        method: 'put',
      })
      .then(res => {
        if (!res.ok) {
          return res.json();
        }
        return Promise.resolve();
      })
      .then((error?: OperationError) => {
        if (error) {
          this.context.alert(error);
        } else {
          this.context.notify('Your password has been changed.');
        }

        if (!this.isUnmounted) {
          this.setState({
            isSubmitting: false,
          });
        }
      });
  };
}

export const PasswordReset: React.ComponentClass<PublicProps> = PasswordResetComponent;
