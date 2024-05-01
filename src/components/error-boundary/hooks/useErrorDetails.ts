import {
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from '@remix-run/react';

import { isEffectError, EffectError } from '../logic/is-effect-error.logic';

export type ErrorsDetails =
  | {
      _tag: 'route' | 'error' | 'unknown';
      path: string;
      errors: {
        message: string;
      }[];
    }
  | {
      _tag: 'effect';
      path: string;
      sourceCode?: string;
      errorLines?: number[];
      errors: EffectError[];
    };

export const useErrorDetails = (): ErrorsDetails => {
  const { pathname } = useLocation();
  const error = useRouteError();

  if (isEffectError(error)) {
    return {
      _tag: 'effect',
      path: pathname,
      sourceCode: error.data?.sourceCode,
      errorLines: error.data?.errorLines,
      errors: error.data.errors,
    };
  }

  const isRoute = isRouteErrorResponse(error);
  if (isRoute) {
    return {
      _tag: 'route',
      path: pathname,
      errors: [
        {
          message: `${error.statusText}`,
        },
      ],
    };
  }

  if (error instanceof Error) {
    return {
      _tag: 'error',
      path: pathname,
      errors: [error],
    };
  }

  return {
    _tag: 'unknown',
    path: pathname,
    errors: [{ message: 'Unknown Error' }],
  };
};
