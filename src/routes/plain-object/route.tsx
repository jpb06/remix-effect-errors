import { useLoaderData } from '@remix-run/react';
import { Effect } from 'effect';

import { plainObjectErrorTask } from '../../examples';
import { effectLoader } from '../../server/effects/effect-loader';

import { ErrorBoundary as Boundary } from './../../components/error-boundary/ErrorBoundary';
//import { sourceCodeProps } from './source-code-props';

export const loader = effectLoader(
  ({ request }) =>
    Effect.withSpan('plain-object-example-loader', {
      attributes: {
        url: request.url,
        method: request.method,
        body: request.body,
      },
    })(plainObjectErrorTask),
  //...sourceCodeProps,
);

export const ErrorBoundary = () => <Boundary />;

const PlainObjectExample = () => {
  const data = useLoaderData();

  return <>{data}</>;
};
export default PlainObjectExample;
