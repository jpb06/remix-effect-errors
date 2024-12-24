import { FetchHttpClient } from '@effect/platform';
import { NodeFileSystem } from '@effect/platform-node';
import { Effect, Layer, pipe } from 'effect';
import { captureErrors, prettyPrintFromCapturedErrors } from 'effect-errors';
import type { Cause } from 'effect/Cause';

import { getErrorSourcesFromMapFile } from './logic/get-error-sources-from-map-file';

export const collectErrorDetails = <E>(cause: Cause<E>) =>
  pipe(
    Effect.gen(function* () {
      const captured = yield* captureErrors(cause, {});

      // Serverside logging
      const errorsText = prettyPrintFromCapturedErrors(captured, {
        stripCwd: true,
        hideStackTrace: true,
        reverseSpans: true,
      });
      console.error(errorsText);

      if (captured.errors.every((e) => e.location !== undefined)) {
        const errorsWithSources = yield* getErrorSourcesFromMapFile(
          captured.errors,
        );

        return yield* Effect.succeed({
          _tag: 'effect-post-mapped-errors' as const,
          errors: errorsWithSources,
        });
      }

      return yield* Effect.succeed({
        _tag: 'effect-natively-mapped-errors' as const,
        errors: captured.errors,
      });
    }),
    Effect.scoped,
    Effect.provide(Layer.mergeAll(FetchHttpClient.layer, NodeFileSystem.layer)),
    Effect.withSpan('collect-error-details'),
  );
