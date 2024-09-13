import { CapturedErrors } from 'effect-errors';

type EffectError = {
  data: {
    type: 'effect';
    data: CapturedErrors;
  };
};

export const isEffectError = (error: unknown): error is EffectError =>
  (error as { data?: { type?: 'effect' } })?.data?.type === 'effect';
