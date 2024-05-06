import { useLoaderData } from '@remix-run/react';
import { Effect } from 'effect';

import { Code } from '../../components/code/Code';
import { fromPromiseTask } from '../../examples';
import { effectLoader } from '../../server/effects/loader/effect-loader';

import { ErrorBoundary as Boundary } from './../../components/error-boundary/ErrorBoundary';
import { exampleString } from './example-string';

export const loader = effectLoader(({ request }) =>
  Effect.withSpan('promise-example-loader', {
    attributes: {
      url: request.url,
      method: request.method,
      body: request.body,
    },
  })(fromPromiseTask),
);

export const ErrorBoundary = () => (
  <>
    <Boundary />
    <Code
      title="Code sample raising this error"
      code={exampleString}
      errorIndexes={[33, 34, 35]}
      className="mb-3"
    />
  </>
);

const PromiseExample = () => {
  const data = useLoaderData<typeof loader>();

  return <>{data}</>;
};
export default PromiseExample;
