export const exampleString = `import { Effect } from 'effect';
import { TaggedError } from 'effect/Data';

class UserNotFoundError extends TaggedError('UserNotFound')<{
  cause?: unknown;
  message?: string;
}> {}

const readUser = (name: string) =>
  Effect.withSpan('read-user', {
    attributes: { name },
  })(
    Effect.tryPromise({
      try: async () => Promise.reject('Oh no, this user does not exist!'),
      catch: (e) => new UserNotFoundError({ cause: e }),
    }),
  );

const parallelGet = (names: string[]) =>
  Effect.withSpan('parallel-get', {
    attributes: { names },
  })(
    Effect.all(names.map(readUser), {
      concurrency: 'unbounded',
    }),
  );

export const parallelTask = Effect.withSpan('parallel-errors-task')(
  parallelGet(['yolo', 'bro', 'cool']),
);`;
