import * as React from 'react';
import { Link } from 'react-router-dom';

import { Panel } from 'passport/components/panel';
import { withData, WithDataOptionsMapper, WithDataProps } from 'passport/components/with-data';
import { passport } from 'passport/core/passport';
import { PasswordSignin } from '../../models/password-signin';
import { SignInForm } from '../signin-form';

export interface PublicProps {
  returnUrl: string;
}

type Props = PublicProps & WithDataProps;

class SigninComponent extends React.Component<Props> {
  public render() {
    return (
      <Panel heading="Sign in">
        <div className="flex flex-col w-full">
          <SignInForm isSubmitting={this.props.isSubmitting} onSubmit={this.handleSubmit} />
          <div className="my-3">Trouble signing in?</div>
          <div className="flex flex-col">
            <Link
              to={`/register?returnUrl=${this.props.returnUrl}`}
              className="text-primary-light hover:text-primary my-1"
            >
              Register
            </Link>
            <Link to="/forgot-password" className="text-primary-light hover:text-primary my-1">
              I forgot my password
            </Link>
          </div>
        </div>
      </Panel>
    );
  }

  private handleSubmit = (model: PasswordSignin) => {
    this.props.invoke(model).then((success: boolean) => {
      if (success) {
        passport.history.push(this.props.returnUrl);
      }
    });
  };
}

const propsToDataOptions: WithDataOptionsMapper<PublicProps> = props => ({
  method: 'post',
  path: '/api/v1/signin',
});

export const Signin: React.ComponentClass<PublicProps> = withData(SigninComponent, propsToDataOptions);