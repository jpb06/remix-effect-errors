import { useLoaderData } from '@remix-run/react';

import { ErrorBoundary as Boundary } from '@components/routes/error-boundary';

import { nodeExample } from '@examples';

export const loader = () => nodeExample();

export const ErrorBoundary = () => <Boundary />;

const NodeErrorExample = () => {
  const data = useLoaderData<typeof loader>();

  return <>{data}</>;
};
export default NodeErrorExample;
