export const effectLoaderCode = `import { type LoaderFunctionArgs } from '@remix-run/server-runtime';
import { Effect, pipe } from 'effect';
import { captureErrors, prettyPrint } from 'effect-errors';

import { getSpansDuration } from './logic/get-spans-duration';
import { remixThrow } from './logic/remix-throw';

export const effectLoader =
  <A, E>(effect: (args: LoaderFunctionArgs) => Effect.Effect<A, E>) =>
  async (args: LoaderFunctionArgs) =>
    await Effect.runPromise(
      pipe(
        effect(args),
        Effect.map((data) => ({ _tag: 'success', data })),
        Effect.sandbox,
        Effect.catchAll((cause) => {
          const errorsText = prettyPrint(cause, { stripCwd: true });
          console.error(errorsText);
          const { errors } = captureErrors(cause, {
            reverseSpans: true,
            stripCwd: true,
          });

          const errorsWithSpanDuration = errors.map(
            ({ errorType, message, stack, spans }) => ({
              type: errorType,
              message,
              stack,
              spans: getSpansDuration(spans),
            }),
          );

          return Effect.succeed({
            _tag: 'error',
            data: errorsWithSpanDuration,
          });
        }),
      ),
    ).then(remixThrow<A>);`;

export const remixThrowCode = `import { json } from '@remix-run/server-runtime';

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
};`;

export const routeLoaderCode = `export const loader = effectLoader(({ request }) =>
  Effect.withSpan('my-route-loader', {
    attributes: {
      url: request.url,
      method: request.method,
      body: request.body,
    },
  })(Effect.gen(function* () {
    // My effect code ...
  }))
);`;

export const errorBoundaryCode = `type EffectError = {
  type?: string;
  message: string;
  stack?: string;
  spans?: {
    name: string;
    attributes: Record<string, unknown>;
    duration: bigint | undefined;
  }[];
}

const isEffectError = (
  error: unknown,
): error is {
  data: {
    type: 'effect';
    errors: EffectError[];
  };
} => (error as { data?: { type?: 'effect' } })?.data?.type === 'effect';

const useErrorDetails = (): ErrorsDetails => {
  const error = useRouteError();

  if (isEffectError(error)) {
    return {
      _tag: 'effect',
      path: pathname,
      errors: error.data.errors,
    };
  }

  // Do something with regular errors ...
}

export const ErrorBoundary = () => {
  const { _tag, errors } = useErrorDetails();

  return (
    // Conditional data display depending on the _tag prop
  );
};`;
