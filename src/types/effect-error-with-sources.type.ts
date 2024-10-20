import type { CapturedErrors } from 'effect-errors';
import type { MappedPosition } from 'source-map-js';

export type EffectSource = Omit<MappedPosition, 'source'> & {
  fileSources: string;
  filePath: string;
};

export type EffectErrorWithSources = Omit<
  CapturedErrors['errors'][number],
  'sources' | 'location'
> & {
  sources: EffectSource[];
};
