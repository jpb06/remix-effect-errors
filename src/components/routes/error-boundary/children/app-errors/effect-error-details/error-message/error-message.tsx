import { FunctionComponent } from 'react';

import { ErrorNumber } from './error-number';
import { ErrorData } from 'effect-errors';
import { isObject } from 'effect/Predicate';
import { errorMessageStyles } from './error-message.styles';

type ErrorMessageProps = {
  number: number;
  error: ErrorData;
  hasSeveralErrors: boolean;
};

export const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({
  number,
  error,
  hasSeveralErrors,
}) => {
  const css = errorMessageStyles();

  return (
    <>
      <ErrorNumber hasSeveralErrors={hasSeveralErrors} number={number} />{' '}
      <span className={css.type}>{error.errorType as string}</span> •{' '}
      <span className={css.message}>
        {isObject(error.message)
          ? JSON.stringify(error.message, null, 2)
          : (error.message as string)}
      </span>
    </>
  );
};
