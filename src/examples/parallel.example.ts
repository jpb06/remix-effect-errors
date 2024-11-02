import { Effect, pipe } from 'effect';
import { TaggedError } from 'effect/Data';

class UserNotFoundError extends TaggedError('UserNotFound')<{
  cause?: unknown;
  message?: string;
}> {}

const readUser = (name: string) =>
  pipe(
    Effect.all([
      Effect.sleep('32 millis'),
      Effect.tryPromise({
        try: async () =>
          await Promise.reject('Oh no, this user does not exist!'),
        catch: (e) => new UserNotFoundError({ cause: e }),
      }),
    ]),
    Effect.withSpan('read-user', { attributes: { name } }),
  );

const parallelGet = (names: string[]) =>
  pipe(
    Effect.sleep('14 millis'),
    Effect.flatMap(() =>
      Effect.all(names.map(readUser), {
        concurrency: 'unbounded',
      }),
    ),
    Effect.withSpan('parallel-get', { attributes: { names } }),
  );

export const parallelTask = pipe(
  Effect.all([Effect.sleep('12 millis'), parallelGet(['yolo', 'bro', 'cool'])]),
  Effect.withSpan('parallel-errors-task'),
);
