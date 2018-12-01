import { ButtonType, IconButton, Paragraph } from '@slashgg/diwali';
import classNames from 'classnames';
import * as React from 'react';
import posed from 'react-pose';

import { FieldError, OperationError } from '../../models/operation-error';

export interface PublicProps {
  error: OperationError;
  onClickClose?: () => void;
}

type Ref = HTMLDivElement;

function renderFieldError(error: FieldError): JSX.Element {
  const messages = error.Messages.map((message, idx) => <p key={idx}>{message}</p>);
  return (
    <li key={error.Key} className="text-danger font-sans pl-4">
      {messages}
    </li>
  );
}

const ErrorPresentation: React.RefForwardingComponent<Ref, PublicProps> = (props, ref) => {
  const classes = classNames('bg-danger-lighter text-danger-dark px-2 pt-2 shadow-lg rounded-none sm:rounded-b');
  const fieldErrors = props.error.Fields.map(renderFieldError);
  return (
    <div className={classes} ref={ref}>
      <div className="flex items-center opacity-75 pl-2">
        <h3 className="text-danger font-headings">Error</h3>
        {props.onClickClose && (
          <IconButton icon="times" type={ButtonType.AlertText} onClick={props.onClickClose} className="ml-auto" />
        )}
      </div>
      {fieldErrors.length > 0 && <ul className="pb-4 pt-2 list-reset">{fieldErrors}</ul>}
      {fieldErrors.length === 0 && <Paragraph className="text-danger">{props.error.Message}</Paragraph>}
    </div>
  );
};

export const Error = posed<PublicProps>(React.forwardRef(ErrorPresentation))({
  enter: {
    opacity: 1,
    transition: {
      damping: 25,
      duration: 10,
      stiffness: 500,
      type: 'spring',
    },
    y: '0%',
  },
  exit: {
    opacity: 0,
    transition: {
      damping: 25,
      duration: 10,
      stiffness: 500,
      type: 'spring',
    },
    y: '-100%',
  },
}) as React.ComponentType<PublicProps>;
