/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
import { Select, Option } from '@material-tailwind/react';
import * as React from 'react';

export default function SelectInput({
  values,
  format,
  onBlur,
  validate,
  placeholder,
  className,
}: {
  values: string[];
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
    validate && setIsValid(validate(value));
    setInputValue(value);
  };

  return (
    <div className='rounded-md px-2 hover:bg-gray-100'>
      <Select label='' variant='standard'>
        {values.map((value: string, key) => (
          <Option key={key}>{value}</Option>
        ))}
      </Select>
      {/* <input
        placeholder={placeholder}
        defaultValue={values}
        value={inputValue}
        onBlur={() =>
          onBlur && onBlur(inputValue)
        }
        onChange={handleChange}
        className={clsx(
          'inline-block h-auto w-[300px] px-2 py-1',
          isValid ? '' : 'border border-red-200',
          className
        )}
      /> */}
    </div>
  );
}
