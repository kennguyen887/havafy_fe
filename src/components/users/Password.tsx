import Router from 'next/router';
import React from 'react';

import { validatePassword } from '@/lib/password';
import { putApi } from '@/lib/request';

import Alert from '@/components/form/Alert';
import TextInput from '@/components/form/TextInput';

export default function Password() {
  const [password, setPassword] = React.useState<string>();
  const [rePassword, setRePassword] = React.useState<string>();
  const [alert, setAlert] = React.useState<string>();

  const submitForm = React.useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      setAlert(undefined);
      if (rePassword !== password) {
        return;
      }

      if (!password || !validatePassword(password)) {
        return;
      }

      const { data } = await putApi('user', { password });
      if (data.statusCode) {
        setAlert(data.message);
        return;
      }
      Router.push('/user/password');
    },
    [password, rePassword]
  );
  return (
    <>
      <form onSubmit={submitForm} noValidate className='max-w-md '>
        <div
          className='mb-6 mt-2 flex rounded-lg bg-blue-50 p-4 text-xs text-gray-800 dark:bg-gray-800 dark:text-white'
          role='alert'
        >
          <svg
            className='me-3 inline h-4 w-4 flex-shrink-0'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
          </svg>
          <span className='sr-only'>Password rules</span>
          <div>
            <span className='font-medium'>Password requirements:</span>
            <ul className='mt-1.5 list-inside list-disc'>
              <li>At least 8 characters (and up to 100 characters)</li>
              <li>At least one uppercase character</li>
            </ul>
          </div>
        </div>
        <Alert content={alert} hidden={!alert} />
        <div className='group relative z-0 mb-5 w-full'>
          <TextInput
            name='Your password'
            id='password'
            type='password'
            currentValue={(value) => setPassword(value)}
            valueValidate={[
              (value) => !validatePassword(value),
              'Your password not match rules',
            ]}
            className='mb-7'
          />
        </div>
        <div className='group relative z-0 mb-5 w-full'>
          <TextInput
            name='Repeat password'
            id='repeatPassword'
            type='password'
            currentValue={(value) => setRePassword(value)}
            valueValidate={[
              (value) => value !== password,
              'Your password is not same.',
            ]}
            className='mb-7'
          />
        </div>
        <button
          type='submit'
          className='rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold leading-5 text-white hover:bg-sky-700'
        >
          Change password
        </button>
      </form>
    </>
  );
}
