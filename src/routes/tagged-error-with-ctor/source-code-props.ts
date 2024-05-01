import fs from 'fs-extra';

export const sourceCodeProps: [() => Promise<string>, number[]] = [
  () =>
    fs.readFile('src/examples/tagged-error-with-ctor.example.ts', {
      encoding: 'utf-8',
    }),
  [19],
];
