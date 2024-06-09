import clsx from 'clsx';
import * as React from 'react';

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
    <div className='rounded-md hover:bg-gray-100'>
      <textarea
        defaultValue={value}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        onBlur={(e) => onBlur && onBlur(e.target.value)}
        className={clsx(
          'inline-block h-auto w-full bg-transparent px-2 py-1',
          className
        )}
      />
    </div>
  );
}
