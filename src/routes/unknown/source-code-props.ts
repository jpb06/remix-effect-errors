import fs from 'fs-extra';

export const sourceCodeProps: [() => Promise<string>, number[]] = [
  () =>
    fs.readFile('src/examples/unknown-error.example.ts', {
      encoding: 'utf-8',
    }),
  [5],
];
