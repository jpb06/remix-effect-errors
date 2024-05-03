import { useLoaderData } from '@remix-run/react';
import { Effect } from 'effect';

import { Code } from '../../components/code/Code';
import { ErrorBoundary as Boundary } from '../../components/error-boundary/ErrorBoundary';
import { unknownErrorTask } from '../../examples';
import { effectLoader } from '../../server/effects/effect-loader';

import { exampleString } from './example-string';

export const loader = effectLoader(({ request }) =>
  Effect.withSpan('unknown-error-example-loader', {
    attributes: {
      url: request.url,
      method: request.method,
      body: request.body,
    },
  })(unknownErrorTask),
);

export const ErrorBoundary = () => (
  <>
    <Boundary />
    <Code
      title="Code sample raising this error"
      errorIndexes={[5]}
      code={exampleString}
      className="mb-3"
    />
  </>
);

const UnknownError = () => {
  const data = useLoaderData();

  return <>{data}</>;
};
export default UnknownError;
