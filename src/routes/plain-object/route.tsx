import { useLoaderData } from '@remix-run/react';
import { Effect, pipe } from 'effect';

import { ErrorBoundary as Boundary } from '@components/routes/error-boundary';
import { plainObjectErrorTask } from '@examples';
import { effectLoader } from '@server/loader/effect-loader';

export const loader = effectLoader(({ request }) =>
  pipe(
    plainObjectErrorTask,
    Effect.withSpan('plain-object-example-loader', {
      attributes: {
        url: request.url,
        method: request.method,
        body: request.body,
      },
    }),
  ),
);

export const ErrorBoundary = () => <Boundary />;

const PlainObjectExample = () => {
  const data = useLoaderData<typeof loader>();

  return <>{data}</>;
};

// biome-ignore lint/style/noDefaultExport: <explanation>
export default PlainObjectExample;
