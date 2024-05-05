import { Effect } from 'effect';
import fs from 'fs-extra';

import { FileError } from './errors/file-error';

export const readFile = (path: string) =>
  Effect.tryPromise({
    try: () => fs.readFile(path, { encoding: 'utf-8' }),
    catch: (e) => new FileError({ cause: e }),
  });
