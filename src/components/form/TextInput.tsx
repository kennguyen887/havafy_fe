
import React, {useState, ChangeEvent} from 'react';

interface Props {
  name: string; 
}

const TextInput: React.FC<Props> = ({name}) => {

  const [value, setValue] = useState('');

  console.log('render', value); // log renders

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <div>
      <input 
        type="text" 
        value={value}
        onChange={onChangeInput}  
      />

      <div>Value: {value}</div> 
    </div>
  );

}

export default TextInput;
/*
import clsx from 'clsx';
import * as React from 'react';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  currentValue?: (value: string) => void; 
}
export default function TextInput({
  className,
  currentValue,
  name,
  type = 'text',
  id,
  ...rest
}: Props) {
  const [value, setValue] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>();
  React.useEffect(() => {
    if (value?.length || value === undefined) {
      setMessage('')
    }else{
      setMessage(`${name} is required`)
    }
    currentValue?.(value || '')
  }, [value, message, name, currentValue]);

  const onChangeInput = (e:  React.ChangeEvent<HTMLInputElement>) => {
    console.log('22222')
    setValue(e.target.value)
  }
  return (
    <div className='relative'>
     message: {message}  
     |    value: {value}
      <input
        type={type}
        id={id}
  
        onChange={onChangeInput}
        className={clsx(
          className,
          'peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500',
        )}
        placeholder={' '}
        {...rest}
      />
      {message && <div className='absolute left-1.5 mt-8 top-12 z-16 text-sm text-red-600'>{message}</div> }

      <label
        htmlFor={id}
        className='absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500'
      >
        {name}
      </label>

    </div>
  );
}

*/
