import { readFile as nodeReadFile } from 'node:fs/promises';
import { parse } from 'comment-json';
import { Effect, pipe } from 'effect';
import { TaggedError } from 'effect/Data';

interface Data {
  id: string;
  name: string;
}

class TaggedErrorWithErrorCtor extends TaggedError('OhNo') {
  constructor(readonly error: unknown) {
    super();
  }
}

export class JsonParsingError extends TaggedError('json-parsing-error')<{
  cause?: unknown;
  message?: string;
}> {}

export const parseJson = <TData>(data: string) =>
  pipe(
    Effect.sync(() => parse(data, null, true) as TData),
    Effect.catchAll((e) =>
      Effect.fail(
        new JsonParsingError({
          cause: e,
        }),
      ),
    ),
    Effect.withSpan('parse-json', {
      attributes: {
        data,
      },
    }),
  );

const readFile = (path: string) =>
  pipe(
    Effect.tryPromise({
      try: async () =>
        nodeReadFile('./src/examples/data/yolo.json', {
          encoding: 'utf-8',
        }),
      catch: (e) =>
        e instanceof Error
          ? new TaggedErrorWithErrorCtor(e.message)
          : new TaggedErrorWithErrorCtor(e),
    }),
    Effect.withSpan('read-file', { attributes: { path } }),
  );

const readUser = pipe(
  readFile('./src/examples/data/yolo.json'),
  Effect.flatMap(parseJson<Data>),
  Effect.withSpan('read-user'),
);

export const taggedErrorWithCtorTask = pipe(
  Effect.all([Effect.sleep('37 millis'), readUser]),
  Effect.withSpan('tagged-error-task'),
);
