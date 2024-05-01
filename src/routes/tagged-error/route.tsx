import { useLoaderData } from '@remix-run/react';
import { Effect } from 'effect';

import { ErrorBoundary as Boundary } from '../../components/error-boundary/ErrorBoundary';
import { taggedErrorTask } from '../../examples';
import { effectLoader } from '../../server/effects/effect-loader';

import { sourceCodeProps } from './source-code-props';

export const loader = effectLoader(
  ({ request }) =>
    Effect.withSpan('tagged-error-example-loader', {
      attributes: {
        url: request.url,
        method: request.method,
        body: request.body,
      },
    })(taggedErrorTask),
  ...sourceCodeProps,
);

export const ErrorBoundary = () => <Boundary />;

const TaggedError = () => {
  const data = useLoaderData();

  return <>{data}</>;
};
export default TaggedError;
