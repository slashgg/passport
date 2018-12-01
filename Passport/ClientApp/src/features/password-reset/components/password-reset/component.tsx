import * as React from 'react';

import { Panel } from 'passport/components/panel';
import { passport } from 'passport/core/passport';
import { PassportContext, PassportContextType } from 'passport/core/passport-context';
import { OperationError } from 'passport/features/error/models/operation-error';
import { PasswordResetModel } from '../../models/password-reset-model';

export interface PublicProps {
  token: string;
}

type Props = PublicProps;

class PasswordResetComponent extends React.Component<Props> {
  public static contextType = PassportContext;
  public context!: PassportContextType;

  private redirectTimeout: number;

  public componentWillUnmount() {
    if (this.redirectTimeout) {
      window.clearTimeout(this.redirectTimeout);
    }
  }

  public render() {
    return <Panel heading="Password Reset">Reset Password soon</Panel>;
  }

  private handleFormSubmit = (password: string) => {
    const dto: PasswordResetModel = {
      password,
      token: this.props.token,
    };

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
          this.context.notify('Your password has been changed. Redirecting you to the signin page.');
          this.redirectTimeout = window.setTimeout(() => {
            this.redirectTimeout = 0;
            passport.history.push('/signin');
          }, 3000);
        }
      });
  };
}

export const PasswordReset: React.ComponentClass<PublicProps> = PasswordResetComponent;
