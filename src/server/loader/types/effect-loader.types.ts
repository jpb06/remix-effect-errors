import type { CapturedErrors } from 'effect-errors';

import type { EffectErrorWithSources } from '@types';

export interface EffectLoaderSuccess<A> {
  _tag: 'success';
  data: A;
}

export interface EffectLoaderError {
  _tag: 'error';
  interrupted: CapturedErrors['interrupted'];
  errors: EffectErrorWithSources[];
}
