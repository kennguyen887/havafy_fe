import clsx from 'clsx';
import * as React from 'react';

export default function SelectInput({
  values,
  format,
  onBlur,
  validate,
  className,
}: {
  values: string[];
  placeholder: string;
  className?: string;
  format?: (value: string) => string;
  validate?: (value: string) => boolean;
  onBlur?: (value: string) => unknown;
}) {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [inputValue, setInputValue] = React.useState('');
  const [isValid, setIsValid] = React.useState(true);

  const handleChange = (input: string) => {
    const value = format ? format(input) : input;
    validate && setIsValid(validate(value));
    setInputValue(value);
    onBlur && onBlur(value);
  };

  return (
    <div className={clsx(isValid ? '' : 'border border-red-200', className)}>
      <select
        onChange={(e) => handleChange(e.target.value)}
        className='my-0 bg-transparent py-0'
      >
        {values.map((value: string, key) => (
          <option key={key}>{value}</option>
        ))}
      </select>
    </div>
  );
}
