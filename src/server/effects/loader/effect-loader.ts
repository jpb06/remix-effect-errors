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
        Effect.map((data) => ({ _tag: 'success' as const, data })),
        Effect.sandbox,
        Effect.catchAll((cause) => {
          // Serverside logging
          const errorsText = prettyPrint(cause, { stripCwd: true });
          console.error(errorsText);

          // Getting errors data to display it client side
          const { errors } = captureErrors(cause, {
            reverseSpans: true,
            stripCwd: true,
          });

          // Computing spans duration ...
          const errorsWithSpanDuration = errors.map(
            ({ errorType, message, stack, effectStacktrace, spans }) => ({
              type: errorType,
              message,
              stack,
              effectStack: effectStacktrace,
              spans: getSpansDuration(spans),
            }),
          );

          return Effect.succeed({
            _tag: 'error' as const,
            data: errorsWithSpanDuration,
          });
        }),
      ),
    ).then(remixThrow);
