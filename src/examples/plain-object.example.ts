import { Effect, pipe } from 'effect';

const readUser = pipe(
  Effect.fail({ _tag: 'BigBadError', message: 'Oh no!' }),
  Effect.withSpan('read-user'),
);

export const plainObjectErrorTask = pipe(
  Effect.all([Effect.sleep('33 millis'), readUser]),
  Effect.withSpan('plain-object-error-task'),
);
