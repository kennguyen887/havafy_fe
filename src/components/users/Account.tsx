import Router from 'next/router';
import React from 'react';

import { isValidEmail } from '@/lib/email';
import { putApi } from '@/lib/request';

import Alert from '@/components/form/Alert';
import TextInput from '@/components/form/TextInput';

import { User } from '@/domain/models';

export default function Account({ user }: { user?: User }) {
  const [email, setEmail] = React.useState<string>();
  const [lastName, setLastName] = React.useState<string>();
  const [firstName, setFirstName] = React.useState<string>();
  const [alert, setAlert] = React.useState<string>();
  const [data] = React.useState(user);

  const submitForm = React.useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      setAlert(undefined);
      let payload: {
        email?: string;
        lastName?: string;
        firstName?: string;
      } | null = null;

      if (email && email !== data?.email) {
        payload = { email };
      }
      if (firstName && firstName !== data?.firstName) {
        payload = { ...payload, firstName };
      }
      if (lastName && lastName !== data?.firstName) {
        payload = { ...payload, lastName };
      }

      if (payload) {
        const { data } = await putApi('user', payload);
        if (data.statusCode) {
          setAlert(data.message);
          return;
        }

        Router.push('/user/account');
      }
    },
    [data, email, firstName, lastName]
  );
  return (
    <>
      <form onSubmit={submitForm} noValidate className='max-w-md '>
        <Alert content={alert} hidden={!alert} />
        <div className='group relative z-0 mb-5 w-full'>
          <TextInput
            name='Your email'
            id='email'
            type='email'
            defaultValue={user?.email}
            currentValue={(value) => setEmail(value)}
            valueValidate={[
              (value) => !isValidEmail(value),
              'Your email is invalid',
            ]}
            disabled
            className='mb-7'
          />
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='group relative z-0 mb-5 w-full'>
            <TextInput
              name='First name'
              id='firstName'
              defaultValue={user?.firstName}
              currentValue={(value) => setFirstName(value)}
              valueValidate={[
                (value) => value.length < 1,
                'Please input your first name.',
              ]}
              className='mb-7'
            />
          </div>
          <div className='group relative z-0 mb-5 w-full'>
            <TextInput
              name='First name'
              id='firstName'
              defaultValue={user?.lastName}
              currentValue={(value) => setLastName(value)}
              valueValidate={[
                (value) => value.length < 1,
                'Please input your last name.',
              ]}
              className='mb-7'
            />
          </div>
        </div>
        <button
          type='submit'
          className='rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold leading-5 text-white hover:bg-sky-700'
        >
          Save
        </button>
      </form>
    </>
  );
}
