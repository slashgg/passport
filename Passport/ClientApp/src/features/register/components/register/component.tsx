import {
  ToasterContext,
  ToasterContextType,
  withData,
  WithDataOptionsMapper,
  WithDataProps,
} from '@slashgg/singapore';
import { Panel } from 'passport/components/panel';
import { passport } from 'passport/core/passport';
import * as React from 'react';
import { RegisterModel } from '../../models/register-model';
import { RegisterForm } from '../register-form';

export interface PublicProps {
  returnUrl?: string;
}

type Props = PublicProps & WithDataProps<{}>;

class RegisterComponent extends React.Component<Props> {
  public static contextType = ToasterContext;
  public context!: ToasterContextType;

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
        if (returnUrl) {
          window.location.href = returnUrl;
        } else {
          this.context.notify('You registration is successful! Please check your email for a welcome message!');
          passport.history.push('/');
        }
      }
    });
  };
}

const withDataOptionsMapper: WithDataOptionsMapper<PublicProps> = () => ({
  method: 'post',
  path: '/api/v1/register',
});

export const Register: React.ComponentClass<PublicProps> = withData(withDataOptionsMapper)(RegisterComponent);
