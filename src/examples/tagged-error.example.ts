import { Effect, pipe } from 'effect';
import { TaggedError } from 'effect/Data';

class CustomError extends TaggedError('CustomError')<{
  cause?: unknown;
  message?: string;
}> {}

const subTask = pipe(
  Effect.fail(new CustomError({ cause: 'Oh no! I failed!' })),
  Effect.withSpan('sub-task', {
    attributes: {
      cool: true,
      yolo: 'bro',
    },
  }),
);

export const taggedErrorTask = pipe(
  Effect.all([Effect.sleep('21 millis'), subTask]),
  Effect.withSpan('tagged-error-task', {
    attributes: {
      struff: 'struff',
    },
  }),
);
