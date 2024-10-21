import {
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from '@remix-run/react';

import type { EffectErrorWithSources } from '@types';

import { isEffectError } from './logic/is-effect-error.logic';

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
      errors: EffectErrorWithSources[];
    };

export const useErrorDetails = (): ErrorsDetails => {
  const { pathname } = useLocation();
  const error = useRouteError();

  if (isEffectError(error)) {
    return {
      _tag: 'effect' as const,
      path: pathname,
      errors: error.data.errors,
    };
  }

  const isRoute = isRouteErrorResponse(error);
  if (isRoute) {
    return {
      _tag: 'route' as const,
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
      _tag: 'error' as const,
      path: pathname,
      errors: [error],
    };
  }

  return {
    _tag: 'unknown' as const,
    path: pathname,
    errors: [{ message: 'Unknown Error' }],
  };
};
