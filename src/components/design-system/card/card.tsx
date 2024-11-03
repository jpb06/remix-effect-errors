import { css, cx } from '@panda/css';
import type { FunctionComponent, PropsWithChildren } from 'react';

import type { PropsWithPandaStyles } from '@types';

import { MotionContainer } from '../motion-container/motion-container';
import { createStyles } from './card.styles';

type CardProps = PropsWithChildren<PropsWithPandaStyles>;

export const Card: FunctionComponent<CardProps> = ({ children, styles }) => {
  const { container, body } = createStyles();

  return (
    <MotionContainer className={cx(container, css(styles))}>
      <div className={body}>{children}</div>
    </MotionContainer>
  );
};
