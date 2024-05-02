import { useLoaderData } from '@remix-run/react';
import { Effect } from 'effect';

import { Code } from '../../components/code/Code';
import { plainObjectErrorTask } from '../../examples';
import { effectLoader } from '../../server/effects/effect-loader';

import { ErrorBoundary as Boundary } from './../../components/error-boundary/ErrorBoundary';
import { exampleString } from './example-string';

export const loader = effectLoader(({ request }) =>
  Effect.withSpan('plain-object-example-loader', {
    attributes: {
      url: request.url,
      method: request.method,
      body: request.body,
    },
  })(plainObjectErrorTask),
);

export const ErrorBoundary = () => (
  <>
    <Boundary />
    <Code errorIndexes={[4]} code={exampleString} className="mb-3" />
  </>
);

const PlainObjectExample = () => {
  const data = useLoaderData();

  return <>{data}</>;
};
export default PlainObjectExample;
