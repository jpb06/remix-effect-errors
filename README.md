# remix-effect-errors

Toying with [remix](https://remix.run/docs/en/main) and [effect](https://effect.website/docs/introduction) to get some fancy errors reporting using [effect-errors](https://github.com/jpb06/effect-errors).

<!-- readme-package-icons start -->

<p align="left"><a href="https://docs.github.com/en/actions" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/GithubActions-Dark.svg" /></a>&nbsp;<a href="https://www.typescriptlang.org/docs/" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/TypeScript.svg" /></a>&nbsp;<a href="https://nodejs.org/en/docs/" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/NodeJS-Dark.svg" /></a>&nbsp;<a href="https://bun.sh/docs" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Bun-Dark.svg" /></a>&nbsp;<a href="https://biomejs.dev/guides/getting-started/" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Biome-Dark.svg" /></a>&nbsp;<a href="https://panda-css.com/docs/overview/getting-started/" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/PandaCss.svg" /></a>&nbsp;<a href="https://reactjs.org/docs/getting-started.html" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/React-Dark.svg" /></a>&nbsp;<a href="https://remix.run/docs/en/v1" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Remix-Dark.svg" /></a>&nbsp;<a href="https://vitejs.dev/guide/" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Vite-Dark.svg" /></a>&nbsp;<a href="https://www.effect.website/docs/quickstart" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Effect-Dark.svg" /></a>&nbsp;<a href="https://www.framer.com/motion/introduction/" target="_blank"><img height="50" width="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/FramerMotion-Dark.svg" /></a></p>

<!-- readme-package-icons end -->

## ⚡ So how does that work?

We basically need two things on remix to achieve our goal:

- A custom remix loader accepting an effect and throwing effect errors details.
- An Error boundary to display that information if an error occurs.

### 🔶 Creating a custom loader

```typescript
import type { LoaderFunctionArgs } from '@remix-run/server-runtime';
import { Effect, pipe } from 'effect';

import { collectErrorDetails } from './logic/collect-error-details';
import { remixThrow } from './logic/remix-throw';

export const effectLoader =
  <A, E>(effect: (args: LoaderFunctionArgs) => Effect.Effect<A, E>) =>
  async (args: LoaderFunctionArgs) =>
    await Effect.runPromise(
      pipe(
        effect(args),
        Effect.map((data) => ({ _tag: 'success' as const, data })),
        Effect.sandbox,
        Effect.catchAll(collectErrorDetails),
      ),
    ).then(remixThrow);
```

If the effect fails, we retrieve errors data and related code: 

- In dev mode, effect-errors will use sourcemaps to extract code excerpts related to the error.
- In production however, we must fetch the map file (uploaded in our example on cloudflare R2), and read it to extract sources.

```typescript
export const collectErrorDetails = <E>(cause: Cause<E>) =>
  pipe(
    Effect.gen(function* () {
      // Serverside logging
      const errorsText = prettyPrint(cause, { stripCwd: false });
      console.error(errorsText);

      const { errors } = yield* captureErrors(cause, {});

      if (errors.every((e) => e.location !== undefined)) {
        // Fetch map file and resolve sourcemaps ...
        const errorsWithSources = yield* getErrorSourcesFromMapFile(errors);

        return yield* Effect.succeed({
          _tag: 'effect-post-mapped-errors' as const,
          errors: errorsWithSources,
        });
      }

      // in Dev mode, sources are resolved by effect-errors
      return yield* Effect.succeed({
        _tag: 'effect-natively-mapped-errors' as const,
        errors,
      });
    }),
    Effect.scoped,
    Effect.provide(FetchHttpClient.layer),
    Effect.withSpan('collect-error-details'),
  );

```

We need to pipe on the promise because remix expects us to throw a `json` function result from the loader for errors:

```typescript
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
```

### 🔶 Creating an error boundary to display effect errors details

First, let's create a hook to get errors data:

```typescript
import {
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from '@remix-run/react';

import type {
  EffectNativelyMappedErrors,
  EffectPostMappedErrors,
} from '@server/loader/types/effect-loader.types';

import { isUnknownAnEffectError } from './logic/is-uknown-an-effect-error.logic';
import { mapEffectErrorTypes } from './logic/map-effect-error-types';

export type EffectPostMappedErrorsWithPath = EffectPostMappedErrors & {
  path: string;
};
export type EffectNativelyMappedErrorsWithPath = EffectNativelyMappedErrors & {
  path: string;
};

export type ErrorsDetails =
  | {
      _tag: 'route' | 'error' | 'unknown';
      path: string;
      errors: {
        message: string;
      }[];
    }
  | EffectPostMappedErrorsWithPath
  | EffectNativelyMappedErrorsWithPath;

export const useErrorDetails = (): ErrorsDetails => {
  const { pathname } = useLocation();
  const error = useRouteError();

  if (isUnknownAnEffectError(error)) {
    return mapEffectErrorTypes(error, pathname);
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

We can then focus on displaying our errors data...

```typescript
import { AppErrors } from './children/app-errors';
import { Summary } from './children/summary';
import { errorBoundaryStyles } from './error-boundary.styles';
import { useErrorDetails } from './hooks/use-error-details';

export const ErrorBoundary = () => {
  const css = errorBoundaryStyles();

  const data = useErrorDetails();

  return (
    <div className={css.root}>
      <Summary {...data} />
      <AppErrors {...data} />
    </div>
  );
};
```
