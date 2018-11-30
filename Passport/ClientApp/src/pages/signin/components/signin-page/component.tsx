import * as React from 'react';
import { RouterProps } from 'react-router';

import { Layout, LayoutType } from 'passport/features/layout';

type Props = RouterProps;

class SigninPageComponent extends React.Component<Props> {
  public render() {
    return <Layout type={LayoutType.FullScreen}>Signin or sometihng</Layout>;
  }
}

export const SigninPage: React.ComponentClass<RouterProps> = SigninPageComponent;
