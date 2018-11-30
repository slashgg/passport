import classNames from 'classnames';
import * as React from 'react';

export interface PublicProps extends React.HTMLProps<HTMLDivElement> {
  url: string;
}

export const Background: React.SFC<PublicProps> = props => {
  const { className, style, url, ...rest } = props;
  const classes = classNames('bg-color bg-center bg-no-repeat', className);
  return (
    <div className={classes} style={{ backgroundImage: `url(${url})`, ...style }} {...rest}>
      {props.children}
    </div>
  );
};
