import { Effect } from 'effect';

import { effectLoader } from '../server/effects/loader/effect-loader';

export const loader = effectLoader(({ request }) =>
  Effect.withSpan('my-route-loader', {
    attributes: {
      url: request.url,
      method: request.method,
      body: request.body,
    },
  })(
    Effect.gen(function* () {
      // My effect code ...
    }),
  ),
);
