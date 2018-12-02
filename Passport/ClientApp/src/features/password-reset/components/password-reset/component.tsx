import { Paragraph } from '@slashgg/diwali';
import * as React from 'react';

import { Panel } from 'passport/components/panel';
import { withData, WithDataOptionsMapper, WithDataProps } from 'passport/components/with-data';
import { PasswordResetModel } from '../../models/password-reset-model';
import { ResetPasswordForm } from '../password-reset-form';

export interface PublicProps {
  token: string;
  userId: string;
}

export interface State {
  resetSuccess: boolean;
}

type Props = PublicProps & WithDataProps;

class PasswordResetComponent extends React.Component<Props, State> {
  public state: State = {
    resetSuccess: false,
  };

  private isUnmounted = false;

  public componentWillUnmount() {
    this.isUnmounted = true;
  }

  public render() {
    return (
      <Panel heading="Password Reset">
        {this.state.resetSuccess && (
          <Paragraph>Your password reset is complete. You may close this window.</Paragraph>
        )}
        {!this.state.resetSuccess && (
          <ResetPasswordForm onSubmit={this.handleFormSubmit} isSubmitting={this.props.isSubmitting} />
        )}
      </Panel>
    );
  }

  private handleFormSubmit = (password: string) => {
    const dto: PasswordResetModel = {
      password,
      token: this.props.token,
      userId: this.props.userId,
    };

    this.props.invoke(dto).then((success: boolean) => {
      if (!this.isUnmounted) {
        this.setState({
          resetSuccess: success,
        });
      }
    });
  };
}

const withDataMapper: WithDataOptionsMapper<PublicProps> = props => ({
  method: 'put',
  path: '/api/v1/password',
});

export const PasswordReset: React.ComponentClass<PublicProps> = withData(PasswordResetComponent, withDataMapper);
