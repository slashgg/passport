import { Button, Heading, HeadingColor, HeadingType, Input, Paragraph } from '@slashgg/diwali';
import * as classNames from 'classnames';
import * as React from 'react';

import { Brand, BrandSize } from 'passport/components/brand';
import { Link } from 'passport/components/link';
import { passport } from 'passport/core/passport';
import { PassportContext, PassportContextType } from 'passport/core/passport-context';

export interface State {
  isSubmitting: boolean;
}

class RegisterFormComponent extends React.Component<{}, State> {
  public static contextType = PassportContext;
  public context!: PassportContextType;
  public state: State = {
    isSubmitting: false,
  };

  private redirectTimeout: number;

  public componentDidMount() {
    if (this.context.user) {
      this.redirectTimeout = window.setTimeout(this.redirect, 5000);
    }
  }

  public componentWillUnmount() {
    if (this.redirectTimeout) {
      window.clearTimeout(this.redirectTimeout);
    }
  }

  public render() {
    const classes = classNames('flex flex-col shadow bg-white p-6 mt-8 rounded mx-2');
    return (
      <div className={classes}>
        <div className="pb-4">
          <Brand size={BrandSize.Small} />
        </div>
        <Heading color={HeadingColor.Alternative} type={HeadingType.Subtitle}>
          Register
        </Heading>
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 flex justify-center">
            <form onSubmit={this.handleSubmit} method="post" action="/v1/register" className="w-full">
              <fieldset disabled={this.state.isSubmitting}>
                <div className="flex flex-col">
                  <div className="mt-4">
                    <label htmlFor="email" className="font-bold text-xs text-primary uppercase font-sans">
                      Email Address
                    </label>
                    <Input placeholder="Email Address" id="email" name="email" />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="username" className="font-bold text-xs text-primary uppercase font-sans">
                      Username
                    </label>
                    <Input placeholder="Username" id="username" name="username" />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="password" className="font-bold text-xs text-primary uppercase font-sans">
                      Password
                    </label>
                    <Input placeholder="Password" id="password" type="password" name="password" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <Paragraph className="w-64">
                    By clicking Register, you indicate that you accept our <Link to="use-policy"> use</Link> and{' '}
                    <Link to="privacy-policy">privacy</Link> policies.
                  </Paragraph>
                  <Button className="ml-auto" block>
                    Register
                  </Button>
                  <Paragraph className="text-center">
                    Have an account? <Link to="/signin">Sign In</Link>
                  </Paragraph>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }

  private redirect = () => {
    passport.history.push('/login-complete');
  };

  private handleSubmit = () => {
    this.setState({
      isSubmitting: true,
    });
  };
}

export const RegisterForm: React.ComponentClass<{}, State> = RegisterFormComponent;
