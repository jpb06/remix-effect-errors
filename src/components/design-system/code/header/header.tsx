import type { FunctionComponent } from 'react';
import { headerStyles } from './header.styles';
import { WindowControlMockup } from './window-control-mockup';

type HeaderProps = {
  title: string;
};

export const Header: FunctionComponent<HeaderProps> = ({ title }) => {
  const css = headerStyles();

  return (
    <div className={css.root}>
      <WindowControlMockup color="red" />
      <WindowControlMockup color="yellow" />
      <WindowControlMockup color="green" />
      <div className={css.title}>{title}</div>
    </div>
  );
};
