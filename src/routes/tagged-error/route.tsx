import { useLoaderData } from '@remix-run/react';
import { Effect } from 'effect';

import { taggedErrorTask } from '@examples';
import { ErrorBoundary as Boundary } from '@components/routes/error-boundary';
import { effectLoader } from '@server/loader/effect-loader';

export const loader = effectLoader(({ request }) =>
  Effect.withSpan('tagged-error-example-loader', {
    attributes: {
      url: request.url,
      method: request.method,
      body: request.body,
    },
  })(taggedErrorTask),
);

export const ErrorBoundary = () => <Boundary />;

const TaggedError = () => {
  const data = useLoaderData<typeof loader>();

  return <>{data}</>;
};
export default TaggedError;
