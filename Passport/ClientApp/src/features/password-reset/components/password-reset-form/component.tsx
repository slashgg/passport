import { Button, Input } from '@slashgg/diwali';
import * as React from 'react';

export interface PublicProps {
  isSubmitting: boolean;
  onSubmit: (password: string) => void;
}

export interface State {
  password: string;
}

type Props = PublicProps;

class ResetPasswordFormComponent extends React.Component<Props, State> {
  public state: State = {
    password: '',
  };

  public render() {
    return (
      <form onSubmit={this.handleFormSubmit} className="w-full" autoComplete="off">
        <input type="hidden" autoComplete="false" />
        <fieldset disabled={this.props.isSubmitting}>
          <div className="flex flex-col">
            <div className="my-4">
              <label htmlFor="new-pass" className="font-bold text-xs text-primary uppercase font-sans">
                New Password
              </label>
              <Input
                name="new-pass"
                id="new-pass"
                type="password"
                placeholder="Password"
                onChange={this.handlePasswordInput}
              />
            </div>
            <div className="flex">
              <Button className="ml-auto">Change</Button>
            </div>
          </div>
        </fieldset>
      </form>
    );
  }

  private handlePasswordInput: React.ChangeEventHandler<HTMLInputElement> = event => {
    this.setState({
      password: event.target.value,
    });
  };

  private handleFormSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.password);
  };
}

export const ResetPasswordForm: React.ComponentClass<PublicProps> = ResetPasswordFormComponent;
