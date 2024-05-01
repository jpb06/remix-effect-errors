import { Effect } from 'effect';
import { TaggedError } from 'effect/Data';

class CustomError extends TaggedError('CustomError')<{
  cause?: unknown;
  message?: string;
}> {}

const subTask = Effect.withSpan('sub-task', {
  attributes: {
    cool: true,
    yolo: 'bro',
  },
})(Effect.fail(new CustomError({ cause: 'Oh no! I failed!' })));

export const taggedErrorTask = Effect.withSpan('tagged-error-task', {
  attributes: {
    struff: 'struff',
  },
})(subTask);
