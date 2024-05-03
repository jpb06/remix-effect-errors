export type TDataOrError<A> =
  | A
  | {
      type: unknown;
      message: unknown;
      stack: string | undefined;
      spans:
        | {
            name: string;
            attributes: Record<string, unknown>;
            duration: number | undefined;
          }[]
        | undefined;
    }[];
