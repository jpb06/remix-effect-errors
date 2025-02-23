import type {
  EffectNativelyMappedErrorsWithPath,
  EffectNoMapFileWithPath,
  EffectPostMappedErrorsWithPath,
  ErrorsDetails,
} from '../../../hooks/use-error-details';

export const isEffectError = (
  errorsDetails: ErrorsDetails,
): errorsDetails is
  | EffectPostMappedErrorsWithPath
  | EffectNativelyMappedErrorsWithPath
  | EffectNoMapFileWithPath =>
  errorsDetails._tag === 'effect-natively-mapped-errors' ||
  errorsDetails._tag === 'effect-post-mapped-errors' ||
  errorsDetails._tag === 'effect-no-map-file';
