import { useLoaderData } from '@remix-run/react';
import { Effect } from 'effect';

import { plainObjectErrorTask } from '@examples';
import { ErrorBoundary as Boundary } from '@components/routes/error-boundary';
import { effectLoader } from '@server/loader/effect-loader';

export const loader = effectLoader(({ request }) =>
  Effect.withSpan('plain-object-example-loader', {
    attributes: {
      url: request.url,
      method: request.method,
      body: request.body,
    },
  })(plainObjectErrorTask),
);

export const ErrorBoundary = () => <Boundary />;

const PlainObjectExample = () => {
  const data = useLoaderData<typeof loader>();

  return <>{data}</>;
};
export default PlainObjectExample;
