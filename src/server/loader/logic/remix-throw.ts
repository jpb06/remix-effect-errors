import { json } from '@remix-run/server-runtime';
import { match } from 'ts-pattern';

import type {
  EffectLoaderError,
  EffectLoaderSuccess,
} from '../types/effect-loader.types';

type RemixThrowInput<A> = EffectLoaderSuccess<A> | EffectLoaderError;

const effectHasSucceeded = <A>(
  p: RemixThrowInput<A>,
): p is EffectLoaderSuccess<A> => p._tag === 'success';

export const remixThrow = <A>(input: RemixThrowInput<A>) =>
  match(input)
    .when(
      (p) => effectHasSucceeded(p),
      ({ data }) => data,
    )
    .otherwise(({ errors }) => {
      throw json(
        {
          type: 'effect',
          errors,
        },
        {
          status: 500,
        },
      );
    });
