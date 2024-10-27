import { Effect } from 'effect';

const isSet = (value: string | undefined): boolean =>
  value !== undefined && value !== 'undefined' && value !== '';

export const getBranch = Effect.sync(() => {
  const currentBranch = process.env.CURRENT_BRANCH;
  if (isSet(currentBranch)) {
    console.info('🗯️ CURRENT_BRANCH:', currentBranch);
    return currentBranch!;
  }

  const defaultBranch = process.env.DEFAULT_BRANCH;
  if (isSet(defaultBranch)) {
    console.info('🗯️ DEFAULT_BRANCH:', defaultBranch);
    return defaultBranch!;
  }

  return 'main';
});
