import fs from 'fs-extra';

export const sourceCodeProps: [() => Promise<string>, number[]] = [
  () =>
    fs.readFile('src/examples/plain-object.example.ts', {
      encoding: 'utf-8',
    }),
  [4],
];
