import { json } from '@remix-run/server-runtime';

import { TDataOrError } from '../types/data-or-error.type';

interface RemixThrowInput<A> {
  _tag: string;
  data: TDataOrError<A>;
}

export const remixThrow = <A>({ _tag, data }: RemixThrowInput<A>): A => {
  if (_tag !== 'error') {
    return data as A;
  }

  throw json(
    {
      type: 'effect',
      errors: (data as { message: { toString?: () => string } }[]).map((d) => ({
        ...d,
        message:
          d.message.toString !== undefined ? d.message.toString() : d.message,
      })),
    },
    {
      status: 500,
    },
  );
};
