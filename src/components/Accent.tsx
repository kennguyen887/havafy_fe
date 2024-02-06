import clsx from 'clsx';
import * as React from 'react';

type AccentType = React.ComponentPropsWithoutRef<'span'>;

export default function Accent({ children, className }: AccentType) {
  return (
    <span
      className={clsx(
        className,
        'inline-block bg-gradient-to-r from-gray-900 via-red-900 to-pink-500 bg-clip-text text-transparent',
        'from-primary-300/40 via-primary-300/40 to-primary-400/40 text-gray-800'
      )}
    >
      {children}
    </span>
  );
}
