import { Paragraph } from '@slashgg/diwali';
import { OperationError, withData, WithDataOptionsMapper, WithDataProps } from '@slashgg/singapore';
import { Panel } from 'passport/components/panel';
import { SignoutResponse } from 'passport/features/signout/api/signout';
import * as React from 'react';

export interface PublicProps {
  logoutId: string;
}

type Props = PublicProps & WithDataProps<SignoutResponse>;

class SignoutComponent extends React.Component<Props> {
  public componentDidMount() {
    this.props.invoke().then(response => {
      window.location.href = response.postLogoutRedirectUri;
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
  path: '/api/v1/signin?logoutId=' + props.logoutId,
});

export const Signout: React.ComponentClass<PublicProps> = withData(mapper)(SignoutComponent);
