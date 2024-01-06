import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import React from 'react';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';

import { isValidEmail } from '@/lib/email';
import { postApi } from '@/lib/request';

import Accent from '@/components/Accent';
import Alert from '@/components/form/Alert';
import PrimaryButton from '@/components/form/PrimaryButton';
import TextInput from '@/components/form/TextInput';

export function ResetPasswordForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [email, setEmail] = useState<string>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = React.useState<string>();

  const submitForm = React.useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (loading) {
        return;
      }
      if (!executeRecaptcha) {
        return;
      }
      const token = await executeRecaptcha();

      setLoading(true);
      const data = await postApi('user/resetPassword', {
        email,
        token,
      });
      if (data) {
        setSubmitted(true);
        setLoading(false);
        if (data.statusCode) {
          setAlert(data.message);
          return;
        }
      }
    },
    [email, loading, executeRecaptcha]
  );
  return (
    <div className='w-96'>
      <div className={clsx(submitted ? 'hidden' : '')}>
        <h1 className='mb-8 mt-1 text-center'>
          <Accent className='text-2xl'>Forgot password?</Accent>
        </h1>
        <div className='mb-5 text-sm text-gray-500'>
          Please enter your email address below so we can send you a link to
          reset your password.
        </div>

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
            className='mb-2'
          />
          <div className='mt-7 flex items-center justify-center'>
            <PrimaryButton name={loading ? 'Loading...' : 'Send email'} />
          </div>
        </form>
      </div>
      <div className={clsx(submitted ? '' : 'hidden', 'fade-in-start')}>
        <h1 className='mb-8 mt-1 text-center'>
          <Accent className='text-2xl'>Please check your email</Accent>
        </h1>
        <div className='border-b border-gray-300'></div>
        <div className='my-10 text-base text-gray-800'>
          We just sent a password reset email to your email ({email}). Click the
          link in the email to reset your password.
        </div>
        <h4 className='text-base text-gray-700'>Didn't receive the email?</h4>
        <ul className='ml-5 list-disc'>
          <li className='my-2 text-sm'>
            Please remember to check your spam folder
          </li>
          <li
            className='my-2 cursor-pointer text-sm font-semibold text-red-700'
            onClick={() => setSubmitted(false)}
          >
            Resend email
          </li>
        </ul>
      </div>

      <Link
        passHref
        href='/user/login'
        className='text-sm text-gray-800 hover:text-red-700'
      >
        <button className='group relative my-8 inline-flex items-center justify-start'>
          <span className='absolute left-0 -translate-x-2  duration-200 ease-linear group-hover:translate-x-0'>
            <svg
              className='h-3 w-3 text-black'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 52 52'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M38,52a2,2,0,0,1-1.41-.59l-24-24a2,2,0,0,1,0-2.82l24-24a2,2,0,0,1,2.82,0,2,2,0,0,1,0,2.82L16.83,26,39.41,48.59A2,2,0,0,1,38,52Z' />
            </svg>
          </span>
          <span className='-translate-x-2 pl-4  duration-200 ease-out group-hover:translate-x-0'>
            Back to log in
          </span>
        </button>
      </Link>
    </div>
  );
}

export default function ResetPasswordWrap() {
  return (
    <>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTHA_SITE_KEY || ''}
        scriptProps={{
          async: false,
          defer: true,
          appendTo: 'body',
          nonce: undefined,
        }}
      >
        <ResetPasswordForm />
      </GoogleReCaptchaProvider>
    </>
  );
}
