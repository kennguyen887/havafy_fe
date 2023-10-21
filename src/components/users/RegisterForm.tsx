import { GoogleLogin } from '@react-oauth/google';
import { Form, Input } from 'antd';

export default function RegisterForm() {
  //   const onFinish = () => {

  //   };

  //   const onFinishFailed = () => {
  //   };

  return (
    <div className='login-page'>
      <div className='login-box'>
        <h1 className='mt-5 text-2xl'>Create a new account</h1>

        <div className='flex items-center'>
          <div className='w-3/6 pr-10'>
            <Form
              name='login-form'
              initialValues={{ remember: true }}
              //   onFinish={onFinish}
              //   onFinishFailed={onFinishFailed}
            >
              <div className='py-5 text-base text-gray-600'>
                Already have an account?{' '}
                <span className='text-dark underline'>Sign in</span>
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
