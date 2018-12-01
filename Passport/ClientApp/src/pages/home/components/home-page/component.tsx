import * as React from 'react';

import { Redirect, RouteComponentProps } from 'react-router';

type Props = RouteComponentProps;

class HomePageComponent extends React.Component<Props> {
  public render() {
    return <Redirect to="/signin" />;
  }
}

export const HomePage: React.ComponentClass<RouteComponentProps> = HomePageComponent;
