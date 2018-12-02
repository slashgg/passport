import classNames from 'classnames';
import * as React from 'react';

export interface PublicProps {
  to: string;
}

export const ExternalLink: React.SFC<PublicProps> = props => {
  const classes = classNames('font-bold text-alternative-light hover:text-alternative transition');
  return (
    <a href={props.to} target="_blank" className={classes}>
      {props.children}
    </a>
  );
};
