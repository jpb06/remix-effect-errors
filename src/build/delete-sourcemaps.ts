import { Effect, pipe } from 'effect';
import { CloudflareR2StorageLayerLive } from 'effect-cloudflare-r2-layer';
import { runPromise } from 'effect-errors';

import { deleteMapFile } from './dependencies/r2';

const task = pipe(
  Effect.gen(function* () {
    console.info('Deleting sourcemaps ...');

    const branch = process.env.DELETED_BRANCH;
    if (branch === undefined) {
      console.info('❌ DELETED_BRANCH env var is not set');
      return;
    }

    yield* deleteMapFile(branch);
    console.info(`✅ mapfile deleted for branch '${branch}'`);
  }),
  Effect.provide(CloudflareR2StorageLayerLive),
  Effect.withSpan('delete-sourcemaps'),
);

await runPromise(task);
