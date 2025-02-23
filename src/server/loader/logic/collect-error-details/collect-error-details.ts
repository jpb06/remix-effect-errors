import { FetchHttpClient } from '@effect/platform';
import { NodeFileSystem } from '@effect/platform-node';
import { Effect, Layer, Match, pipe } from 'effect';
import { captureErrors, prettyPrint } from 'effect-errors';
import type { Cause } from 'effect/Cause';

import {
  type ErrorsWithNoSourceDueToNoMapFile,
  type ErrorsWithSources,
  getErrorSourcesFromMapFile,
} from './logic/get-error-sources-from-map-file';

export const collectErrorDetails = <E>(cause: Cause<E>) =>
  pipe(
    Effect.gen(function* () {
      // Serverside logging
      const errorsText = prettyPrint(cause, { stripCwd: false });
      console.error(errorsText);

      const { errors } = yield* captureErrors(cause, {});

      if (errors.every((e) => e.location !== undefined)) {
        const errorsWithMaybeSources =
          yield* getErrorSourcesFromMapFile(errors);
        return yield* Match.value(errorsWithMaybeSources).pipe(
          Match.when(
            (p): p is ErrorsWithSources => p._tag === 'with-sources',
            ({ errors }) =>
              Effect.succeed({
                _tag: 'effect-post-mapped-errors' as const,
                errors,
              }),
          ),
          Match.when(
            (p): p is ErrorsWithNoSourceDueToNoMapFile =>
              p._tag === 'no-map-file',
            ({ errors }) =>
              Effect.succeed({
                _tag: 'effect-no-map-file' as const,
                errors,
              }),
          ),
          Match.orElseAbsurd,
        );
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
