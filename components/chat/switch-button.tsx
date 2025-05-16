'use client';

import type { FC, PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

import { Button } from '~/components/ui/button';

interface SwitchButtonProps extends PropsWithChildren {
  icon: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SwitchButton: FC<SwitchButtonProps> = ({ icon, checked, onChange, children, ...props }) => {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');

    mql.addEventListener('change', () => setIsDesktop(mql.matches));
  }, []);

  return (
    <Button
      {...props}
      variant={checked ? 'default' : 'outline'}
      size={isDesktop ? 'default' : 'icon'}
      className="rounded-full"
      onClick={() => onChange(!checked)}
    >
      {icon}
      {isDesktop && children}
    </Button>
  );
};

export default SwitchButton;
