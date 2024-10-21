import type { EffectErrorWithSources } from '@types';

import type { ErrorsDetails } from '../../../hooks/use-error-details';

export const isEffectErrors = (
  arg: Pick<ErrorsDetails, '_tag' | 'path' | 'errors'>,
): arg is { _tag: 'effect'; path: string; errors: EffectErrorWithSources[] } =>
  arg._tag === 'effect';
