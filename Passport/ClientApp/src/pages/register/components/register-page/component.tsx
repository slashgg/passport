import * as queryString from 'query-string';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Layout, LayoutType } from 'passport/features/layout';
import { Register } from 'passport/features/register';

type Props = RouteComponentProps;

class RegisterPageComponent extends React.Component<Props> {
  public render() {
    const state = this.props.location.state;
    return (
      <Layout type={LayoutType.FullScreen}>
        <Register returnUrl={state && state.returnUrl} />
      </Layout>
    );
  }
}

export const RegisterPage: React.ComponentClass<RouteComponentProps> = RegisterPageComponent;
