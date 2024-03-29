import { Paragraph } from '@slashgg/diwali';
import * as React from 'react';

import { withData, WithDataOptionsMapper, WithDataProps } from '@slashgg/singapore';
import { Panel } from 'passport/components/panel';
import { ForgotPasswordForm } from '../forgot-password-form';

export interface State {
  isSuccessful: boolean;
}

type Props = WithDataProps<{}>;

class ForgotPasswordComponent extends React.Component<Props, State> {
  public state: State = {
    isSuccessful: false,
  };

  private isUnmounted = false;

  public componentWillUnmount() {
    this.isUnmounted = true;
  }

  public render() {
    const content = this.renderContent();
    return <Panel heading="Forgot Password">{content}</Panel>;
  }

  private renderContent: () => JSX.Element = () => {
    if (this.state.isSuccessful) {
      return <Paragraph>Please check your email for password reset instructions!</Paragraph>;
    }

    return <ForgotPasswordForm isSubmitting={this.props.isSubmitting} onSubmit={this.handleFormSubmit} />;
  };

  private handleFormSubmit = (email: string) => {
    this.props.invoke({ email }).then(() => {
      if (!this.isUnmounted) {
        this.setState({
          isSuccessful: true,
        });
      }
    });
  };
}

const withDataMapper: WithDataOptionsMapper<{}> = () => ({
  method: 'get',
  path: '/api/v1/password',
});

export const ForgotPassword: React.ComponentClass = withData(withDataMapper)(ForgotPasswordComponent);
