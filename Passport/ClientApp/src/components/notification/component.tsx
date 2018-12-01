import { ButtonType, IconButton } from '@slashgg/diwali';
import classNames from 'classnames';
import * as React from 'react';
import posed from 'react-pose';

import { DefaultPostTransitionSpring } from 'passport/common/util/default-spring-transition';

export interface PublicProps {
  message: string;
  onClickClose: () => void;
}
type Ref = HTMLDivElement;

export const NotificationPresentation: React.RefForwardingComponent<Ref, PublicProps> = (props, ref) => {
  const classes = classNames(
    'bg-alternative-lighter text-alternative-dark px-2 pt-2 shadow-lg rounded-none sm:rounded-b'
  );
  return (
    <div className={classes} ref={ref}>
      <div className="flex items-center opacity-75 pl-2">
        <h3 className="text-alternative font-headings">Message</h3>
        {props.onClickClose && (
          <IconButton icon="times" type={ButtonType.Text} onClick={props.onClickClose} className="ml-auto" />
        )}
      </div>
      {props.message}
    </div>
  );
};

export const Notification = posed<PublicProps>(React.forwardRef(NotificationPresentation))({
  enter: {
    opacity: 1,
    transition: DefaultPostTransitionSpring,
    y: '0%',
  },
  exit: {
    opacity: 0,
    transition: DefaultPostTransitionSpring,
    y: '-100%',
  },
}) as React.ComponentType<PublicProps>;
