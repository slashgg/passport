import { Paragraph } from '@slashgg/diwali';
import { Panel } from 'passport/components/panel';
import { withData, WithDataOptionsMapper, WithDataProps } from 'passport/components/with-data';
import { SignoutResponse } from 'passport/features/signout/api/signout';
import * as React from 'react';

export interface PublicProps {
  logoutId: string;
}

type Props = PublicProps & WithDataProps;

class SignoutComponent extends React.Component<Props> {
  public componentDidMount() {
    this.props.invoke().then(response => {
      if (response) {
        const signout = response as SignoutResponse;
        window.location.href = signout.postLogoutRedirectUri;
      }
    });
  }

  public render() {
    if (!this.props.logoutId) {
      <Paragraph>Invalid sign out state.</Paragraph>;
    }
    return (
      <Panel heading="Sign out">
        <Paragraph>Please wait while we sign you out.</Paragraph>
      </Panel>
    );
  }
}

const mapper: WithDataOptionsMapper<PublicProps> = props => ({
  method: 'delete',
  path: '/api/v1/signout?logoutId=' + props.logoutId,
});

export const Signout: React.ComponentClass<PublicProps> = withData(SignoutComponent, mapper);
