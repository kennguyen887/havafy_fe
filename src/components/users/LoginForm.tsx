import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Router from 'next/router';
import { useState } from 'react';
import React from 'react';

import { isValidEmail } from '@/lib/email';
import { setItem } from '@/lib/localStorage';
import { postApi } from '@/lib/request';

import Alert from '@/components/form/Alert';
import ButtonPrimary from '@/components/form/ButtonPrimary';
import TextInput from '@/components/form/TextInput';

import { useAuthState } from '@/contexts/AuthContext';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [alert, setAlert] = React.useState<string>();
  const { loadAuth } = useAuthState();
  const redirect = searchParams.get('redirect');

  const submitForm = async (e: { preventDefault: () => void }) => {
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
        if (redirect) {
          Router.push(redirect as string);
          return;
        }
        Router.push('/');
        return;
      }
    }
  };
  return (
    <div className='w-[360px]'>
      <div>
        <h1 className='mb-8 mt-1 text-center text-xl uppercase'>
          Login to your account
        </h1>
        <div className='items-center'>
          <div className=''>
            <form onSubmit={submitForm} noValidate>
              <Alert content={alert} hidden={!alert} />
              <div className='my-2'>
                <div className='my-1 text-sm font-semibold'>Email Address</div>
                <TextInput
                  name='Your email'
                  id='email'
                  type='email'
                  currentValue={(value) => setEmail(value)}
                  valueValidate={[
                    (value) => !isValidEmail(value),
                    'Your email is invalid',
                  ]}
                  className='mb-6'
                />
              </div>
              <div className='my-2'>
                <div className='my-1 text-sm font-semibold'>Password</div>
                <TextInput
                  name='Password'
                  id='password'
                  type='password'
                  currentValue={(value) => setPassword(value)}
                  valueValidate={[
                    (value) => value.length < 6,
                    'Password is invalid',
                  ]}
                  className='mb-3'
                />
              </div>
              <div className='text-right text-gray-400'>
                <Link
                  href='/user/forgotPassword'
                  className='text-sm text-gray-800 hover:text-red-700'
                >
                  Forgot password?
                </Link>
              </div>
              <div className='mt-7 flex items-center justify-center'>
                <ButtonPrimary className='w-full' name='Login' />
              </div>
            </form>
          </div>
          <div className='my-4 text-base'>
            Don't have an account?
            <Link
              href={{
                pathname: '/user/register',
                query: { redirect },
              }}
              className='ml-3 text-indigo-500'
            >
              Sign up
            </Link>
          </div>

          <div className='my-10 items-center text-center text-gray-400'>OR</div>

          <div>
            <GoogleLogin
              logo_alignment='center'
              width={360}
              onSuccess={async ({ credential }) => {
                try {
                  const data = await postApi('user/login/google', {
                    credential,
                  });
                  if (data && loadAuth) {
                    setItem('auth', data.token);
                    loadAuth();

                    if (redirect) {
                      Router.push({ pathname: redirect });
                      return;
                    }

                    Router.push('/');
                  }
                } catch (e) {
                  // eslint-disable-next-line no-console
                  console.log('Error on login', e);
                }
              }}
              onError={() => {
                // eslint-disable-next-line no-console
                console.log('Login Failed');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
