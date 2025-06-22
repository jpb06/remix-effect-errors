import { useLoaderData, useNavigation } from '@remix-run/react';
import { Effect, pipe } from 'effect';

import { ErrorBoundary as Boundary } from '@components/routes/error-boundary';
import { parallelTask } from '@examples';
import { effectLoader } from '@server/loader/effect-loader';

export const loader = effectLoader(({ request }) =>
  pipe(
    Effect.all([Effect.sleep('200 millis'), parallelTask]),
    Effect.withSpan('parallel-example-loader', {
      attributes: {
        url: request.url,
        method: request.method,
        body: request.body,
      },
    }),
  ),
);

export const ErrorBoundary = () => <Boundary />;

const ParallelExample = () => {
  const data = useLoaderData<typeof loader>();
  const { state } = useNavigation();

  if (state === 'loading') {
    return <>Loading</>;
  }

  return <>{data}</>;
};

// biome-ignore lint/style/noDefaultExport: remix
export default ParallelExample;
