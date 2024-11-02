import { Effect, pipe } from 'effect';
import type { ErrorData } from 'effect-errors';
import { SourceMapConsumer } from 'source-map-js';

import { getMapFile } from './get-map-file';
import { getSources } from './get-sources';

export const getErrorSourcesFromMapFile = (errors: ErrorData[]) =>
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
