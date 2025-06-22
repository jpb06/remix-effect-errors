import { useNavigation } from '@remix-run/react';
import type { FunctionComponent } from 'react';

import { Box } from '@panda/jsx';

import { globalLoadingStyles } from './global-loading.styles';
import { useAnimationCompleted } from './hooks';
import { getProgressState } from './util';

export const GlobalLoading: FunctionComponent = () => {
  const navigation = useNavigation();
  const isActive = navigation.state !== 'idle';

  const { animationComplete, ref } = useAnimationCompleted(isActive);
  const state = getProgressState(navigation, animationComplete);

  const css = globalLoadingStyles({ state });

  return (
    <Box
      role="progressbar"
      aria-hidden={!isActive}
      aria-valuetext={isActive ? 'Loading' : undefined}
      className={css.root}
    >
      <Box ref={ref} className={css.progressBar} />
    </Box>
  );
};
