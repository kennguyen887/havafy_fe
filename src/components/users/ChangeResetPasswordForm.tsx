import clsx from 'clsx';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import React from 'react';

import { validatePassword } from '@/lib/password';
import { postApi } from '@/lib/request';

import Accent from '@/components/Accent';
import Alert from '@/components/form/Alert';
import PrimaryButton from '@/components/form/PrimaryButton';
import TextInput from '@/components/form/TextInput';

import { PasswordRules } from './Password';

export default function ChangeResetPasswordForm() {
  const params = useParams<{ slug: string }>();
  const [password, setPassword] = useState<string>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = React.useState<string>();

  const submitForm = React.useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (loading) {
        return;
      }

      setLoading(true);
      const data = await postApi('user/changePasswordByResetToken', {
        password,
        resetToken: params.slug,
      });

      setLoading(false);
      if (data?.statusCode) {
        setAlert(data.message);
        return;
      }
      setSubmitted(true);
    },
    [password, loading, params?.slug]
  );
  return (
    <div className='w-96'>
      <h1 className='mb-8 mt-1 text-center'>
        <Accent className='text-2xl'>Reset password</Accent>
      </h1>
      <div className={clsx(submitted ? 'hidden' : '')}>
        <div className='mb-5 text-sm text-gray-500'>
          You have requested to reset the password for your account.
        </div>
        <form onSubmit={submitForm} noValidate>
          <Alert content={alert} hidden={!alert} />
          <TextInput
            name='Your password'
            id='password'
            type='password'
            currentValue={(value) => setPassword(value)}
            valueValidate={[
              (value) => !validatePassword(value),
              'Your password not match rules',
            ]}
            className='mb-2'
          />
          <TextInput
            name='Repeat password'
            id='repeat_password'
            type='password'
            valueValidate={[
              (value) => value !== password,
              'Your password is not same.',
            ]}
            className='mb-2'
          />
          <div className='mt-7 flex items-center justify-center'>
            <PrimaryButton name={loading ? 'Loading...' : 'Change password'} />
          </div>
        </form>
        <PasswordRules />
      </div>
      <div className={clsx(submitted ? '' : 'hidden', 'text-center')}>
        <div className='my-10 text-base font-bold'>
          Your password has been reset successfully!
        </div>
        <Link
          passHref
          href='/user/login'
          className='text-sm text-gray-800 hover:text-red-700'
        >
          <PrimaryButton name='Login' />
        </Link>
      </div>
    </div>
  );
}
