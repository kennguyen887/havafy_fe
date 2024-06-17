import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export default function TextareaAbleEdit({
  value,
  onBlur,
  format,
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
  const [inputValue, setInputValue] = React.useState(value ?? '');
  const [isValid, setIsValid] = React.useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = format ? format(e.target.value) : e.target.value;
    setInputValue(value);
  };

  const handlelBlur = () => {
    onBlur && onBlur(inputValue);
    validate && setIsValid(validate(inputValue));
  };
  return (
    <div
      className={twMerge(
        'rounded-md bg-gray-100 hover:bg-gray-200 ',
        isValid ? '' : 'rounded-md border border-red-200'
      )}
    >
      <textarea
        value={inputValue}
        placeholder={placeholder}
        onBlur={handlelBlur}
        onChange={handleChange}
        className={twMerge(
          'mx-3 inline-block h-auto w-full bg-transparent px-0 py-1',

          className
        )}
      />
    </div>
  );
}
