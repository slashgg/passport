import { Paragraph } from '@slashgg/diwali';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Panel } from 'passport/components/panel';
import { Layout, LayoutType } from 'passport/features/layout';

import src from './passport-solid.svg';

type Props = RouteComponentProps;

class HomePageComponent extends React.Component<Props> {
  public render() {
    return (
      <Layout type={LayoutType.FullScreen}>
        <Panel>
          <div className="flex flex-col items-center m-4 mb-0">
            <img src={src} width="100%" />
            <Paragraph className="text-center pt-2">
              Typically, you don't need to browse to this address. Our systems will take you here when we need to
              confirm your identity.
            </Paragraph>
          </div>
        </Panel>
      </Layout>
    );
  }
}

export const HomePage: React.ComponentClass<RouteComponentProps> = HomePageComponent;
