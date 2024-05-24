import { Effect } from 'effect';
import { TaggedError } from 'effect/Data';

const span = (name: string, attributes?: Record<string, unknown>) =>
  Effect.withSpan(name, { attributes });

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

const readUser = span('read-user')(
  Effect.tryPromise<Data, FileError>({
    try: async () => await Promise.resolve({ id: 1, name: 'cool story bro' }),
    catch: (e) => new FileError({ cause: e }),
  }),
);

const fetchTask = (userId: number) =>
  span('fetch-user', {
    userId,
  })(
    Effect.tryPromise({
      try: async () =>
        await fetch(`https://yolo-bro-oh-no.org/users/${userId}`),
      catch: (e) =>
        new FetchError({
          cause: (e as Error).message,
        }),
    }),
  );

const unwrapResponseTask = (response: Response) =>
  span('unwrap-fetch-user-response')(
    Effect.tryPromise({
      try: async () => (await response.json()) as Data,
      catch: (e) => new FetchError({ cause: e }),
    }),
  );

export const fromPromiseTask = span('from-promise-task')(
  Effect.gen(function* () {
    const { id } = yield* readUser;
    const response = yield* fetchTask(id);

    return yield* unwrapResponseTask(response);
  }),
);
