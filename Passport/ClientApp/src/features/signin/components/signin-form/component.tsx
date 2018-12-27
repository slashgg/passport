import { Button, Checkbox, CheckboxState, CheckboxStateChangeHandler, Input } from '@slashgg/diwali';
import * as React from 'react';

import { PasswordSignin } from '../../models/password-signin';

export interface PublicProps {
  onSubmit: (model: PasswordSignin) => void;
  isSubmitting: boolean;
}

type State = PasswordSignin;
type Props = PublicProps;

class SignInFormComponent extends React.Component<Props, State> {
  public state: State = {
    email: '',
    password: '',
    rememberMe: true,
  };

  public render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <fieldset disabled={this.props.isSubmitting} className="flex flex-col">
          <div className="mt-4">
            <label htmlFor="email" className="font-bold text-xs text-primary uppercase font-sans">
              Email
            </label>
            <Input type="email" name="email" id="email" onChange={this.addInputHandler('email')} />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="font-bold text-xs text-primary uppercase font-sans">
              Password
            </label>
            <Input type="password" name="password" id="password" onChange={this.addInputHandler('password')} />
          </div>
          <div className="mt-4">
            <Checkbox label="Remember me" onChange={this.handleRememberMe} />
          </div>
          <div className="mt-8">
            <Button block loading={this.props.isSubmitting}>
              Sign In
            </Button>
          </div>
        </fieldset>
      </form>
    );
  }

  private handleRememberMe: CheckboxStateChangeHandler = state => {
    this.setState({
      rememberMe: state === CheckboxState.Checked,
    });
  };

  private addInputHandler: (
    input: 'email' | 'password'
  ) => React.ChangeEventHandler<HTMLInputElement> = type => event => {
    this.setState({
      [type]: event.target.value,
    } as Pick<State, 'email' | 'password'>);
  };

  private handleFormSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };
}

export const SignInForm: React.ComponentClass<PublicProps> = SignInFormComponent;
