import type { FunctionComponent } from 'react';

import { Box } from '@panda/jsx';

import type { WindowControlMockupColor } from './window-control-mockup.styles';
import { windowControlMockupStyles } from './window-control-mockup.styles';

type WindowControlMockupProps = {
  color: WindowControlMockupColor;
};

export const WindowControlMockup: FunctionComponent<
  WindowControlMockupProps
> = ({ color }) => {
  const css = windowControlMockupStyles({ color });

  return <Box className={css.root} />;
};
