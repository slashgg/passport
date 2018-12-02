import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { ForgotPassword } from 'passport/features/forgot-password';
import { Layout, LayoutType } from 'passport/features/layout';

type Props = RouteComponentProps;

class ForgotPasswordPageComponent extends React.Component<Props> {
  public render() {
    return (
      <Layout type={LayoutType.FullScreen}>
        <ForgotPassword />
      </Layout>
    );
  }
}

export const ForgotPasswordPage: React.ComponentClass<RouteComponentProps> = ForgotPasswordPageComponent;
