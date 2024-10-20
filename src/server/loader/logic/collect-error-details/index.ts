import { FetchHttpClient } from '@effect/platform';
import { Effect, pipe } from 'effect';
import { captureErrors, prettyPrint } from 'effect-errors';
import type { Cause } from 'effect/Cause';
import { SourceMapConsumer } from 'source-map-js';

import { getMapFile } from '@server/remote-resources';

import { getSources } from './logic/get-sources';

export const collectErrorDetails = <E>(cause: Cause<E>) =>
  pipe(
    Effect.gen(function* () {
      const branch = process.env.VERCEL_GIT_COMMIT_REF ?? 'main';
      console.log('VERCEL_GIT_COMMIT_REF', process.env.VERCEL_GIT_COMMIT_REF);

      // Serverside logging
      const errorsText = prettyPrint(cause, { stripCwd: false });
      console.error(errorsText);

      const { errors, interrupted } = yield* captureErrors(cause, {});

      const mapFile = yield* getMapFile(branch);
      const consumer = new SourceMapConsumer(mapFile);

      const errorsWithSources = yield* Effect.forEach(
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

      return yield* Effect.succeed({
        _tag: 'error' as const,
        interrupted,
        errors: errorsWithSources,
      });
    }),
    Effect.scoped,
    Effect.provide(FetchHttpClient.layer),
    Effect.withSpan('collect-error-details'),
  );
