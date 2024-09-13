import { useLoaderData } from '@remix-run/react';
import { Effect } from 'effect';

import { unknownErrorTask } from '@examples';
import { ErrorBoundary as Boundary } from '@components/routes/error-boundary';
import { effectLoader } from '@server/loader/effect-loader';

export const loader = effectLoader(({ request }) =>
  Effect.withSpan('unknown-error-example-loader', {
    attributes: {
      url: request.url,
      method: request.method,
      body: request.body,
    },
  })(unknownErrorTask),
);

export const ErrorBoundary = () => <Boundary />;

const UnknownError = () => {
  const data = useLoaderData<typeof loader>();

  return <>{data}</>;
};
export default UnknownError;
