import { Paragraph } from '@slashgg/diwali';
import * as queryString from 'query-string';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Layout, LayoutType } from 'passport/features/layout';
import { PasswordReset } from 'passport/features/password-reset';

type Props = RouteComponentProps;

class PasswordResetPageComponent extends React.Component<Props> {
  public render() {
    const params = queryString.parse(this.props.location.search);
    if (!params.token) {
      return (
        <Layout type={LayoutType.FullScreen}>
          <div className="w-64 shadow bg-white p-4 text-center rounded">
            <Paragraph>Invalid password reset request.</Paragraph>
          </div>
        </Layout>
      );
    }

    return (
      <Layout type={LayoutType.FullScreen}>
        <PasswordReset token={params.token as string} />
      </Layout>
    );
  }
}

export const PasswordResetPage: React.ComponentClass<RouteComponentProps> = PasswordResetPageComponent;
