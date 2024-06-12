import clsx from 'clsx';
import * as React from 'react';

export default function SelectInput({
  values,
  value,
  format,
  onBlur,
  validate,
  className,
}: {
  value: string;
  values: string[];
  placeholder: string;
  className?: string;
  format?: (value: string) => string;
  validate?: (value: string) => boolean;
  onBlur?: (value: string) => unknown;
}) {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [inputValue, setInputValue] = React.useState(value ?? '');
  const [isValid, setIsValid] = React.useState(true);

  const handleChange = (input: string) => {
    const value = format ? format(input) : input;
    validate && setIsValid(validate(value));
    setInputValue(value);
    onBlur && onBlur(value);
  };

  return (
    <div
      className={clsx(
        'my-0 rounded bg-gray-100  px-2 py-1 pr-3 ',

        isValid ? '' : 'border border-red-200',
        className
      )}
    >
      <select
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className='bg-transparent text-sm'
      >
        {values.map((value: string, key) => (
          <option key={key}>{value}</option>
        ))}
      </select>
    </div>
  );
}
