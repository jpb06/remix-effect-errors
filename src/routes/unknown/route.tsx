import { useLoaderData } from '@remix-run/react';
import { Effect, pipe } from 'effect';

import { ErrorBoundary as Boundary } from '@components/routes/error-boundary';
import { unknownErrorTask } from '@examples';
import { effectLoader } from '@server/loader/effect-loader';

export const loader = effectLoader(({ request }) =>
  pipe(
    Effect.all([Effect.sleep('21 millis'), unknownErrorTask]),
    Effect.withSpan('unknown-error-example-loader', {
      attributes: {
        url: request.url,
        method: request.method,
        body: request.body,
      },
    }),
  ),
);

export const ErrorBoundary = () => <Boundary />;

const UnknownError = () => {
  const data = useLoaderData<typeof loader>();

  return <>{data}</>;
};

// biome-ignore lint/style/noDefaultExport: remix
export default UnknownError;
