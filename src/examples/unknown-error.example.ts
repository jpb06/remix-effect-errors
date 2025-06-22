import { readFile as nodeReadFile } from 'node:fs/promises';

import { Effect, pipe } from 'effect';

const readFile = pipe(
  Effect.tryPromise(
    async () => await nodeReadFile('cool.ts', { encoding: 'utf-8' }),
  ),
  Effect.withSpan('read-file'),
);

export const unknownErrorTask = pipe(
  Effect.all([Effect.sleep('55 millis'), readFile]),
  Effect.withSpan('unknown-error-task'),
);
