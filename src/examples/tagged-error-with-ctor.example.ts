import { Effect, pipe } from 'effect';
import { TaggedError } from 'effect/Data';
import fs from 'fs-extra';

interface Data {
  id: string;
  name: string;
}

class TaggedErrorWithErrorCtor extends TaggedError('OhNo') {
  constructor(readonly error: unknown) {
    super();
  }
}

const readUser = pipe(
  Effect.tryPromise<Data, TaggedErrorWithErrorCtor>({
    try: async () => await fs.readJson('./src/examples/data/yolo.json'),
    catch: (e) =>
      e instanceof Error
        ? new TaggedErrorWithErrorCtor(e.message)
        : new TaggedErrorWithErrorCtor(e),
  }),
  Effect.withSpan('read-user'),
);

export const taggedErrorWithCtorTask = pipe(
  readUser,
  Effect.withSpan('tagged-error-task'),
);
