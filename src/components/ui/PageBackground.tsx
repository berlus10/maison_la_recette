import type { ReactNode } from 'react';

export function PageBackground({
  src,
  children,
}: {
  src: string;
  children: ReactNode;
}) {
  return (
    <div
      className="relative"
      style={{
        backgroundImage: `url("${src}")`,
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
      }}
    >
      {children}
    </div>
  );
}
