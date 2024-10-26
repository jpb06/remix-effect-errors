import { json } from '@remix-run/server-runtime';

import { Match } from 'effect';
import type {
  EffectLoaderError,
  EffectLoaderSuccess,
} from '../types/effect-loader.types';

type RemixThrowInput<A> = EffectLoaderSuccess<A> | EffectLoaderError;

const effectHasSucceeded = <A>(
  p: RemixThrowInput<A>,
): p is EffectLoaderSuccess<A> => p._tag === 'success';

export const remixThrow = <A>(input: RemixThrowInput<A>) =>
  Match.value(input).pipe(
    Match.when(effectHasSucceeded, ({ data }) => data),
    Match.orElse((data) => {
      throw json(data, { status: 500 });
    }),
  );
