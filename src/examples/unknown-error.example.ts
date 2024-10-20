import { Effect, pipe } from 'effect';
import fs from 'fs-extra';

const readUser = pipe(
  Effect.tryPromise(async () => await fs.readJson('cool.ts')),
  Effect.withSpan('read-user'),
);

export const unknownErrorTask = pipe(
  readUser,
  Effect.withSpan('unknown-error-task'),
);
