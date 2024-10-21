import { useLoaderData } from '@remix-run/react';
import { Effect, pipe } from 'effect';

import { ErrorBoundary as Boundary } from '@components/routes/error-boundary';
import { taggedErrorWithCtorTask } from '@examples';
import { effectLoader } from '@server/loader/effect-loader';

export const loader = effectLoader(({ request }) =>
  pipe(
    taggedErrorWithCtorTask,
    Effect.withSpan('tagged-error-with-ctor-loader', {
      attributes: {
        url: request.url,
        method: request.method,
        body: request.body,
      },
    }),
  ),
);

export const ErrorBoundary = () => <Boundary />;

const TaggedErrorWithCtorExample = () => {
  const data = useLoaderData<typeof loader>();

  return <>{JSON.stringify(data)}</>;
};

export default TaggedErrorWithCtorExample;
