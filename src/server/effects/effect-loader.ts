import { type LoaderFunctionArgs } from '@remix-run/server-runtime';
import { Effect, pipe } from 'effect';
import { captureErrors, prettyPrint } from 'effect-errors';

import { getSpansDuration } from './logic/get-spans-duration';
import { remixThrow } from './logic/remix-throw';

export const effectLoader =
  <A, E>(effect: (args: LoaderFunctionArgs) => Effect.Effect<A, E>) =>
  async (args: LoaderFunctionArgs) =>
    await Effect.runPromise(
      pipe(
        effect(args),
        Effect.map((data) => ({ _tag: 'success', data })),
        Effect.sandbox,
        Effect.catchAll((cause) => {
          const errorsText = prettyPrint(cause, { stripCwd: true });
          console.error(errorsText);
          const { errors } = captureErrors(cause, {
            reverseSpans: true,
            stripCwd: true,
          });

          const errorsWithSpanDuration = errors.map(
            ({ errorType, message, stack, spans }) => ({
              type: errorType,
              message,
              stack,
              spans: getSpansDuration(spans),
            }),
          );

          return Effect.succeed({
            _tag: 'error',
            data: errorsWithSpanDuration,
          });
        }),
      ),
    ).then(remixThrow<A>);
