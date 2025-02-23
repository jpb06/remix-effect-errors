import { TaggedError } from 'effect/Data';

export class NoMapFileError extends TaggedError('no-map-file-error')<{
  cause?: unknown;
  message?: string;
}> {}
