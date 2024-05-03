import { useLoaderData } from '@remix-run/react';
import { Effect } from 'effect';

import { Code } from '../../components/code/Code';
import { parallelTask } from '../../examples';
import { effectLoader } from '../../server/effects/effect-loader';

import { ErrorBoundary as Boundary } from './../../components/error-boundary/ErrorBoundary';
import { exampleString } from './example-string';

export const loader = effectLoader(({ request }) =>
  Effect.withSpan('parallel-example-loader', {
    attributes: {
      url: request.url,
      method: request.method,
      body: request.body,
    },
  })(parallelTask),
);

export const ErrorBoundary = () => (
  <>
    <Boundary />
    <Code
      title="Code sample raising this error"
      errorIndexes={[15]}
      code={exampleString}
      className="mb-3"
    />
  </>
);

const ParallelExample = () => {
  const data = useLoaderData();

  return <>{data}</>;
};
export default ParallelExample;
