import clsx from 'clsx';
import * as React from 'react';

interface Props {
  hidden?: boolean;
  content?: string;
}
export default function Alert({ hidden = false, content = '' }: Props) {
  return (
    <div
      className={clsx(
        hidden ? 'hidden' : '',
        'mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400'
      )}
      role='alert'
    >
      {content}
    </div>
  );
}
