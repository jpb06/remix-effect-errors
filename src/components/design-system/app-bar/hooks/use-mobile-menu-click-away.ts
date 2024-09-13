import { useEffect, useRef, useState } from 'react';

export const useMobileMenuClickAway = () => {
  const mobileMenuButtonRef = useRef<HTMLLabelElement>(null);
  const mobileMenuCheckboxRef = useRef<HTMLInputElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [mobileMenuState, setMobileMenuState] = useState<'open' | 'closed'>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      setMobileMenuState(
        mobileMenuCheckboxRef.current?.checked === true ? 'open' : 'closed',
      );

      if (
        !mobileMenuRef.current?.contains(event.target as HTMLElement) &&
        !mobileMenuButtonRef.current?.contains(event.target as HTMLElement) &&
        mobileMenuCheckboxRef.current?.checked === true
      ) {
        mobileMenuCheckboxRef.current?.click();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mobileMenuRef]);

  return {
    mobileMenuButtonRef,
    mobileMenuCheckboxRef,
    mobileMenuRef,
    mobileMenuState,
  };
};
