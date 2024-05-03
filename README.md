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

const effectLoader =
  <A, E>(effect: (args: LoaderFunctionArgs) => Effect.Effect<A, E>) =>
  async (args: LoaderFunctionArgs) =>
    await Effect.runPromise(
      pipe(
        effect(args),
        Effect.map((data) => ({ _tag: 'success', data })),
        Effect.sandbox,
        Effect.catchAll((cause) => {
          // Displaying fancy logs on the server
          const errorsText = prettyPrint(cause, { stripCwd: true });
          console.error(errorsText);

          // Get effect error details using effect-errors
          const { errors } = captureErrors(cause, {
            reverseSpans: true,
            stripCwd: true,
          });

          // Compute spans duration
          const errorsWithSpanDuration = errors.map(
            ({ errorType, message, stack, spans }) => ({
              type: errorType,
              message,
              stack,
              spans: getSpansDuration(spans),
            }),
          );

          // Return errors details
          return Effect.succeed({
            _tag: 'error',
            data: errorsWithSpanDuration,
          });
        }),
      ),
    ).then(remixThrow<A>);
```

We need to pipe on the promise because remix expects us to throw a `json` function result from the loader for errors:

```typescript
import { json } from '@remix-run/server-runtime';

import { TDataOrError } from '../types/data-or-error.type';

interface RemixThrowInput<A> {
  _tag: string;
  data: TDataOrError<A>;
}

const remixThrow = <A>({ _tag, data }: RemixThrowInput<A>): A => {
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
```

### 🔶 Creating an error boundary to display effect errors details

```typescript
type EffectError = {
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

const useErrorDetails = () => {
  const { pathname } = useLocation();
  const error = useRouteError();

  if (isEffectError(error)) {
    return {
      _tag: 'effect',
      path: pathname,
      errors: error.data.errors,
    };
  }

  // handle node errors ...
}

const ErrorBoundary = () => {
  const { _tag, errors } = useErrorDetails();

  return (
    // Display errors data
  );
};

```
