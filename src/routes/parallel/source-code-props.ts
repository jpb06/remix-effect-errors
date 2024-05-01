import fs from 'fs-extra';

export const sourceCodeProps: [() => Promise<string>, number[]] = [
  () =>
    fs.readFile('src/examples/parallel.example.ts', {
      encoding: 'utf-8',
    }),
  [17],
];
