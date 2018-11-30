import * as React from 'react';
import { RouterProps } from 'react-router';

import { Layout, LayoutType } from 'passport/features/layout';
import { RegisterForm } from 'passport/features/register-form';

type Props = RouterProps;

class RegisterPageComponent extends React.Component<Props> {
  public render() {
    return (
      <Layout type={LayoutType.FullScreen}>
        <RegisterForm />
      </Layout>
    );
  }
}

export const RegisterPage: React.ComponentClass<RouterProps> = RegisterPageComponent;
