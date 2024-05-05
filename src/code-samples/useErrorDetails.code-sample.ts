import {
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from '@remix-run/react';

export interface EffectError {
  type?: string;
  message: string;
  stack?: string;
  spans?: {
    name: string;
    attributes: Record<string, unknown>;
    duration: bigint | undefined;
  }[];
}

const isEffectError = (
  error: unknown,
): error is {
  data: {
    type: 'effect';
    errors: EffectError[];
  };
} => (error as { data?: { type?: 'effect' } })?.data?.type === 'effect';

export const useErrorDetails = () => {
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
