import * as querystring from 'query-string';
import * as React from 'react';

import { PassportContext, PassportContextType } from 'passport/core/passport-context';
import { OperationError } from 'passport/features/error';

export interface WithDataOptions {
  path: string;
  method?: string;
}

interface DataState {
  isSubmitting: boolean;
}

export interface WithDataProps extends DataState {
  invoke: (body?: object) => Promise<object | boolean>;
}

export type WithDataOptionsMapper<P> = (props: P) => WithDataOptions;

export function withData<P>(
  WrappedComponent: React.ComponentClass<WithDataProps>,
  mapper: WithDataOptionsMapper<P>
): React.ComponentClass<P> {
  type Props = P;
  type State = WithDataOptions & DataState;

  return class WithDataComponent extends React.Component<Props, State> {
    public static contextType = PassportContext;
    public context!: PassportContextType;
    public state: State;

    private isUnmounted = false;

    constructor(props: P) {
      super(props);
      this.state = {
        isSubmitting: false,
        ...mapper(props),
      };
    }

    public componentWillUnmount() {
      this.isUnmounted = true;
    }

    public render() {
      return <WrappedComponent invoke={this.invoke} {...this.props} isSubmitting={this.state.isSubmitting} />;
    }

    private invoke: (data?: object) => Promise<object | boolean> = body => {
      this.context.clear('error');

      let path = this.state.path;
      const init: RequestInit = {
        method: this.state.method,
      };

      if (body) {
        if (init.method !== 'get') {
          init.headers = { 'Content-Type': 'application/json' };
          init.body = JSON.stringify(body);
        } else {
          path += '?' + querystring.stringify(body);
        }
      }

      this.setState({
        isSubmitting: true,
      });

      return window
        .fetch(path, init)
        .then(response => {
          return new Promise(async (resolve, reject) => {
            if (!this.isUnmounted) {
              this.setState({
                isSubmitting: false,
              });
            }

            if (response.ok) {
              resolve(response.bodyUsed ? response.json() : true);
            } else {
              reject(await response.json());
            }
          });
        })
        .catch((err: OperationError) => {
          this.context.alert(err);
          return false;
        });
    };
  };
}
