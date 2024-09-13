import { CapturedErrors } from 'effect-errors';

export interface EffectLoaderSuccess<A> {
  _tag: 'success';
  data: A;
}

export interface EffectLoaderError {
  _tag: 'error';
  data: CapturedErrors;
}
