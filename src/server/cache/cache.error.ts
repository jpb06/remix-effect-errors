import { TaggedError } from 'effect/Data';

export class CacheError extends TaggedError('cache-error')<{
  cause?: unknown;
  message?: string;
}> {}
