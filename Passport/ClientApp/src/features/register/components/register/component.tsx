import classNames from 'classnames';
import * as React from 'react';

import { Panel } from 'passport/components/panel';
import { passport } from 'passport/core/passport';
import { PassportContext, PassportContextType } from 'passport/core/passport-context';
import { OperationError } from 'passport/features/error/models/operation-error';
import { RegisterModel } from '../../models/register-model';
import { RegisterForm } from '../register-form';

export interface PublicProps {
  returnUrl?: string;
}

type Props = PublicProps;

export interface State {
  isSubmitting: boolean;
}

class RegisterComponent extends React.Component<Props, State> {
  public static contextType = PassportContext;
  public context!: PassportContextType;
  public state: State = {
    isSubmitting: false,
  };

  private redirectTimeout: number;

  public componentDidMount() {
    if (this.context.user) {
      this.redirectTimeout = window.setTimeout(this.redirect, 5000);
    }
  }

  public componentWillUnmount() {
    if (this.redirectTimeout) {
      window.clearTimeout(this.redirectTimeout);
    }
  }

  public render() {
    const classes = classNames('flex flex-col shadow bg-white p-6 mt-8 rounded');
    return (
      <Panel heading="Register">
        <RegisterForm onSubmit={this.onSubmit} isSubmitting={this.state.isSubmitting} />
      </Panel>
    );
  }

  private onSubmit = (model: RegisterModel) => {
    // Reset the error state since we are an alerter.
    this.context.clear('error');

    window
      .fetch('/api/v1/register', {
        body: JSON.stringify({ returnUrl: this.props.returnUrl, ...model }),
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
      })
      .then((res: Response) => {
        if (!res.ok) {
          return res.json();
        }
        return Promise.resolve();
      })
      .then((error?: OperationError) => {
        if (error) {
          this.context.alert(error);
        } else {
          this.redirect();
        }
      });
  };

  private redirect = () => {
    passport.history.push('/signin-complete', { returnUrl: this.props.returnUrl });
  };
}

export const Register: React.ComponentClass<PublicProps> = RegisterComponent;
