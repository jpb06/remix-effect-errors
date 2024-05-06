import { useLoaderData } from '@remix-run/react';
import { Effect } from 'effect';

import { Code } from '../../components/code/Code';
import { ErrorBoundary as Boundary } from '../../components/error-boundary/ErrorBoundary';
import { taggedErrorWithCtorTask } from '../../examples';
import { effectLoader } from '../../server/effects/loader/effect-loader';

import { exampleString } from './example-string';

export const loader = effectLoader(({ request }) =>
  Effect.withSpan('tagged-error-with-ctor-loader', {
    attributes: {
      url: request.url,
      method: request.method,
      body: request.body,
    },
  })(taggedErrorWithCtorTask),
);

export const ErrorBoundary = () => (
  <>
    <Boundary />
    <Code
      title="Code sample raising this error"
      errorIndexes={[19]}
      code={exampleString}
      className="mb-3"
    />
  </>
);

const TaggedErrorWithCtorExample = () => {
  const data = useLoaderData<typeof loader>();

  return <>{data}</>;
};
export default TaggedErrorWithCtorExample;
