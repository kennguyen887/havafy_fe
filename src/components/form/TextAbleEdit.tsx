import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export default function TextAbleEdit({
  value,
  format,
  onBlur,
  validate,
  placeholder,
  className,
}: {
  value: string;
  placeholder: string;
  className: string;
  format?: (value: string) => string;
  validate?: (value: string) => boolean;
  onBlur?: (value: string) => unknown;
}) {
  const [inputValue, setInputValue] = React.useState('');
  const [isValid, setIsValid] = React.useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = format ? format(e.target.value) : e.target.value;
    setInputValue(value);
  };

  const handlelBlur = () => {
    onBlur && onBlur(inputValue);
    validate && setIsValid(validate(inputValue));
  };
  return (
    <div className='rounded-md bg-gray-100 hover:bg-gray-200'>
      <input
        placeholder={placeholder}
        defaultValue={value}
        value={inputValue}
        onBlur={handlelBlur}
        onChange={handleChange}
        className={twMerge(
          'inline-block h-auto w-[150px] px-2 py-1 text-sm',
          isValid ? '' : 'rounded-md border border-red-200',
          className
        )}
      />
    </div>
  );
}
