import { withData, WithDataOptionsMapper, WithDataProps } from '@slashgg/singapore';
import { Panel } from 'passport/components/panel';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { PasswordSignin } from '../../models/password-signin';
import { SignInForm } from '../signin-form';

export interface PublicProps {
  returnUrl: string;
}

type Props = PublicProps & WithDataProps<{}>;

class SigninComponent extends React.Component<Props> {
  public render() {
    return (
      <Panel heading="Sign in">
        <div className="flex flex-col w-full">
          <SignInForm isSubmitting={this.props.isSubmitting} onSubmit={this.handleSubmit} />
          <div className="my-3">Trouble signing in?</div>
          <div className="flex flex-col">
            <Link
              to={{ pathname: '/register', state: { returnUrl: this.props.returnUrl } }}
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

  private handleSubmit = async (model: PasswordSignin) => {
    try {
      const options: RequestInit = {
        body: JSON.stringify({ returnUrl: this.props.returnUrl, ...model }),
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'post',
      };
      await window.fetch('/api/v1/signin', options);
      window.location.href = this.props.returnUrl;
    } catch (err) {
      console.error(err);
    }
  };
}

const propsToDataOptions: WithDataOptionsMapper<PublicProps> = props => ({
  method: 'post',
  path: '/api/v1/signin',
});

export const Signin: React.ComponentClass<PublicProps> = withData(propsToDataOptions)(SigninComponent);
