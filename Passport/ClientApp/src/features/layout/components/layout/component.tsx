import classNames from 'classnames';
import * as React from 'react';

import { Background } from 'passport/components/background';

import bg from './esports-bg.jpg';

export enum LayoutType {
  Default = '',
  FullScreen = 'flex-col items-center justify-center',
}

export interface PublicProps {
  type?: LayoutType;
}

type Props = PublicProps;

class LayoutComponent extends React.Component<Props> {
  public static defaultProps: PublicProps = {
    type: LayoutType.Default,
  };

  public render() {
    const classes = classNames('bg-primary-white min-h-screen flex pt-10 md:pt-0', this.props.type);
    return (
      <Background url={bg} className={classes}>
        {this.props.children}
      </Background>
    );
  }
}

export const Layout: React.ComponentClass<PublicProps> = LayoutComponent;
