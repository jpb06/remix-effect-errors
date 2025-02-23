import type { FunctionComponent } from 'react';

import AkarIconsChatError from '~icons/akar-icons/chat-error';

import { Card } from '@components/design-system/card';
import { MotionContainer } from '@components/design-system/motion-container';

import type { ErrorsDetails } from '../../hooks/use-error-details';
import { noSourcemapWarningStyles } from './no-sourcemap-warning.styles';

type NoSourcemapWarningProps = Pick<ErrorsDetails, '_tag'>;

export const NoSourcemapWarning: FunctionComponent<NoSourcemapWarningProps> = ({
  _tag,
}) => {
  if (_tag !== 'effect-no-map-file') {
    return null;
  }

  const css = noSourcemapWarningStyles();

  return (
    <MotionContainer>
      <Card>
        <div className={css.title}>
          <AkarIconsChatError className={css.icon} />
          No sourcemap found for this build; unable to display sources.
        </div>
      </Card>
    </MotionContainer>
  );
};
