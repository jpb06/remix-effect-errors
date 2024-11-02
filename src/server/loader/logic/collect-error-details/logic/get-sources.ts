import { Effect, pipe } from 'effect';
import type { ErrorLocation } from 'effect-errors';
import type { SourceMapConsumer } from 'source-map-js';

import { downloadFile } from '@server/remote-resources';

import { sourcesLocation } from './../constants/sources-location.constant';

export const getSources = (
  consumer: SourceMapConsumer,
  branch: string,
  location: Omit<ErrorLocation, '_tag'>[],
) =>
  pipe(
    Effect.forEach(
      location,
      (pos) =>
        Effect.gen(function* () {
          const { source, name, line, column } =
            consumer.originalPositionFor(pos);

          const filePath = source.substring(source.indexOf('src/'));
          const url = `${sourcesLocation}/${branch}/${filePath}`;

          const fileSources = yield* downloadFile(url);

          return {
            fileSources,
            filePath,
            name,
            line,
            column,
          };
        }),
      {
        concurrency: 'unbounded',
      },
    ),
    Effect.withSpan('get-sources'),
  );
