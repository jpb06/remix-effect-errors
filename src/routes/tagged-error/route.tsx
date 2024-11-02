import { useLoaderData } from '@remix-run/react';
import { Effect, pipe } from 'effect';

import { ErrorBoundary as Boundary } from '@components/routes/error-boundary';
import { taggedErrorTask } from '@examples';
import { effectLoader } from '@server/loader/effect-loader';

export const loader = effectLoader(({ request }) =>
  pipe(
    Effect.all([Effect.sleep('18 millis'), taggedErrorTask]),
    Effect.withSpan('tagged-error-example-loader', {
      attributes: {
        url: request.url,
        method: request.method,
        body: request.body,
      },
    }),
  ),
);

export const ErrorBoundary = () => <Boundary />;

const TaggedError = () => {
  const data = useLoaderData<typeof loader>();

  return <>{data}</>;
};

export default TaggedError;
