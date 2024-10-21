import { HttpClient } from '@effect/platform';
import { Effect, pipe } from 'effect';

export const downloadFile = (url: string) =>
  pipe(
    HttpClient.HttpClient,
    Effect.flatMap((client) => client.get(url)),
    Effect.flatMap((response) => response.text),
    Effect.withSpan('download-file'),
  );
