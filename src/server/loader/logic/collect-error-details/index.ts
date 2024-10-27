import { FetchHttpClient } from '@effect/platform';
import { Effect, pipe } from 'effect';
import { type ErrorData, captureErrors, prettyPrint } from 'effect-errors';
import type { Cause } from 'effect/Cause';
import { SourceMapConsumer } from 'source-map-js';

import { getMapFile } from '@server/remote-resources';

import { getSources } from './logic/get-sources';

const getErrorSourcesFromMapFile = (errors: ErrorData[]) =>
  pipe(
    Effect.gen(function* () {
      const branch = process.env.VERCEL_GIT_COMMIT_REF ?? 'main';

      const mapFile = yield* getMapFile(branch);
      const consumer = new SourceMapConsumer(mapFile);

      return yield* Effect.forEach(
        errors,
        ({ location, sources, ...errorData }) =>
          Effect.gen(function* () {
            if (location === undefined) {
              return { ...errorData, sources: [] };
            }

            const sources = yield* getSources(consumer, branch, location);

            return { sources, ...errorData };
          }),
        { concurrency: 'unbounded' },
      );
    }),
    Effect.withSpan('get-error-sources-from-map-file'),
  );

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
    Effect.provide(FetchHttpClient.layer),
    Effect.withSpan('collect-error-details'),
  );
