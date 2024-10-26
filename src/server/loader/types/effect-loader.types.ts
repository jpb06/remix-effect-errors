import type { EffectErrorWithSources } from '@types';
import type { ErrorData } from 'effect-errors';

export interface EffectLoaderSuccess<A> {
  _tag: 'success';
  data: A;
}

export type EffectPostMappedErrors = {
  _tag: 'effect-post-mapped-errors';
  errors: EffectErrorWithSources[];
};

export type EffectNativelyMappedErrors = {
  _tag: 'effect-natively-mapped-errors';
  errors: ErrorData[];
};

export type EffectLoaderError =
  | EffectPostMappedErrors
  | EffectNativelyMappedErrors;
