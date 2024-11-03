import { Effect, pipe } from 'effect';
import fs from 'fs-extra';

const readUser = pipe(
  Effect.tryPromise(async () => await fs.readJson('cool.ts')),
  Effect.withSpan('read-user'),
);

export const unknownErrorTask = pipe(
  Effect.all([Effect.sleep('55 millis'), readUser]),
  Effect.withSpan('unknown-error-task'),
);
