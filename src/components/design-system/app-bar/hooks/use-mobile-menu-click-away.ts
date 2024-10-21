import { useEffect, useRef, useState } from 'react';

export const useMobileMenuClickAway = () => {
  const mobileMenuButtonRef = useRef<HTMLLabelElement>(null);
  const mobileMenuCheckboxRef = useRef<HTMLInputElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [mobileIconMenuState, setMobileIconMenuState] = useState<
    'open' | 'closed'
  >();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      setMobileIconMenuState(
        mobileMenuCheckboxRef.current?.checked === true ? 'open' : 'closed',
      );

      const menuButtonContainsTarget =
        mobileMenuButtonRef.current?.contains(event.target as HTMLElement) ??
        false;

      if (
        menuButtonContainsTarget === false &&
        mobileMenuCheckboxRef.current?.checked === true
      ) {
        mobileMenuCheckboxRef.current?.click();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return {
    mobileMenuButtonRef,
    mobileMenuCheckboxRef,
    mobileMenuRef,
    mobileIconMenuState,
  };
};
