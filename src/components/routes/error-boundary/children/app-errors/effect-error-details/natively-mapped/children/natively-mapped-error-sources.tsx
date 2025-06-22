import type { ErrorData } from 'effect-errors';
import type { FunctionComponent } from 'react';

import { CodeFromNativelyMappedEffectError } from '@components/design-system/code';
import { Box } from '@panda/jsx';

import { effectErrorDetailsStyles } from '../../common-children';

type NativelyMappedErrorSourcesProps = {
  tag: 'effect-natively-mapped-errors' | 'effect-no-map-file';
  error: ErrorData;
};

export const NativelyMappedErrorSources: FunctionComponent<
  NativelyMappedErrorSourcesProps
> = ({ tag, error }) => {
  if (tag !== 'effect-natively-mapped-errors') {
    return null;
  }

  const css = effectErrorDetailsStyles();

  return (
    <Box className={css.sourcesBorder}>
      <Box className={css.sources}>
        <span className={css.sourcesTitle}>Error related code</span>
        {error.sources?.map((source, index) => (
          <CodeFromNativelyMappedEffectError
            // biome-ignore lint/suspicious/noArrayIndexKey: no id
            key={index}
            {...source}
          />
        ))}
      </Box>
    </Box>
  );
};
