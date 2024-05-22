export type EffectError = {
  type: unknown;
  message: unknown;
  stack: string[] | undefined;
  effectStack: string[] | undefined;
  spans:
    | {
        name: string;
        attributes: Record<string, unknown>;
        duration: number | undefined;
      }[]
    | undefined;
}[];

export interface EffectLoaderSuccess<A> {
  _tag: 'success';
  data: A;
}

export interface EffectLoaderError {
  _tag: 'error';
  data: EffectError;
}
