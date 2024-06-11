import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export default function TextareaAbleEdit({
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
    <div className='rounded-md bg-gray-100 hover:bg-gray-200 '>
      <textarea
        defaultValue={value}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        onBlur={(e) => onBlur && onBlur(e.target.value)}
        className={twMerge(
          'mx-3 inline-block h-auto w-full bg-transparent px-0 py-1',
          className
        )}
      />
    </div>
  );
}
