import { Link } from '@remix-run/react';
import type { RefObject } from 'react';

type MenuItemProps = {
  href: string;
  label: string;
  mobileMenuRef?: RefObject<HTMLUListElement>;
};

export const errorTypesMenuItems: MenuItemProps[] = [
  { href: '/tagged-error', label: 'Tagged' },
  { href: '/tagged-error-with-ctor', label: 'Tagged ctor' },
  { href: '/plain-object', label: 'Plain object' },
  { href: '/unknown', label: 'Unknown' },
  { href: '/node', label: 'Node' },
];

export const useCasesMenuItems: MenuItemProps[] = [
  { href: '/promise', label: 'Promise' },
  { href: '/parallel', label: 'Parallel' },
];

export const MenuItem = ({ href, label, mobileMenuRef }: MenuItemProps) => (
  <li className="z-50">
    <Link
      to={href}
      className="py-4 md:px-2 md:py-1"
      onClick={() => {
        mobileMenuRef?.current?.focus();
        mobileMenuRef?.current?.blur();
      }}
    >
      {label}
    </Link>
  </li>
);
