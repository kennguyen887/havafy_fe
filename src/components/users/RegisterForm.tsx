import { GoogleLogin } from '@react-oauth/google';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Router from 'next/router';
import React, { useCallback, useState } from 'react';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';

import { isValidEmail } from '@/lib/email';
import { setItem } from '@/lib/localStorage';
import { validatePassword } from '@/lib/password';
import { postApi } from '@/lib/request';

import Alert from '@/components/form/Alert';
import ButtonPrimary from '@/components/form/ButtonPrimary';
import TextInput from '@/components/form/TextInput';

import { useAuthState } from '@/contexts/AuthContext';

export const RegisterInputForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [alert, setAlert] = React.useState<string>();
  const searchParams = useSearchParams();
  const { loadAuth } = useAuthState();
  const redirect = searchParams.get('redirect');
  const submitForm = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (!email || !password) {
        return;
      }
      if (!executeRecaptcha) {
        return;
      }
      const token = await executeRecaptcha();

      const data = await postApi('user/register', {
        email,
        password,
        token,
      });
      if (data) {
        if (data.statusCode) {
          setAlert(data.message);
          return;
        }

        if (data.user && data.user.token) {
          setItem('auth', data.user.token);
          if (redirect) {
            Router.push(redirect as string);
            return;
          }
          Router.push('/');
          return;
        }
      }

      // Do whatever you want with the token
    },
    [email, executeRecaptcha, password, redirect]
  );

  // onFinish={(values) => handleReCaptchaVerify(values)}

  return (
    <>
      <div className='w-[360px]'>
        <h1 className='mb-8 mt-1 text-center text-xl uppercase'>
          Sign up to Havafy
        </h1>

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
              className='mb-5'
            />
          </div>

          <div className='my-2'>
            <div className='my-1 text-sm font-semibold'>Password</div>
            <TextInput
              name='Password'
              id='password'
              type='password'
              valueValidate={[
                (value) => !validatePassword(value),
                'Your password is invalid.',
              ]}
              currentValue={(value) => setPassword(value)}
            />
          </div>
          <div className='mt-7 flex items-center justify-center'>
            <ButtonPrimary className='w-full' name='Sign Up' />
          </div>
        </form>

        <div className='my-4 text-base'>
          Already have an account?
          <Link
            href={{
              pathname: '/user/login',
              query: { redirect },
            }}
            className='ml-3 text-indigo-500'
          >
            Log in
          </Link>
        </div>
        <div
          className={clsx(
            !password || !validatePassword(password) ? '' : 'hidden'
          )}
        ></div>
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
              console.log('Error on register', e);
            }
          }}
          onError={() => {
            // eslint-disable-next-line no-console
            console.log('register failed');
          }}
        />
      </div>
    </>
  );
};

export default function RegisterForm() {
  return (
    <div className='items-center'>
      <div>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTHA_SITE_KEY || ''}
          scriptProps={{
            async: false,
            defer: true,
            appendTo: 'body',
            nonce: undefined,
          }}
        >
          <RegisterInputForm />
        </GoogleReCaptchaProvider>
      </div>
    </div>
  );
}
