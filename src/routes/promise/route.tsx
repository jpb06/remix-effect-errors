import { useLoaderData } from '@remix-run/react';
import { Effect } from 'effect';

import { fromPromiseTask } from '../../examples';
import { effectLoader } from '../../server/effects/effect-loader';

import { ErrorBoundary as Boundary } from './../../components/error-boundary/ErrorBoundary';
import { sourceCodeProps } from './source-code-props';

export const loader = effectLoader(
  ({ request }) =>
    Effect.withSpan('promise-example-loader', {
      attributes: {
        url: request.url,
        method: request.method,
        body: request.body,
      },
    })(fromPromiseTask),
  ...sourceCodeProps,
);

export const ErrorBoundary = () => <Boundary />;

const PromiseExample = () => {
  const data = useLoaderData();

  return <>{data}</>;
};
export default PromiseExample;
