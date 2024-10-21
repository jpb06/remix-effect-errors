import { Effect } from 'effect';

const isSet = (value: string | undefined): boolean =>
  value !== undefined && value !== 'undefined' && value !== '';

export const getBranch = Effect.sync(() => {
  const headRef = process.env.GITHUB_HEAD_REF;
  if (isSet(headRef)) {
    return headRef!;
  }

  const refName = process.env.GITHUB_REF_NAME;
  if (isSet(refName)) {
    return refName!;
  }

  console.warn(`🗯️ GITHUB_HEAD_REF: '${headRef}'`);
  console.warn(`🗯️ GITHUB_REF_NAME: '${refName}'`);

  return 'main';
});
