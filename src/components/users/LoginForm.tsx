import { GoogleLogin } from '@react-oauth/google';
import { Form, Input } from 'antd';
import clsx from 'clsx';
import React, { useState } from 'react';

import RegisterForm from '@/components/users/RegisterForm';

export default function LoginForm() {
  const [showsLoginForm, setShowsLoginForm] = useState(true);
  //   const onFinish = () => {

  //   };

  //   const onFinishFailed = () => {
  //   };

  return (
    <div>
      <div className={clsx('register-box', showsLoginForm ? 'hidden' : '')}>
        <RegisterForm />
      </div>

      <div className={clsx('login-box', showsLoginForm ? '' : 'hidden')}>
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
                  className='text-dark underline'
                  onClick={() => setShowsLoginForm(false)}
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
            // onSuccess={(credentialResponse) => {
            //   console.log(credentialResponse);
            // }}
            // onError={() => {
            //   console.log('Login Failed');
            // }}
            />
          </div>{' '}
        </div>
      </div>
    </div>
  );
}
