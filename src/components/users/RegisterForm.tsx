import { GoogleLogin } from '@react-oauth/google';
import Router from 'next/router';
import React, { useCallback, useState } from 'react';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';

import { isValidEmail } from '@/lib/email';
import { setItem } from '@/lib/localStorage';
import { post } from '@/lib/request';

import PrimaryButton from '@/components/form/PrimaryButton';
import TextInput from '@/components/form/TextInput';

export const RegisterInputForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [email, setEmail] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [message, setMessage] = useState<string>();
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

      const data = await post('user/register', {
        email,
        password,
        firstName,
        lastName,
        token,
      });
      if (data) {
        if (data.statusCode) {
          setMessage(data.message);
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
        <div className='mb-5 text-sm text-red-600'>{message}</div>
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

        <div className='grid grid-cols-2 gap-4'>
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
          valueValidate={[
            (value) => value.length < 6,
            'Your password must have at least 6 characters.',
          ]}
          currentValue={(value) => setPassword(value)}
        />

        <div className='mt-7 flex items-center justify-center'>
          <PrimaryButton name='Sign Up' />
        </div>
      </form>
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
      <div>
        <div className='my-8 text-center'>or sign up with</div>
        <GoogleLogin
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
    </div>
  );
}
