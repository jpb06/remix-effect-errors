import { useLoaderData } from '@remix-run/react';

import { ErrorBoundary as Boundary } from './../../components/error-boundary/ErrorBoundary';
import { nodeExample } from './../../examples';

export const loader = () => nodeExample();

export const ErrorBoundary = () => <Boundary />;

const NodeErrorExample = () => {
  const data = useLoaderData();

  return <>{data}</>;
};
export default NodeErrorExample;
