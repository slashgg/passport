import * as React from 'react';

import { Redirect, RouterProps } from 'react-router';

type Props = RouterProps;

class HomePageComponent extends React.Component<Props> {
  public render() {
    return <Redirect to="/signin" />;
  }
}

export const HomePage: React.ComponentClass<RouterProps> = HomePageComponent;
