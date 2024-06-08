import clsx from 'clsx';
import * as React from 'react';

export default function TextAbleEdit({
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
      <input
        defaultValue={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        className={clsx('inline-block h-auto w-[300px] px-2 py-1', className)}
      />
    </div>
  );
}
