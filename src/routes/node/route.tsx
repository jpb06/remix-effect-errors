import { useLoaderData } from '@remix-run/react';

import { Code } from '../../components/code/Code';

import { ErrorBoundary as Boundary } from './../../components/error-boundary/ErrorBoundary';
import { nodeExample } from './../../examples';
import { exampleString } from './example-string';

export const loader = () => nodeExample();

export const ErrorBoundary = () => (
  <>
    <Boundary />
    <Code
      title="Code sample raising this error"
      errorIndexes={[2]}
      code={exampleString}
      className="mb-3"
    />
  </>
);

const NodeErrorExample = () => {
  const data = useLoaderData<typeof loader>();

  return <>{data}</>;
};
export default NodeErrorExample;
