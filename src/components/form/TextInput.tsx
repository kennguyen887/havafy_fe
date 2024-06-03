import clsx from 'clsx';
import * as React from 'react';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  valueValidate?: [(value: string) => boolean, string] | undefined;
  currentValue?: (value: string) => void;
}
export default function TextInput({
  className,
  currentValue,
  defaultValue,
  name,
  placeholder,
  type = 'text',
  valueValidate = undefined,
  disabled = false,
  id,
}: Props) {
  const [value, setValue] = React.useState<string>();
  const [message, setMessage] = React.useState<string>();
  React.useEffect(() => {
    currentValue?.(value || '');
    if (value !== undefined && value?.length === 0) {
      setMessage(`${name} is required`);
      return;
    }
    if (value !== undefined && valueValidate?.[0](value || '')) {
      setMessage(valueValidate[1] || `${name} is invalid`);
      return;
    }
    setMessage('');
  }, [value, message, name, currentValue, valueValidate]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className='relative'>
      <input
        type={type}
        id={id}
        defaultValue={defaultValue}
        onChange={onChangeInput}
        disabled={disabled}
        className={clsx(
          className,
          disabled ? 'bg-gray-100' : '',
          'peer block w-full appearance-none border-2 border-gray-300 bg-gray-50 px-3 py-3 text-sm'
        )}
        placeholder={placeholder}
      />
      <div className='z-100 absolute top-7 mt-3 text-xs text-red-400'>
        {message}
      </div>
    </div>
  );
}
