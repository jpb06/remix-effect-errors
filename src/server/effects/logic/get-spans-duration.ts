import { ErrorSpan } from 'effect-errors';

export const getSpansDuration = (spans: ErrorSpan[] | undefined) =>
  spans?.map(({ name, attributes, status }) => {
    const duration =
      status._tag === 'Ended'
        ? Number(BigInt(status.endTime - status.startTime) / BigInt(1000000))
        : undefined;

    return {
      name,
      attributes: Object.fromEntries(attributes),
      duration,
    };
  });
