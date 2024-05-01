import { useLoaderData } from '@remix-run/react';
import { Effect } from 'effect';

import { ErrorBoundary as Boundary } from '../../components/error-boundary/ErrorBoundary';
import { taggedErrorWithCtorTask } from '../../examples';
import { effectLoader } from '../../server/effects/effect-loader';

//import { sourceCodeProps } from './source-code-props';

export const loader = effectLoader(
  ({ request }) =>
    Effect.withSpan('tagged-error-with-ctor-loader', {
      attributes: {
        url: request.url,
        method: request.method,
        body: request.body,
      },
    })(taggedErrorWithCtorTask),
  // ...sourceCodeProps,
);

export const ErrorBoundary = () => <Boundary />;

const TaggedErrorWithCtorExample = () => {
  const data = useLoaderData();

  return <>{data}</>;
};
export default TaggedErrorWithCtorExample;
