import { Effect, pipe } from 'effect';
import { FileStorageLayer } from 'effect-cloudflare-r2-layer';

import { readFileEffect } from '../fs';
import type { Buckets } from './buckets.constant';

export const uploadMapFile = (version: string) =>
  pipe(
    Effect.gen(function* () {
      const data = yield* readFileEffect(
        './build/server/nodejs-eyJydW50aW1lIjoibm9kZWpzIn0/index.js.map',
      );

      yield* FileStorageLayer.uploadFile<Buckets>({
        bucketName: 'remix-effect-errors',
        documentKey: `build/server/${version}/index.js.map`,
        data,
        contentType: 'application/json',
      });
    }),
    Effect.withSpan('upload-map-file', { attributes: { version } }),
  );
