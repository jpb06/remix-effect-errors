import type { ErrorSpan } from 'effect-errors';

export const useErrorData = (spans: ErrorSpan[] | undefined) => {
  const reversedSpans = [...(spans ?? [])]?.reverse();
  const start =
    reversedSpans.length === 0 ? 0n : reversedSpans.at(0)!.startTime;

  const allSpansHaveDuration =
    spans?.every((s) => s.durationInMilliseconds !== undefined) ?? false;
  const max = spans?.reduce(
    (prev, curr) =>
      curr.durationInMilliseconds && curr.durationInMilliseconds > prev
        ? curr.durationInMilliseconds
        : prev,
    0,
  );

  return {
    hasInvalidTimeline: allSpansHaveDuration === false || max === undefined,
    reversedSpans,
    max: max!,
    start,
  };
};
