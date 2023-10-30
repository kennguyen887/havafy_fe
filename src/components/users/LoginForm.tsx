import { GoogleLogin } from '@react-oauth/google';
import clsx from 'clsx';
import React from 'react';

import useUserForm from '@/hooks/useUserForm';

export default function LoginForm() {
  const [form, userForm] = useUserForm();
  //   const onFinish = () => {

  //   };

  //   const onFinishFailed = () => {
  //   };

  return (
    <div>
      <div
        className={clsx(
          'register-box',
          userForm === 'register' ? '' : 'hidden'
        )}
      >
        <h1 className='mt-5 text-2xl'>Create a new account</h1>

        <div className='pb-2 pt-5 text-base text-gray-600'>
          Already have an account?
          <button
            type='button'
            className='ml-2 text-dark underline'
            onClick={() => form('login')}
          >
            Sign in
          </button>
        </div>
        {/* <DynamicRegisterFormComponent /> */}
      </div>

      <div
        className={clsx(
          'login-box',
          [null, 'login'].includes(userForm) ? '' : 'hidden'
        )}
      >
        <h1 className='mt-5 text-2xl'>Sign in to your account</h1>

        <div className='flex items-center'>
          <div className='w-3/6 pr-10'></div>
          <div className='mr-10 h-[250px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100'></div>
          <div>
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
      </div>
    </div>
  );
}
