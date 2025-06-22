import type { HttpClient } from '@effect/platform/HttpClient';
import type { HttpClientError } from '@effect/platform/HttpClientError';
import { Effect, pipe } from 'effect';
import type { ConfigError } from 'effect/ConfigError';
import type { Scope } from 'effect/Scope';
import type { FileStorageError } from 'effect-cloudflare-r2-layer';
import type { ErrorData } from 'effect-errors';
import { SourceMapConsumer } from 'source-map-js';

import type { CacheError } from '@server/cache';
import type { EffectErrorWithSources } from '@types';

import { getMapFile } from './get-map-file';
import { getSources } from './get-sources';

export type ErrorsWithSources = {
  _tag: 'with-sources';
  errors: EffectErrorWithSources[];
};
export type ErrorsWithNoSourceDueToNoMapFile = {
  _tag: 'no-map-file';
  errors: ErrorData[];
};

export type GetErrorSourcesFromMapFileResult =
  | ErrorsWithSources
  | ErrorsWithNoSourceDueToNoMapFile;

export const getErrorSourcesFromMapFile = (
  errors: ErrorData[],
): Effect.Effect<
  GetErrorSourcesFromMapFileResult,
  CacheError | FileStorageError | ConfigError | HttpClientError,
  HttpClient | Scope
> =>
  pipe(
    Effect.gen(function* () {
      const branch = process.env.VERCEL_GIT_COMMIT_REF ?? 'main';

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

      return {
        _tag: 'with-sources' as const,
        errors: errorsWithSources,
      };
    }),
    Effect.catchTag('no-map-file-error', () =>
      Effect.succeed({ _tag: 'no-map-file' as const, errors }),
    ),
    Effect.withSpan('get-error-sources-from-map-file'),
  );
