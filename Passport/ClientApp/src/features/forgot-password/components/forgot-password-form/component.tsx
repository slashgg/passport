import { Button, Input } from '@slashgg/diwali';
import * as React from 'react';

import { Label } from 'passport/components/label';

export interface PublicProps {
  isSubmitting: boolean;
  onSubmit: (email: string) => void;
}

export interface State {
  email: string;
}

type Props = PublicProps;

class ForgotPasswordFormComponent extends React.Component<Props, State> {
  public state: State = {
    email: '',
  };

  public render() {
    return (
      <form onSubmit={this.handleSubmit} className="w-full">
        <fieldset disabled={this.props.isSubmitting}>
          <div className="flex flex-col w-full">
            <div className="mt-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                name="email"
                onChange={this.handlePasswordUpdate}
                placeholder="Email Address"
              />
            </div>
            <div className="mt-8">
              <Button block loading={this.props.isSubmitting}>
                Send Reset Email
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    );
  }

  private handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.email);
  };

  private handlePasswordUpdate: React.ChangeEventHandler<HTMLInputElement> = event => {
    this.setState({
      email: event.target.value,
    });
  };
}

export const ForgotPasswordForm: React.ComponentClass<PublicProps> = ForgotPasswordFormComponent;
