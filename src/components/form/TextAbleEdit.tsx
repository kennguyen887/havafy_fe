import clsx from 'clsx';
import * as React from 'react';

export default function TextAbleEdit({
  value,
  onChange,
  onBlur,
  placeholder,
  className,
}: {
  value: string;
  placeholder: string;
  className: string;
  onChange?: (value: string) => unknown;
  onBlur?: (value: string) => unknown;
}) {
  return (
    <div className='rounded-md hover:bg-gray-100'>
      <input
        placeholder={placeholder}
        defaultValue={value}
        onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
          onBlur && onBlur(e.target.value)
        }
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange && onChange(e.target.value)
        }
        className={clsx('inline-block h-auto w-[300px] px-2 py-1', className)}
      />
    </div>
  );
}