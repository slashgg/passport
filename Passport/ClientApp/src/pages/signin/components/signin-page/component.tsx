import { Paragraph } from '@slashgg/diwali';
import * as queryString from 'query-string';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Layout, LayoutType } from 'passport/features/layout';
import { Signin } from 'passport/features/signin';

type Props = RouteComponentProps;

class SigninPageComponent extends React.Component<Props> {
  public render() {
    const params = queryString.parse(this.props.location.search);
    return (
      <Layout type={LayoutType.FullScreen}>
        {params.returnUrl ? (
          <Signin returnUrl={params.returnUrl as string} />
        ) : (
          <div className="p-4 bg-white shadow rounded">
            <Paragraph>Invalid sign in state</Paragraph>
          </div>
        )}
      </Layout>
    );
  }
}

export const SigninPage: React.ComponentClass<RouteComponentProps> = SigninPageComponent;
