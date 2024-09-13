import { ErrorData } from 'effect-errors';

export type EffectError = Pick<
  ErrorData,
  'errorType' | 'message' | 'spans' | 'stack' | 'sources'
>;
