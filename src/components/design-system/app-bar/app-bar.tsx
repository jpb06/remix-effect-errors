import { Link } from '@remix-run/react';
import { Match } from 'effect';
import { AnimatePresence } from 'framer-motion';
import type { FunctionComponent } from 'react';

import { AppBarLink } from '@components/design-system/app-bar-link';
import { cx } from '@panda/css';
import { Box } from '@panda/jsx';

import { MotionContainer } from '../motion-container';
import { errorTypesMenuItems, useCasesMenuItems } from './app-bar.items';
import { appBarStyles } from './app-bar.styles';
import { useMobileMenuClickAway } from './hooks/use-mobile-menu-click-away';
import { MobileMenuIcon } from './mobile-menu-icon/mobile-menu-icon';

import JamGithub from '~icons/jam/github';
import MiMenu from '~icons/mi/menu';
import SystemUiconsMidpoint from '~icons/system-uicons/midpoint';

export const AppBar: FunctionComponent = () => {
  const css = appBarStyles();

  const {
    mobileMenuButtonRef,
    mobileMenuCheckboxRef,
    mobileMenuRef,
    mobileIconMenuState,
  } = useMobileMenuClickAway();

  return (
    <MotionContainer className={css.container}>
      <Box className={css.mobileMenu}>
        <input
          id="mobile-menu"
          type="checkbox"
          className={cx('peer', css.mobileMenuInput)}
          ref={mobileMenuCheckboxRef}
        />
        <label
          htmlFor="mobile-menu"
          className={css.mobileMenuIcon}
          ref={mobileMenuButtonRef}
        >
          <AnimatePresence mode="wait" initial={false}>
            {Match.value(mobileIconMenuState).pipe(
              Match.when('open', () => (
                <MobileMenuIcon rotate={180}>
                  <SystemUiconsMidpoint className={css.icon} />
                </MobileMenuIcon>
              )),
              Match.orElse(() => (
                <MobileMenuIcon rotate={-180}>
                  <MiMenu className={css.icon} />
                </MobileMenuIcon>
              )),
            )}
          </AnimatePresence>
        </label>
        <Box className={css.mobileMenuItems} ref={mobileMenuRef}>
          {[...errorTypesMenuItems, ...useCasesMenuItems].map(
            ({ href, label }) => (
              <AppBarLink key={href} to={href} size="wide">
                {label}
              </AppBarLink>
            ),
          )}
        </Box>
        <Box className={css.navbarStart}>
          <AppBarLink to="/" size="wide">
            effect-errors
          </AppBarLink>
        </Box>
      </Box>
      <div className={css.desktopMenuItems}>
        <div>
          {errorTypesMenuItems.map(({ href, label }) => (
            <AppBarLink key={href} to={href} size="narrow">
              {label}
            </AppBarLink>
          ))}
        </div>
        <div>
          {useCasesMenuItems.map(({ href, label }) => (
            <AppBarLink key={href} to={href} size="narrow">
              {label}
            </AppBarLink>
          ))}
        </div>
      </div>
      <Box className={css.navbarEnd}>
        <Link to="https://github.com/jpb06/remix-effect-errors">
          <JamGithub className={css.icon} />
        </Link>
      </Box>
    </MotionContainer>
  );
};
