import { useLoaderData } from '@remix-run/react';
import { Effect } from 'effect';

import { parallelTask } from '@examples';
import { ErrorBoundary as Boundary } from '@components/routes/error-boundary';
import { effectLoader } from '@server/loader/effect-loader';

export const loader = effectLoader(({ request }) =>
  Effect.withSpan('parallel-example-loader', {
    attributes: {
      url: request.url,
      method: request.method,
      body: request.body,
    },
  })(parallelTask),
);

export const ErrorBoundary = () => <Boundary />;

const ParallelExample = () => {
  const data = useLoaderData<typeof loader>();

  return <>{data}</>;
};
export default ParallelExample;
