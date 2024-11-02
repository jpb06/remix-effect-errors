import { Match } from 'effect';
import { typedjson } from 'remix-typedjson';
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
      throw typedjson(data, { status: 500 });
    }),
  );
