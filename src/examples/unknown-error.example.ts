import { readFile as nodeReadFile } from 'node:fs/promises';
import { Effect, pipe } from 'effect';

const readUser = pipe(
  Effect.tryPromise(
    async () => await nodeReadFile('cool.ts', { encoding: 'utf-8' }),
  ),
  Effect.withSpan('read-user'),
);

export const unknownErrorTask = pipe(
  Effect.all([Effect.sleep('55 millis'), readUser]),
  Effect.withSpan('unknown-error-task'),
);
