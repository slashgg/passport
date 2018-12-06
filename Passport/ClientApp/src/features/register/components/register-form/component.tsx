import { Button, Input, Paragraph } from '@slashgg/diwali';
import * as React from 'react';

import { RegisterModel } from '../../models/register-model';
import { LegalConsent } from '../legal-consent/component';

export interface PublicProps {
  isSubmitting: boolean;
  onSubmit: (model: RegisterModel) => void;
}

type Props = PublicProps;
type State = RegisterModel;
type InputElementChangeBinder = (property: keyof RegisterModel) => React.ChangeEventHandler<HTMLInputElement>;

class RegisterFormComponent extends React.Component<Props, State> {
  public state: State = {
    email: '',
    password: '',
    username: '',
  };

  public render() {
    return (
      <form onSubmitCapture={this.handleSubmit} className="w-full">
        <fieldset disabled={this.props.isSubmitting} name="model">
          <div className="flex flex-col">
            <div className="mt-4">
              <label htmlFor="email" className="font-bold text-xs text-primary uppercase font-sans">
                Email Address
              </label>
              <Input onChange={this.handleInputChange('email')} placeholder="Email Address" id="email" name="email" />
            </div>
            <div className="mt-4">
              <label htmlFor="username" className="font-bold text-xs text-primary uppercase font-sans">
                Username
              </label>
              <Input
                onChange={this.handleInputChange('username')}
                placeholder="Username"
                id="username"
                name="username"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="font-bold text-xs text-primary uppercase font-sans">
                Password
              </label>
              <Input
                onChange={this.handleInputChange('password')}
                placeholder="Password"
                id="password"
                type="password"
                name="password"
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <LegalConsent />
            <Button className="ml-auto" block loading={this.props.isSubmitting}>
              Register
            </Button>
          </div>
        </fieldset>
      </form>
    );
  }

  private handleSubmit: React.FormEventHandler = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  private handleInputChange: InputElementChangeBinder = key => event => {
    this.setState({
      [key]: event.target.value,
    } as Pick<State, keyof RegisterModel>);
  };
}

export const RegisterForm: React.ComponentClass<PublicProps, State> = RegisterFormComponent;
