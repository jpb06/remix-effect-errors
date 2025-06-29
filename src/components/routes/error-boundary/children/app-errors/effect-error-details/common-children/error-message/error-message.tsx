import { isObject } from 'effect/Predicate';
import type { ErrorData } from 'effect-errors';
import type { FunctionComponent } from 'react';

import type { EffectErrorWithSources } from '@types';

import { errorMessageStyles } from './error-message.styles';
import { ErrorNumber } from './error-number';

type ErrorMessageProps = {
  number: number;
  error: EffectErrorWithSources | ErrorData;
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
