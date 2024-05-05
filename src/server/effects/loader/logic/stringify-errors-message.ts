interface WithMaybeMessage {
  message: { toString?: () => string };
}

export const stringifyErrorsMessage = (data: WithMaybeMessage[]) =>
  data.map((d) => ({
    ...d,
    message:
      d.message.toString !== undefined ? d.message.toString() : d.message,
  }));
