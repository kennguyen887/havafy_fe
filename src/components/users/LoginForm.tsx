import { Checkbox, Form, Input } from 'antd';

export default function LoginForm() {
  //   const onFinish = () => {

  //   };

  //   const onFinishFailed = () => {
  //   };

  return (
    <div className='login-page'>
      <div className='login-box'>
        <Form
          name='login-form'
          initialValues={{ remember: true }}
          //   onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
        >
          <h1 className='mb-10 text-2xl'>Welcome back</h1>
          <p>Login to the Dashboard</p>
          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder='Username' />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder='Password' />
          </Form.Item>

          <Form.Item name='remember' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <button className='block rounded-md bg-slate-700 px-5 py-2 text-white'>
              Login
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
