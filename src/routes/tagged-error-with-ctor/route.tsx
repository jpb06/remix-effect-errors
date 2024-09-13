import { useLoaderData } from '@remix-run/react';
import { Effect } from 'effect';

import { taggedErrorWithCtorTask } from '@examples';
import { ErrorBoundary as Boundary } from '@components/routes/error-boundary';
import { effectLoader } from '@server/loader/effect-loader';

export const loader = effectLoader(({ request }) =>
  Effect.withSpan('tagged-error-with-ctor-loader', {
    attributes: {
      url: request.url,
      method: request.method,
      body: request.body,
    },
  })(taggedErrorWithCtorTask),
);

export const ErrorBoundary = () => <Boundary />;

const TaggedErrorWithCtorExample = () => {
  const data = useLoaderData<typeof loader>();

  return <>{data}</>;
};
export default TaggedErrorWithCtorExample;
