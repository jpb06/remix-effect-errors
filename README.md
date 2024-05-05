# remix-effect-errors

Toying with [remix](https://remix.run/docs/en/main) and [effect](https://effect.website/docs/introduction) to get some fancy errors reporting using [effect-errors](https://github.com/jpb06/effect-errors).

<!-- readme-package-icons start -->

<p align="left"><a href="https://www.typescriptlang.org/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/TypeScript.svg" /></a>&nbsp;<a href="https://nodejs.org/en/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/NodeJS-Dark.svg" /></a>&nbsp;<a href="https://pnpm.io/motivation" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Pnpm-Dark.svg" /></a>&nbsp;<a href="https://eslint.org/docs/latest/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Eslint-Dark.svg" /></a>&nbsp;<a href="https://prettier.io/docs/en/index.html" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Prettier-Dark.svg" /></a>&nbsp;<a href="https://reactjs.org/docs/getting-started.html" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/React-Dark.svg" /></a>&nbsp;<a href="https://remix.run/docs/en/v1" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Remix-Dark.svg" /></a>&nbsp;<a href="https://tailwindcss.com/docs/installation" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/TailwindCSS-Dark.svg" /></a>&nbsp;<a href="https://vitejs.dev/guide/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Vite-Dark.svg" /></a>&nbsp;<a href="https://daisyui.com/docs/install/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/DaisyUi-Dark.svg" /></a>&nbsp;<a href="https://www.effect.website/docs/quickstart" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Effect-Dark.svg" /></a>&nbsp;<a href="https://www.framer.com/motion/introduction/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/FramerMotion-Dark.svg" /></a></p>

<!-- readme-package-icons end -->

## ⚡ So how does that work?

We basically need two things on remix to achieve our goal:

- A custom remix loader accepting an effect and throwing effect errors details.
- An Error boundary to display that information if an error occurs.

### 🔶 Creating a custom loader

```typescript
import { type LoaderFunctionArgs } from '@remix-run/server-runtime';
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
        Effect.map((data) => ({ _tag: 'success' as const, data })),
        Effect.sandbox,
        Effect.catchAll((cause) => {
          // Serverside logging
          const errorsText = prettyPrint(cause, { stripCwd: true });
          console.error(errorsText);

          // Getting errors data to display it client side
          const { errors } = captureErrors(cause, {
            reverseSpans: true,
            stripCwd: true,
          });

          // Computing spans duration ...
          const errorsWithSpanDuration = errors.map(
            ({ errorType, message, stack, spans }) => ({
              type: errorType,
              message,
              stack,
              spans: getSpansDuration(spans),
            }),
          );

          return Effect.succeed({
            _tag: 'error' as const,
            data: errorsWithSpanDuration,
          });
        }),
      ),
    ).then(remixThrow);
```

We need to pipe on the promise because remix expects us to throw a `json` function result from the loader for errors:

```typescript
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
        { type: 'effect', errors: stringifyErrorsMessage(data as never) },
        { status: 500 },
      );
    });
```

### 🔶 Creating an error boundary to display effect errors details

First, let's create a hook to get errors data:

```typescript
import {
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from '@remix-run/react';

export interface EffectError {
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

export const useErrorDetails = () => {
  const { pathname } = useLocation();
  const error = useRouteError();

  if (isEffectError(error)) {
    return {
      _tag: 'effect' as const,
      path: pathname,
      errors: error.data.errors,
    };
  }

  const isRoute = isRouteErrorResponse(error);
  if (isRoute) {
    return {
      _tag: 'route' as const,
      path: pathname,
      errors: [
        {
          message: `${error.statusText}`,
        },
      ],
    };
  }

  if (error instanceof Error) {
    return {
      _tag: 'error' as const,
      path: pathname,
      errors: [error],
    };
  }

  return {
    _tag: 'unknown' as const,
    path: pathname,
    errors: [{ message: 'Unknown Error' }],
  };
};
```

We can then focus on data display...

```typescript
import { match } from 'ts-pattern';

import type { EffectError } from './useErrorDetails.code-sample';
import { useErrorDetails } from './useErrorDetails.code-sample';

type EffectErrorDetailsProps = Pick<EffectError, 'type' | 'message' | 'spans'>;

const EffectErrorDetails = ({
  type,
  message,
  spans,
}: EffectErrorDetailsProps) => (
  <li>
    {type} {message}{' '}
    {spans?.map(({ name, duration, attributes }, spanIndex) => (
      <div key={spanIndex}>
        <div>{name}</div>
        <div>{duration !== undefined ? `~ ${duration} ms` : ''}</div>
        <div>
          {Object.entries(attributes)
            .filter(([, value]) => value !== null)
            .map(([key, value], attributeNumber) => (
              <div key={attributeNumber}>
                <span>{key}</span>: {JSON.stringify(value)}
              </div>
            ))}
        </div>
      </div>
    ))}
  </li>
);

const isEffectErrors = (
  p: ReturnType<typeof useErrorDetails>,
): p is { _tag: 'effect'; path: string; errors: EffectError[] } =>
  p._tag === 'effect';

export const ErrorBoundary = () => {
  const errors = useErrorDetails();

  return match(errors)
    .when(isEffectErrors, ({ errors }) => (
      <ul>
        {errors.map((e, errorIndex) => (
          <EffectErrorDetails key={errorIndex} {...e} />
        ))}
      </ul>
    ))
    .otherwise(({ errors }) => (
      <ul>
        {errors.map(({ message }, errorIndex) => (
          <li key={errorIndex}>{message}</li>
        ))}
      </ul>
    ));
};
```
