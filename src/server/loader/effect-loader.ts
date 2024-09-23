import { type LoaderFunctionArgs } from '@remix-run/server-runtime';
import { Effect, pipe } from 'effect';
import { captureErrors, prettyPrint } from 'effect-errors';

import { remixThrow } from './logic/remix-throw';

export const effectLoader =
  <A, E>(effect: (args: LoaderFunctionArgs) => Effect.Effect<A, E>) =>
  async (args: LoaderFunctionArgs) =>
    await Effect.runPromise(
      pipe(
        effect(args),
        Effect.map((data) => ({ _tag: 'success' as const, data })),
        Effect.sandbox,
        Effect.catchAll((cause) =>
          Effect.gen(function* () {
            // Serverside logging
            const errorsText = prettyPrint(cause, { stripCwd: false });
            console.error(errorsText);

            console.info('cwd', process.cwd());
            const errorData = yield* captureErrors(cause, {});

            return yield* Effect.succeed({
              _tag: 'error' as const,
              data: errorData,
            });
          }),
        ),
      ),
    ).then(remixThrow);
