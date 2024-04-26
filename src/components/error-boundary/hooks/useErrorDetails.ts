import {
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from '@remix-run/react';

interface ErrorsDetails {
  path: string;
  errors: {
    message: string;
  }[];
}

export const useErrorDetails = (): ErrorsDetails => {
  const error = useRouteError();
  const { pathname } = useLocation();
  const isRoute = isRouteErrorResponse(error);
  if (isRoute) {
    return {
      path: pathname,
      errors: [
        {
          message: `${pathname} - ${error.status} ${error.statusText}`,
        },
      ],
    };
  }

  if (error instanceof Error) {
    return { path: pathname, errors: [{ message: error.message }] };
  }

  return { path: pathname, errors: [{ message: 'Unknown Error' }] };
};
