import { useLoaderData } from '@remix-run/react';
import { Effect } from 'effect';

import { parallelTask } from '../../examples';
import { effectLoader } from '../../server/effects/effect-loader';

//import { sourceCodeProps } from './source-code-props';

export const loader = effectLoader(
  ({ request }) =>
    Effect.withSpan('parallel-example-loader', {
      attributes: {
        url: request.url,
        method: request.method,
        body: request.body,
      },
    })(parallelTask),
  // ...sourceCodeProps,
);

const ParallelExample = () => {
  const data = useLoaderData();

  return <>{data}</>;
};
export default ParallelExample;
