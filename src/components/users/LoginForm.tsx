import { GoogleLogin } from '@react-oauth/google';
import Router from 'next/router';
import { useCallback, useState } from 'react';
import React from 'react';

import { isValidEmail } from '@/lib/email';
import { setItem } from '@/lib/localStorage';
import { postApi } from '@/lib/request';

import Alert from '@/components/form/Alert';
import PrimaryButton from '@/components/form/PrimaryButton';
import TextInput from '@/components/form/TextInput';

import { useAuthState } from '@/contexts/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [alert, setAlert] = React.useState<string>();
  const { loadAuth } = useAuthState();

  const submitForm = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();

      const data = await postApi('user/login', {
        email,
        password,
      });
      if (data) {
        if (data.statusCode) {
          setAlert(data.message);
          return;
        }

        if (data.token) {
          setItem('auth', data.token);
          if (loadAuth) {
            loadAuth();
          }

          Router.push('/');
          return;
        }
      }
    },
    [email, loadAuth, password]
  );
  return (
    <div>
      <div className='items-center'>
        <div>
          <GoogleLogin
            logo_alignment='center'
            onSuccess={(credentialResponse) => {
              // eslint-disable-next-line no-console
              console.log(credentialResponse);
            }}
            onError={() => {
              // eslint-disable-next-line no-console
              console.log('Login Failed');
            }}
          />
        </div>
        <div className='inline-flex w-full items-center justify-center'>
          <hr className='my-12 h-px w-full border-0 bg-gray-200 dark:bg-gray-500' />
          <span className='absolute left-1/2 -translate-x-1/2 bg-white px-3 text-sm text-gray-400 dark:bg-gray-900 dark:text-white'>
            Or log in with email
          </span>
        </div>

        <div className=''>
          <form onSubmit={submitForm} noValidate>
            <Alert content={alert} hidden={!alert} />
            <TextInput
              name='Your email'
              id='email'
              type='email'
              currentValue={(value) => setEmail(value)}
              valueValidate={[
                (value) => !isValidEmail(value),
                'Your email is invalid',
              ]}
              className='mb-7'
            />
            <TextInput
              name='Password'
              id='password'
              type='password'
              currentValue={(value) => setPassword(value)}
              valueValidate={[
                (value) => value.length < 6,
                'Password is invalid',
              ]}
              className='mb-7'
            />
            <div className='mt-7 flex items-center justify-center'>
              <PrimaryButton name='Login' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
