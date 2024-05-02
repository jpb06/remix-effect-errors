export const exampleString = `import { Effect } from 'effect';
import { TaggedError } from 'effect/Data';
import fs from 'fs-extra';

interface Data {
  id: string;
  name: string;
}

class TaggedErrorWithErrorCtor extends TaggedError('OhNo') {
  constructor(readonly error?: unknown) {
    super();
  }
}

const readUser = Effect.withSpan('read-user')(
  Effect.tryPromise<Data, TaggedErrorWithErrorCtor>({
    try: async () => await fs.readJson('./src/examples/data/yolo.json'),
    catch: (e) => new TaggedErrorWithErrorCtor(e),
  }),
);

export const taggedErrorWithCtorTask =
  Effect.withSpan('tagged-error-task')(readUser);`;
