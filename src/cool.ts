import { runPromise } from 'effect-errors';

import { parallelTask } from './examples/parallel.example';

(async () => {
  runPromise(parallelTask);
})();
