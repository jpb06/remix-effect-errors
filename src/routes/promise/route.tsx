import { useLoaderData } from '@remix-run/react';
import { Effect } from 'effect';

import { ErrorBoundary as AppErrorBoundary } from '@components/routes/error-boundary';
import { fromPromiseTask } from '@examples';
import { effectLoader } from '@server/loader/effect-loader';

export const loader = effectLoader(({ request }) =>
  Effect.withSpan('promise-example-loader', {
    attributes: {
      url: request.url,
      method: request.method,
      body: request.body,
    },
  })(fromPromiseTask),
);

export const ErrorBoundary = () => <AppErrorBoundary />;

const PromiseExample = () => {
  const data = useLoaderData<typeof loader>();

  return <>{data}</>;
};
export default PromiseExample;
