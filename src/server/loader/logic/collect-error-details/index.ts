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
      // Serverside logging
      const errorsText = prettyPrint(cause, { stripCwd: false });
      console.error(errorsText);

      const { errors, interrupted } = yield* captureErrors(cause, {});

      const mapFile = yield* getMapFile;
      const consumer = new SourceMapConsumer(mapFile);

      console.log('VERCEL_BRANCH_URL', process.env.VERCEL_BRANCH_URL);
      const branch = process.env.VERCEL_BRANCH_URL ?? 'main';
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
