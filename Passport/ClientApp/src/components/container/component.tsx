import classNames from 'classnames';
import * as React from 'react';

export const Container: React.SFC = props => {
  const classes = classNames('mx-auto px-4 w-full lg:w-lg md:w-md sm:w-sm');
  return <div className={classes}>{props.children}</div>;
};
