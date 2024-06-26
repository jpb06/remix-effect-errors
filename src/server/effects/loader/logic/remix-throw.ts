import { json } from '@remix-run/server-runtime';
import { match } from 'ts-pattern';

import {
  EffectLoaderError,
  EffectLoaderSuccess,
} from '../types/effect-loader.types';

import { stringifyErrorsMessage } from './stringify-errors-message';

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
    .otherwise(({ data }) => {
      throw json(
        {
          type: 'effect',
          errors: stringifyErrorsMessage(data as never),
        },
        {
          status: 500,
        },
      );
    });
