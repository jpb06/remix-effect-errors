import type { FunctionComponent, PropsWithChildren } from 'react';

import { css, cx } from '@panda/css';

import { PropsWithStyles } from 'src/types/props-with-styles.type';
import { MotionContainer } from '../motion-container/MotionContainer';
import { createStyles } from './card.styles';

type CardProps = PropsWithChildren<PropsWithStyles>;

export const Card: FunctionComponent<CardProps> = ({ children, styles }) => {
  const { container, body } = createStyles();

  return (
    <MotionContainer className={cx(container, css(styles))}>
      <div className={body}>{children}</div>
    </MotionContainer>
  );
};
