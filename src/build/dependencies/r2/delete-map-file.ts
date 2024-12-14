import { Effect, pipe } from 'effect';
import { FileStorageLayer } from 'effect-cloudflare-r2-layer';

import type { Buckets } from './buckets.constant';

export const deleteMapFile = (branchName: string) =>
  pipe(
    Effect.gen(function* () {
      yield* FileStorageLayer.deleteFile<Buckets>({
        bucketName: 'remix-effect-errors',
        documentKey: `build/server/${branchName}/index.js.map`,
      });
    }),
    Effect.withSpan('delete-map-file', { attributes: { branchName } }),
  );
