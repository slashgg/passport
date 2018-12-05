import { Paragraph } from '@slashgg/diwali';
import * as queryString from 'query-string';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Layout, LayoutType } from 'passport/features/layout';
import { VerifyEmail } from 'passport/features/verify-email';

type Props = RouteComponentProps;

class VerifyEmailPageComponent extends React.Component<Props> {
  public render() {
    const params = queryString.parse(this.props.location.search);
    if (!params.token || !params.id) {
      return (
        <Layout type={LayoutType.FullScreen}>
          <div className="w-64 shadow bg-white p-4 text-center rounded">
            <Paragraph>Invalid email verification request.</Paragraph>
          </div>
        </Layout>
      );
    }

    return (
      <Layout type={LayoutType.FullScreen}>
        <VerifyEmail token={params.token as string} userId={params.id as string} />
      </Layout>
    );
  }
}

export const VerifyEmailPage: React.ComponentClass<RouteComponentProps> = VerifyEmailPageComponent;
