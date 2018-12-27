import { Layout, LayoutType } from 'passport/features/layout';
import { Signout } from 'passport/features/signout';
import { parse } from 'querystring';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

type Props = RouteComponentProps;

class SignoutPageComponent extends React.Component<Props> {
  public render() {
    const params = parse(this.props.location.search, '?');
    return (
      <Layout type={LayoutType.FullScreen}>
        <Signout logoutId={params.logoutId as string} />
      </Layout>
    );
  }
}

export const SignoutPage: React.ComponentClass<RouteComponentProps> = SignoutPageComponent;
