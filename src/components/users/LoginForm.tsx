import { GoogleLogin } from '@react-oauth/google';
import { Form, Input } from 'antd';
import clsx from 'clsx';
import dynamic from "next/dynamic";
import React from 'react';

import useUserForm from '@/hooks/useUserForm';

const DynamicRegisterFormComponent = dynamic(
  () => import("@/components/users/RegisterForm"),
  {
    loading: () => (
      <p className="loadingText subtitle-4">
        Register Form us Loading, please wait...
      </p>
    ),
  }
);

export default function LoginForm() {
  const [form, userForm] = useUserForm();
  //   const onFinish = () => {

  //   };

  //   const onFinishFailed = () => {
  //   };

  return (
    <div>
      <div className={clsx('register-box', userForm === 'register' ? '' : 'hidden')}>
        <h1 className='mt-5 text-2xl'>Create a new account</h1>

        <div className='py-5 text-base text-gray-600'>
          Already have an account?
          <button type='button' className='text-dark underline ml-2' onClick={() => form('login')}>Sign in</button>
        </div>
        <DynamicRegisterFormComponent />
      </div>

      <div className={clsx('login-box', [null, 'login'].includes(userForm) ? '' : 'hidden')}>
        <h1 className='mt-5 text-2xl'>Sign in to your account</h1>

        <div className='flex items-center'>
          <div className='w-3/6 pr-10'>
            <Form
              name='login-form'
              initialValues={{ remember: true }}
            //   onFinish={onFinish}
            //   onFinishFailed={onFinishFailed}
            >
              <div className='py-5 text-base text-gray-600'>
                Don’t have an account?
                <button
                  className='text-dark underline ml-2'
                  type='button'
                  onClick={() => form('register')}
                >
                  Join here
                </button>
              </div>

              <Form.Item
                name='username'
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input placeholder='Username' />
              </Form.Item>

              <Form.Item
                name='password'
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password placeholder='Password' />
              </Form.Item>
              <div className='mt-10'>
                <div className='flex items-baseline justify-between'>
                  <Form.Item>
                    <button className='block rounded-md bg-slate-700 px-5 py-2 text-white'>
                      Login
                    </button>
                  </Form.Item>
                  <div className='text-right'>Forgot Password?</div>
                </div>
              </div>
            </Form>
          </div>
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
