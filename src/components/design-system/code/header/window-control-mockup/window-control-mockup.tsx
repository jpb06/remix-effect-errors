import { Box } from '@panda/jsx';
import { FunctionComponent } from 'react';
import {
  WindowControlMockupColor,
  windowControlMockupStyles,
} from './window-control-mockup.styles';

type WindowControlMockupProps = {
  color: WindowControlMockupColor;
};

export const WindowControlMockup: FunctionComponent<
  WindowControlMockupProps
> = ({ color }) => {
  const css = windowControlMockupStyles({ color });

  return <Box className={css.root} />;
};
