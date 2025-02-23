import { FetchHttpClient } from '@effect/platform';
import { Effect, Layer, pipe } from 'effect';
import {
  CloudflareR2StorageLayerLive,
  FileStorageLayer,
} from 'effect-cloudflare-r2-layer';

import { NoMapFileError } from './errors/no-map-file.error';

type Buckets = 'remix-effect-errors';

export type MapFile = {
  version: string;
  file: string;
  sources: string[];
  sourcesContent: string[];
  names: string[];
  mappings: string;
};

export const getMapFileFromR2 = (branchName: string) =>
  pipe(
    Effect.gen(function* () {
      const path = `build/server/${branchName}/index.js.map`;

      const mapFileExists = yield* FileStorageLayer.fileExists<Buckets>(
        'remix-effect-errors',
        path,
      );
      if (!mapFileExists) {
        yield* Effect.fail(new NoMapFileError({}));
      }

      const mapFile = yield* FileStorageLayer.readAsJson<Buckets, MapFile>(
        'remix-effect-errors',
        path,
      );

      return mapFile;
    }),
    Effect.scoped,
    Effect.provide(
      Layer.mergeAll(CloudflareR2StorageLayerLive, FetchHttpClient.layer),
    ),
    Effect.withSpan('get-map-file-from-r2', { attributes: { branchName } }),
  );
