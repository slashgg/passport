import * as React from 'react';

import { RouterProps } from 'react-router';

type Props = RouterProps;

class NotFoundPageComponent extends React.Component<Props> {
  public render() {
    return <div>We couldn't find what you are looking for!</div>;
  }
}

export const NotFoundPage: React.ComponentClass<RouterProps> = NotFoundPageComponent;
