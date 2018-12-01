import * as queryString from 'query-string';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Layout, LayoutType } from 'passport/features/layout';
import { Register } from 'passport/features/register';

type Props = RouteComponentProps;

class RegisterPageComponent extends React.Component<Props> {
  public render() {
    const params = queryString.parse(this.props.location.search);
    return (
      <Layout type={LayoutType.FullScreen}>
        <Register returnUrl={params.returnUrl as string} />
      </Layout>
    );
  }
}

export const RegisterPage: React.ComponentClass<RouteComponentProps> = RegisterPageComponent;
