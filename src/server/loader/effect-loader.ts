import type { LoaderFunctionArgs } from '@remix-run/server-runtime';
import { Effect, pipe } from 'effect';

import { collectErrorDetails } from './logic/collect-error-details/collect-error-details';
import { remixThrow } from './logic/remix-throw';

export const effectLoader =
  <A, E>(effect: (args: LoaderFunctionArgs) => Effect.Effect<A, E>) =>
  async (args: LoaderFunctionArgs) =>
    await Effect.runPromise(
      pipe(
        effect(args),
        Effect.map((data) => ({ _tag: 'success' as const, data })),
        Effect.sandbox,
        Effect.catchAll(collectErrorDetails),
      ),
    ).then(remixThrow);
