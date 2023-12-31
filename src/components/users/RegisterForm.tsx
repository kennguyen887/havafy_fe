import { GoogleLogin } from '@react-oauth/google';
import clsx from 'clsx';
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
import PrimaryButton from '@/components/form/PrimaryButton';
import TextInput from '@/components/form/TextInput';

import { PasswordRules } from './Password';

export const RegisterInputForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [email, setEmail] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [alert, setAlert] = React.useState<string>();

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
        firstName,
        lastName,
        token,
      });
      if (data) {
        if (data.statusCode) {
          setAlert(data.message);
          return;
        }

        if (data.user && data.user.token) {
          setItem('auth', data.user.token);
          Router.push('/');
          return;
        }
      }

      // Do whatever you want with the token
    },
    [email, executeRecaptcha, firstName, lastName, password]
  );

  // onFinish={(values) => handleReCaptchaVerify(values)}

  return (
    <div>
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

        <div className='mb-7 grid grid-cols-2 gap-4'>
          <TextInput
            name='First name'
            id='firstName'
            currentValue={(value) => setFirstName(value)}
          />

          <TextInput
            name='Last name'
            id='lastName'
            currentValue={(value) => setLastName(value)}
          />
        </div>
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

        <div className='mt-7 flex items-center justify-center'>
          <PrimaryButton name='Sign Up' />
        </div>
      </form>

      <div
        className={clsx(
          !password || !validatePassword(password) ? '' : 'hidden'
        )}
      >
        <PasswordRules />
      </div>
    </div>
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

      <div className='inline-flex w-full items-center justify-center'>
        <hr className='mb-10 mt-12 h-px w-full border-0 bg-gray-200 dark:bg-gray-500' />
        <span className='absolute left-1/2 -translate-x-1/2 bg-white px-3 text-xs text-gray-400 dark:bg-gray-900 dark:text-white'>
          with email
        </span>
      </div>

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
          useOneTap
        />
      </div>
    </div>
  );
}
