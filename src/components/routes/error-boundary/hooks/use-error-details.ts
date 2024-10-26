import {
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from '@remix-run/react';

import type {
  EffectNativelyMappedErrors,
  EffectPostMappedErrors,
} from '@server/loader/types/effect-loader.types';

import { isUnknownAnEffectError } from './logic/is-uknown-an-effect-error.logic';
import { mapEffectErrorTypes } from './logic/map-effect-error-types';

export type EffectPostMappedErrorsWithPath = EffectPostMappedErrors & {
  path: string;
};
export type EffectNativelyMappedErrorsWithPath = EffectNativelyMappedErrors & {
  path: string;
};

export type ErrorsDetails =
  | {
      _tag: 'route' | 'error' | 'unknown';
      path: string;
      errors: {
        message: string;
      }[];
    }
  | EffectPostMappedErrorsWithPath
  | EffectNativelyMappedErrorsWithPath;

export const useErrorDetails = (): ErrorsDetails => {
  const { pathname } = useLocation();
  const error = useRouteError();

  if (isUnknownAnEffectError(error)) {
    return mapEffectErrorTypes(error, pathname);
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
