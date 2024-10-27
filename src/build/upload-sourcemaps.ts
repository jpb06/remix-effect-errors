import { Effect, pipe } from 'effect';
import { CloudflareR2StorageLayerLive } from 'effect-cloudflare-r2-layer';
import { runPromise } from 'effect-errors';

import { getBranch } from './dependencies/github';
import { ensureBucket, uploadServerIndex } from './dependencies/r2';

const task = pipe(
  Effect.gen(function* () {
    console.info('Uploading sourcemaps ...');
    yield* ensureBucket;

    const branch = yield* getBranch;
    yield* uploadServerIndex(branch);

    console.info(`✅ mapfile uploaded for branch '${branch}'`);
  }),
  Effect.provide(CloudflareR2StorageLayerLive),
  Effect.withSpan('upload-sourcemaps'),
);

await runPromise(task);
