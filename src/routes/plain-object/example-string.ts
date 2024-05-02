export const exampleString = `import { Effect } from 'effect';

const readUser = Effect.withSpan('read-user')(
  Effect.fail({ _tag: 'BigBadError', message: 'Oh no!' }),
);

export const plainObjectErrorTask = Effect.withSpan('plain-object-error-task')(
  readUser,
);`;
