import classNames from 'classnames';
import * as React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

export interface PublicProps {
  to: string;
}

export const Link: React.SFC<PublicProps> = props => {
  const classes = classNames('text-primary hover:text-primary-light font-bold transition');
  return (
    <ReactRouterLink to={props.to} className={classes}>
      {props.children}
    </ReactRouterLink>
  );
};
