import { Icon } from '@iconify/react';

import { MotionContainer } from '../motion-container/MotionContainer';

import {
  errorTypesMenuItems,
  MenuItem,
  useCasesMenuItems,
} from './children/MenuItems';

export const Menu = () => (
  <MotionContainer className="navbar mb-10 w-auto rounded-xl bg-gradient-to-tr from-cyan-900 to-blue-800 md:w-full md:max-w-[52rem]">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <Icon
            icon="heroicons-solid:menu-alt-1"
            className="h-8 w-8 text-white"
          />
        </div>
        <ul className="menu dropdown-content menu-sm z-[1] -ml-2 mt-3 w-[282px] rounded-box bg-base-100 bg-gradient-to-tl from-cyan-950 to-sky-900 p-2 shadow">
          {[...errorTypesMenuItems, ...useCasesMenuItems].map((item) => (
            <MenuItem key={item.href} {...item} />
          ))}
        </ul>
      </div>
      <a className="btn btn-ghost text-xl text-white" href="/">
        effect-errors
      </a>
    </div>
    <div className="navbar-center hidden flex-col lg:flex">
      <ul className="menu menu-horizontal px-1 py-0">
        {errorTypesMenuItems.map((item) => (
          <MenuItem key={item.href} {...item} />
        ))}
      </ul>
      <ul className="menu menu-horizontal px-1 py-0">
        {useCasesMenuItems.map((item) => (
          <MenuItem key={item.href} {...item} />
        ))}
      </ul>
    </div>
    <div className="navbar-end">
      <a href="https://github.com/jpb06/remix-effect-errors">
        <Icon icon="mdi:github" className="h-12 w-12 text-white" />
      </a>
    </div>
  </MotionContainer>
);
