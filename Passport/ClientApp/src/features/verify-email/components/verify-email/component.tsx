import { Paragraph } from '@slashgg/diwali';
import { withData, WithDataOptionsMapper, WithDataProps } from '@slashgg/singapore';
import { Panel } from 'passport/components/panel';
import * as React from 'react';
import { VerifyEmailModel } from '../../models/verify-email-model';

export interface PublicProps {
  token: string;
  userId: string;
}

export interface State {
  resetSuccess: boolean;
}

type Props = PublicProps & WithDataProps<{}>;

class VerifyEmailComponent extends React.Component<Props, State> {
  public state: State = {
    resetSuccess: false,
  };

  private isUnmounted = false;

  public componentDidMount() {
    const dto: VerifyEmailModel = {
      token: this.props.token,
      userId: this.props.userId,
    };

    this.props.invoke(dto).then(() => {
      if (!this.isUnmounted) {
        this.setState({
          resetSuccess: true,
        });
      }
    });
  }

  public componentWillUnmount() {
    this.isUnmounted = true;
  }

  public render() {
    return (
      <Panel heading="Verify Email">
        {this.state.resetSuccess && <Paragraph>Your email has been verified. You may close this window.</Paragraph>}
        {this.props.isSubmitting && <Paragraph>We are verifying your email...</Paragraph>}
        {!this.props.isSubmitting && !this.state.resetSuccess && (
          <Paragraph>
            We failed to verify your email. Please contact <a href="help@slash.gg">help@slash.gg</a> for assistance.
          </Paragraph>
        )}
      </Panel>
    );
  }
}

const withDataMapper: WithDataOptionsMapper<PublicProps> = props => ({
  method: 'put',
  path: '/api/v1/register',
});

export const VerifyEmail: React.ComponentClass<PublicProps> = withData(withDataMapper)(VerifyEmailComponent);
