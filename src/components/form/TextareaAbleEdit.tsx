import clsx from 'clsx';
import * as React from 'react';

export default function TextareaAbleEdit({
  value,
  onChange,
  className,
}: {
  value: string;
  className: string;
  onChange: (value: string) => unknown;
}) {
  return (
    <div className='rounded-md hover:bg-gray-100'>
      <textarea
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          'inline-block h-auto w-full bg-transparent px-2 py-1',
          className
        )}
      />
    </div>
  );
}
