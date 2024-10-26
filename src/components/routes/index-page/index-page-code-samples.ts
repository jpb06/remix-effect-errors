export const effectLoaderCode = `import type { LoaderFunctionArgs } from '@remix-run/server-runtime';
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
    ).then(remixThrow);`;

export const collectErrorDetailsCode = `export const collectErrorDetails = <E>(cause: Cause<E>) =>
  pipe(
    Effect.gen(function* () {
      // Serverside logging
      const errorsText = prettyPrint(cause, { stripCwd: false });
      console.error(errorsText);

      const { errors } = yield* captureErrors(cause);

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
  );`;

export const remixThrowCode = `import { json } from '@remix-run/server-runtime';
import { match } from 'ts-pattern';

export interface EffectLoaderSuccess<A> {
  _tag: 'success';
  data: A;
}

export type EffectPostMappedErrors = {
  _tag: 'effect-post-mapped-errors';
  errors: EffectErrorWithSources[];
};
export type EffectNativelyMappedErrors = {
  _tag: 'effect-natively-mapped-errors';
  errors: ErrorData[];
};
export type EffectLoaderError =
  | EffectPostMappedErrors
  | EffectNativelyMappedErrors;

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
  );`;

export const routeLoaderCode = `export const loader = effectLoader(({ request }) =>
  pipe(
    Effect.gen(function* () {
      // My effect code ...
    }),
    Effect.withSpan('my-route-loader', {
      attributes: {
        url: request.url,
        method: request.method,
        body: request.body,
      },
    })
  ),
);`;

export const errorBoundaryCode = `import { AppErrors } from './children/app-errors';
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
};`;

export const useErrorDetailsCode = `import {
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
          message: error.statusText,
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
`;
