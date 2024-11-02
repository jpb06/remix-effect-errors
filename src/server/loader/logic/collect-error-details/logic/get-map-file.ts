import { Effect, pipe } from 'effect';

import { Cache } from '@server/cache';
import { getMapFileFromR2 } from '@server/remote-resources';

export const getMapFile = (branch: string) =>
  pipe(
    Effect.gen(function* () {
      const mapFileFromCache = yield* Cache.get(branch);
      if (mapFileFromCache !== undefined) {
        return mapFileFromCache;
      }

      const mapFileFromR2 = yield* getMapFileFromR2(branch);
      yield* Cache.set(branch, mapFileFromR2);

      return mapFileFromR2;
    }),
    Effect.withSpan('get-map-file', { attributes: { branch } }),
  );
