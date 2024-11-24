import { FetchHttpClient } from '@effect/platform';
import { NodeFileSystem } from '@effect/platform-node';
import { Effect, Layer, pipe } from 'effect';
import { captureErrors, prettyPrint } from 'effect-errors';
import type { Cause } from 'effect/Cause';

import { getErrorSourcesFromMapFile } from './logic/get-error-sources-from-map-file';

export const collectErrorDetails = <E>(cause: Cause<E>) =>
  pipe(
    Effect.gen(function* () {
      // Serverside logging
      const errorsText = prettyPrint(cause, { stripCwd: false });
      console.error(errorsText);

      const { errors } = yield* captureErrors(cause, {});

      if (errors.every((e) => e.location !== undefined)) {
        const errorsWithSources = yield* getErrorSourcesFromMapFile(errors);

        return yield* Effect.succeed({
          _tag: 'effect-post-mapped-errors' as const,
          errors: errorsWithSources,
        });
      }

      return yield* Effect.succeed({
        _tag: 'effect-natively-mapped-errors' as const,
        errors,
      });
    }),
    Effect.scoped,
    Effect.provide(Layer.mergeAll(FetchHttpClient.layer, NodeFileSystem.layer)),
    Effect.withSpan('collect-error-details'),
  );
