import { BaseInteractive } from '@slashgg/diwali';
import classNames from 'classnames';
import * as React from 'react';

export enum BrandSize {
  Tiny = 'w-2 md:w-4',
  Small = 'w-4 md:w-8',
  Medium = 'w-6 md:w-10',
  Large = 'w-10 md:w-20',
  Huge = 'w-28 md:w-32',
}

export interface PublicProps {
  size: BrandSize;
}

export const Brand: React.SFC<PublicProps> = props => {
  const classes = classNames('font-black font-headings text-primary', {
    'text-2xl md:text-2xl ml-1': props.size === BrandSize.Tiny,
    'text-3xl md:text-4xl ml-2': props.size === BrandSize.Small,
    'text-4xl md:text-5xl ml-3': props.size === BrandSize.Medium,
    'text-5xl md:text-6xl ml-4': props.size === BrandSize.Large,
    'text-6xl md:text-7xl ml-4': props.size === BrandSize.Huge,
  });

  return (
    <BaseInteractive linkTo="https://slash.gg">
      <div className="flex items-center justify-center">
        <img src={require('./logo.png')} alt="slashgg" className={props.size} />
        <h1 className={classes} style={{ letterSpacing: -2 }}>
          slashgg
        </h1>
      </div>
    </BaseInteractive>
  );
};
