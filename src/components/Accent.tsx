import clsx from 'clsx';
import * as React from 'react';

type AccentType = React.ComponentPropsWithoutRef<'span'>;

export default function Accent({ children, className }: AccentType) {
  return (
    <span
      className={clsx(
        className,
        'inline-block from-gray-600 to-red-900',
        'text-3xl text-gray-800'
      )}
    >
      {children}
    </span>
  );
}
