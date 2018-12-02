import classNames from 'classnames';
import * as React from 'react';

export interface PublicProps extends React.HTMLProps<HTMLLabelElement> {}
type Ref = HTMLLabelElement;

const LabelComponent: React.RefForwardingComponent<Ref, PublicProps> = (props, ref) => {
  const classes = classNames('font-bold text-xs text-primary uppercase font-sans', props.className);
  return (
    <label className={classes} ref={ref}>
      {props.children}
    </label>
  );
};

export const Label: React.ComponentType<PublicProps> = React.forwardRef(LabelComponent);
