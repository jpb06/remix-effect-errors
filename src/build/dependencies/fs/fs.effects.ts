import { readFile, stat, writeFile } from 'node:fs/promises';
import { parse } from 'comment-json';
import { Effect, pipe } from 'effect';

import { FsError } from './fs.error.js';

export const readFileAsStringEffect = (path: string) =>
  pipe(
    Effect.tryPromise({
      try: () => readFile(path, { encoding: 'utf8' }),
      catch: (e) => new FsError({ cause: e }),
    }),
    Effect.withSpan('read-file-as-string', { attributes: { path } }),
  );

export const readFileEffect = (path: string) =>
  pipe(
    Effect.tryPromise({
      try: () => readFile(path),
      catch: (e) => new FsError({ cause: e }),
    }),
    Effect.withSpan('read-file', { attributes: { path } }),
  );

export const readJsonEffect = <T>(path: string) =>
  pipe(
    Effect.tryPromise({
      try: () => readFile(path, { encoding: 'utf8' }),
      catch: (e) => new FsError({ cause: e }),
    }),
    Effect.map((data) => parse(data) as T),
    Effect.withSpan('read-json', { attributes: { path } }),
  );

type MaybeWithCode = { code?: string };

const hasCode = (error: unknown): error is Required<MaybeWithCode> => {
  return (error as MaybeWithCode)?.code !== undefined;
};

export const existsEffect = (path: string) =>
  pipe(
    Effect.tryPromise({
      try: () => stat(path),
      catch: (err) => {
        if (hasCode(err) && err.code === 'ENOENT') {
          return { _tag: 'enoent' as const };
        }

        return new FsError({ cause: err });
      },
    }),
    Effect.catchTag('enoent', () => Effect.succeed(false)),
    Effect.map(Boolean),
    Effect.withSpan('file-exists', { attributes: { path } }),
  );

export const writeFileEffect = (path: string, data: string) =>
  pipe(
    Effect.tryPromise({
      try: () => writeFile(path, data),
      catch: (e) => new FsError({ cause: e }),
    }),
    Effect.withSpan('write-file', { attributes: { path } }),
  );
