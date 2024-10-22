import { Effect, pipe } from 'effect';
import { runPromise } from 'effect-errors';

import { getBranch } from './dependencies/github';

const task = pipe(
  Effect.gen(function* () {
    console.info('YOLO', process.env.YOLO);
    // yield* ensureBucket;

    const branch = yield* getBranch;
    // yield* uploadServerIndex(branch);

    console.info(`✅ mapfile uploaded for branch '${branch}'`);
  }),
  // Effect.provide(CloudflareR2StorageLayerLive),
  Effect.withSpan('upload-sourcemaps'),
);

await runPromise(task);
