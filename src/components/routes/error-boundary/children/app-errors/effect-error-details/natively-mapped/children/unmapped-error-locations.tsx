import type { ErrorData } from 'effect-errors';
import type { FunctionComponent } from 'react';

import { Stacktrace } from '@components/design-system/stacktrace';
import { Box } from '@panda/jsx';

import { effectErrorDetailsStyles } from '../../common-children';

type UnmappedErrorLocationsProps = {
  tag: 'effect-natively-mapped-errors' | 'effect-no-map-file';
  error: ErrorData;
};

export const UnmappedErrorLocations: FunctionComponent<
  UnmappedErrorLocationsProps
> = ({ tag, error }) => {
  if (tag !== 'effect-no-map-file') {
    return null;
  }

  const css = effectErrorDetailsStyles();

  return (
    <Box className={css.sourcesBorder}>
      <Box className={css.sources}>
        <span className={css.sourcesTitle}>Stacktrace</span>
        <Stacktrace stack={error.stack} />
      </Box>
    </Box>
  );
};
