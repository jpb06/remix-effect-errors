import { FetchHttpClient } from '@effect/platform';
import { Effect, Layer, pipe } from 'effect';
import {
  CloudflareR2StorageLayerLive,
  FileStorageLayer,
} from 'effect-cloudflare-r2-layer';

type Buckets = 'remix-effect-errors';
const version = '1.0.0';

type MapFile = {
  version: string;
  file: string;
  sources: string[];
  sourcesContent: string[];
  names: string[];
  mappings: string;
};

export const getMapFile = pipe(
  FileStorageLayer.readAsJson<Buckets, MapFile>(
    'remix-effect-errors',
    `build/server/${version}/index.js.map`,
  ),
  Effect.scoped,
  Effect.provide(
    Layer.mergeAll(CloudflareR2StorageLayerLive, FetchHttpClient.layer),
  ),
  Effect.withSpan('get-map-file'),
);
