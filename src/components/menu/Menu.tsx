import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

import { defaultTransition } from '../../logic/default-transition.logic';

import { MenuItems } from './MenuItems';

export const Menu = () => (
  <motion.div
    className="navbar mb-10 w-auto rounded-xl bg-gradient-to-tr from-cyan-900 to-blue-800 md:w-full md:max-w-[40rem]"
    whileHover={{ scale: 1.011 }}
    transition={defaultTransition}
  >
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <Icon
            icon="heroicons-solid:menu-alt-1"
            className="h-8 w-8 text-white"
          />
        </div>
        <ul className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
          <MenuItems />
        </ul>
      </div>
      <a className="btn btn-ghost text-xl text-white" href="/">
        effect-errors
      </a>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <MenuItems />
      </ul>
    </div>
    <div className="navbar-end">
      <a href="https://github.com">
        <Icon icon="mdi:github" className="h-12 w-12 text-white" />
      </a>
    </div>
  </motion.div>
);
