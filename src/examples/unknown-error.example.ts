import { Effect } from 'effect';
import fs from 'fs-extra';

const readUser = Effect.withSpan('read-user')(
  Effect.tryPromise(async () => await fs.readJson('cool.ts')),
);

export const unknownErrorTask = Effect.withSpan('unknown-error-task')(readUser);
