import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';

import { post } from '@/lib/request';

import PrimaryButton from '@/components/form/PrimaryButton';
import TextInput from '@/components/form/TextInput';

export const RegisterInputForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [email, setEmail] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [password, setPassword] = useState<string>();


  const router = useRouter();

  // Create an event handler so you can call the verification on button click event or form submit
  const submitForm = useCallback(
    async () => {

      if (!executeRecaptcha) {
        return;
      }

      const token = await executeRecaptcha();

      const res = await post('user/register', {
        email,
        password,
        firstName,
        lastName,
        token,
      });
      if (res.statusCode === 400) {
        return;
      }
      if (res.statusCode) {
        router.push('/');
      }
      // Do whatever you want with the token
    },
    [email, executeRecaptcha, firstName, lastName, password, router]
  );

  // onFinish={(values) => handleReCaptchaVerify(values)}

  return (


    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        submitForm()
      }} noValidate>
        <TextInput
          name='Your email'
          id='email'
          type='email'
          onChange={(event) => setEmail(event.target.value)}
          className='mb-7'
        />
        <div className='grid grid-cols-2 gap-4 mb-7'>
          <TextInput
            name='First name'
            id='firstName'
            onChange={(event) => setFirstName(event.target.value)}
          />

          <TextInput
            name='Last name'
            id='lastName'
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <TextInput
          name='Password'
          id='password'
          onChange={(event) => setPassword(event.target.value)}
        />

        <div className='mt-7 flex items-center justify-center'>
          <PrimaryButton name="Sign Up" onClick={() => submitForm()} />
        </div>
      </form>
    </div>

  );
};

export default function RegisterForm() {
  return (

    <div className='items-center'>
      <div className='mr-10'>
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
