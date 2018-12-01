import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Layout, LayoutType } from 'passport/features/layout';

type Props = RouteComponentProps;

class SigninPageComponent extends React.Component<Props> {
  public render() {
    return <Layout type={LayoutType.FullScreen}>Signin or sometihng</Layout>;
  }
}

export const SigninPage: React.ComponentClass<RouteComponentProps> = SigninPageComponent;
