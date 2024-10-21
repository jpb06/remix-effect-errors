import { Effect, pipe } from 'effect';

const readUser = pipe(
  Effect.fail({ _tag: 'BigBadError', message: 'Oh no!' }),
  Effect.withSpan('read-user'),
);

export const plainObjectErrorTask = pipe(
  readUser,
  Effect.withSpan('plain-object-error-task'),
);
