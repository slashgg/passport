import * as React from 'react';

import { Panel } from 'passport/components/panel';
import { withData, WithDataOptionsMapper, WithDataProps } from 'passport/components/with-data';
import { passport } from 'passport/core/passport';
import { RegisterModel } from '../../models/register-model';
import { RegisterForm } from '../register-form';

export interface PublicProps {
  returnUrl?: string;
}

type Props = PublicProps & WithDataProps;

class RegisterComponent extends React.Component<Props> {
  public componentDidMount() {
    if (this.context.user) {
      this.redirect();
    }
  }

  public render() {
    return (
      <Panel heading="Register">
        <RegisterForm onSubmit={this.onSubmit} isSubmitting={this.props.isSubmitting} />
      </Panel>
    );
  }

  private onSubmit = (model: RegisterModel) => {
    const { returnUrl } = this.props;
    const payload = {
      returnUrl,
      ...model,
    };

    this.props.invoke(payload).then((success: boolean) => {
      if (success) {
        passport.history.push(returnUrl || '/');
      }
    });
  };

  private redirect = () => {
    passport.history.push(this.props.returnUrl || '/');
  };
}

const withDataOptionsMapper: WithDataOptionsMapper<PublicProps> = () => ({
  method: 'post',
  path: '/api/v1/register',
});

export const Register: React.ComponentClass<PublicProps> = withData(RegisterComponent, withDataOptionsMapper);
