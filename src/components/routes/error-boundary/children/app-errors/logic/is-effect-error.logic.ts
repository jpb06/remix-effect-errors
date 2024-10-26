import type {
  EffectNativelyMappedErrorsWithPath,
  EffectPostMappedErrorsWithPath,
  ErrorsDetails,
} from '../../../hooks/use-error-details';

export const isEffectError = (
  errorsDetails: ErrorsDetails,
): errorsDetails is
  | EffectPostMappedErrorsWithPath
  | EffectNativelyMappedErrorsWithPath =>
  errorsDetails._tag === 'effect-natively-mapped-errors' ||
  errorsDetails._tag === 'effect-post-mapped-errors';
