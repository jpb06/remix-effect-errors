import { Effect, pipe } from 'effect';
import {
  CloudflareR2StorageLayerLive,
  FileStorageLayer,
} from 'effect-cloudflare-r2-layer';

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
    FileStorageLayer.readAsJson<Buckets, MapFile>(
      'remix-effect-errors',
      `build/server/${branchName}/index.js.map`,
    ),
    Effect.provide(CloudflareR2StorageLayerLive),
    Effect.withSpan('get-map-file-from-r2', { attributes: { branchName } }),
  );
