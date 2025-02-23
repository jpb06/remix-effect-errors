import { Match } from 'effect';

import type { EffectLoaderError } from '@server/loader/types/effect-loader.types';

import type { RemixCapturedEffectLoaderError } from './is-uknown-an-effect-error.logic';

const isNativelyMapped = ({ _tag }: EffectLoaderError) =>
  _tag === 'effect-natively-mapped-errors';

const isPostMapped = ({ _tag }: EffectLoaderError) =>
  _tag === 'effect-post-mapped-errors';

const isNoMapFile = ({ _tag }: EffectLoaderError) =>
  _tag === 'effect-no-map-file';

export const mapEffectErrorTypes = (
  error: RemixCapturedEffectLoaderError,
  path: string,
) =>
  Match.value(error.data).pipe(
    Match.when(isNativelyMapped, (nativelyMapped) => ({
      ...nativelyMapped,
      path,
    })),
    Match.when(isPostMapped, (postMapped) => ({
      ...postMapped,
      path,
    })),
    Match.when(isNoMapFile, (postMapped) => ({
      ...postMapped,
      path,
    })),
    Match.orElseAbsurd,
  );
