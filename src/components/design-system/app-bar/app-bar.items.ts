type MenuItemProps = {
  href: string;
  label: string;
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
