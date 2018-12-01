import * as React from 'react';

import { RouteComponentProps } from 'react-router';

type Props = RouteComponentProps;

class NotFoundPageComponent extends React.Component<Props> {
  public render() {
    return <div>We couldn't find what you are looking for!</div>;
  }
}

export const NotFoundPage: React.ComponentClass<RouteComponentProps> = NotFoundPageComponent;
