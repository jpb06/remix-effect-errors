import { Cacheable } from 'cacheable';
import { Effect, pipe } from 'effect';

import type { MapFile } from '@server/remote-resources';

import { CacheError } from './cache.error';

const cacheable = new Cacheable();
const mapFileCacheKey = 'map-file';

export const get = (branch: string) =>
  pipe(
    Effect.tryPromise({
      try: () => cacheable.get<MapFile>(`${mapFileCacheKey}_${branch}`),
      catch: (e) => new CacheError({ cause: e }),
    }),
    Effect.map((data) => {
      if (data === undefined) {
        console.info(`❎ Cache miss for branch '${branch}'`);
      } else {
        console.info(`✅ Cache hit for branch '${branch}'`);
      }

      return data;
    }),
    Effect.withSpan('cache-get', { attributes: { branch } }),
  );

export const set = (branch: string, file: MapFile) =>
  pipe(
    Effect.tryPromise({
      try: () => cacheable.set(`${mapFileCacheKey}_${branch}`, file),
      catch: (e) => new CacheError({ cause: e }),
    }),
    Effect.withSpan('cache-set', { attributes: { branch } }),
  );

export const Cache = {
  get,
  set,
};
