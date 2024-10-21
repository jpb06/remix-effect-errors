import { Effect, pipe } from 'effect';
import { FileStorageLayer } from 'effect-cloudflare-r2-layer';

import type { Buckets } from './buckets.constant';

export const ensureBucket = pipe(
  FileStorageLayer.bucketInfos<Buckets>({
    Bucket: 'remix-effect-errors',
  }),
  Effect.catchTag('bucket-not-found-error', () =>
    FileStorageLayer.createBucket({
      Bucket: 'remix-effect-errors',
      CreateBucketConfiguration: {
        Bucket: {
          Type: 'Directory',
          DataRedundancy: 'SingleAvailabilityZone',
        },
      },
    }),
  ),
  Effect.withSpan('ensure-bucket'),
);
