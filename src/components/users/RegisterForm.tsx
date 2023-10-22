import { GoogleLogin } from '@react-oauth/google';
import { Form, Input } from 'antd';
import React, { useCallback } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { usePost } from '@/lib/request';

const RegisterInputForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify = useCallback(async (values: any) => {

    if (!executeRecaptcha) {
      return;
    }

    const token = await executeRecaptcha();

    usePost('user/register', {
      ...values,
      token,
    })
    // Do whatever you want with the token
  }, [executeRecaptcha]);

  return   <Form
              name='login-form'
              initialValues={{ remember: true }}
              onFinish={(values)=>handleReCaptchaVerify(values)}
              //   onFinish={onFinish}
              //   onFinishFailed={onFinishFailed}
            >
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
                    <button 
          
                    className='block rounded-md bg-slate-700 px-5 py-2 text-white'>
                      Login
                    </button>
  
                  </Form.Item>
                  <div className='text-right'>Forgot Password?</div>
                </div>
              </div>
            </Form>
      
};

export default function RegisterForm() {

  return (
    <div className='login-page'>
      <div className='register-box'>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTHA_SITE_KEY!}
        scriptProps={{
          async: false,
          defer: true,
          appendTo: "body",
          nonce: undefined,
        }}>
   
        <div className='flex items-center'>
          <div className='w-3/6 pr-10'>
          <RegisterInputForm />
          </div>
          <div 
     
          className='mr-10 h-[250px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100'></div>
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
          </div>{' '}
        </div>
        </GoogleReCaptchaProvider>
      </div>
    </div>
  );
}
