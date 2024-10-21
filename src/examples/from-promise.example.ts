import { Effect, pipe } from 'effect';
import { TaggedError } from 'effect/Data';

class FetchError extends TaggedError('FetchError')<{
  cause?: unknown;
  message?: string;
}> {}

class FileError extends TaggedError('FileError')<{
  cause?: unknown;
  message?: string;
}> {}

interface Data {
  id: number;
  name: string;
}

const readUser = pipe(
  Effect.tryPromise<Data, FileError>({
    try: async () => await Promise.resolve({ id: 1, name: 'cool story bro' }),
    catch: (e) => new FileError({ cause: e }),
  }),
  Effect.withSpan('read-user'),
);

const fetchTask = (userId: number) =>
  pipe(
    Effect.tryPromise({
      try: async () =>
        await fetch(`https://yolo-bro-oh-no.org/users/${userId}`),
      catch: (e) =>
        new FetchError({
          cause: (e as Error).message,
        }),
    }),
    Effect.withSpan('fetch-user', { attributes: { userId } }),
  );

const unwrapResponseTask = (response: Response) =>
  pipe(
    Effect.tryPromise({
      try: async () => (await response.json()) as Data,
      catch: (e) => new FetchError({ cause: e }),
    }),
    Effect.withSpan('unwrap-fetch-user-response'),
  );

export const fromPromiseTask = pipe(
  Effect.gen(function* () {
    const { id } = yield* readUser;
    const response = yield* fetchTask(id);

    return yield* unwrapResponseTask(response);
  }),
  Effect.withSpan('from-promise-task'),
);
