import type { EffectErrorWithSources } from '@types';

type EffectError = {
  data: {
    type: 'effect';
    errors: EffectErrorWithSources[];
  };
};

export const isEffectError = (error: unknown): error is EffectError =>
  (error as { data?: { type?: 'effect' } })?.data?.type === 'effect';
