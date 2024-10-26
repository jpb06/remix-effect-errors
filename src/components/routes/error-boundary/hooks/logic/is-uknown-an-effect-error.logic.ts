import type { EffectLoaderError } from '@server/loader/types/effect-loader.types';

export type RemixCapturedEffectLoaderError = {
  data: EffectLoaderError;
};

export const isUnknownAnEffectError = (
  error: unknown,
): error is RemixCapturedEffectLoaderError => {
  const withMaybeData = error as { data?: { _tag?: string } };

  return (
    withMaybeData?.data?._tag === 'effect-post-mapped-errors' ||
    withMaybeData?.data?._tag === 'effect-natively-mapped-errors'
  );
};
