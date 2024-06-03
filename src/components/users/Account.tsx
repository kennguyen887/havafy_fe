import Router from 'next/router';
import React from 'react';

import { putApi } from '@/lib/request';

import Alert from '@/components/form/Alert';
import TextInput from '@/components/form/TextInput';

import { User } from '@/domain/models';

export default function Account({ user }: { user?: User }) {
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
      } | null = {};

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
    [data, firstName, lastName]
  );
  return (
    <>
      <form onSubmit={submitForm} noValidate>
        <Alert content={alert} hidden={!alert} />
        <div className='group relative z-0 mb-5 w-full'>
          <div className='my-1 text-sm font-medium'>Email</div>
          <div className='bg-gray-100 px-4 py-2 text-sm'>{user?.email}</div>
        </div>
        <div className='grid md:grid-cols-2 md:gap-6'>
          <div className='  z-0 mb-5 w-full'>
            <div className='my-1 text-sm font-medium'>First name</div>
            <TextInput
              name='First name'
              id='firstName'
              defaultValue={user?.firstName}
              currentValue={(value) => setFirstName(value)}
              valueValidate={[
                (value) => value.length < 1,
                'Please input your first name.',
              ]}
            />
          </div>
          <div className='group z-0 mb-5 w-full'>
            <div className='my-1 text-sm font-medium'>Last name</div>
            <TextInput
              name='Last name'
              id='lastName'
              defaultValue={user?.lastName}
              currentValue={(value) => setLastName(value)}
              valueValidate={[
                (value) => value.length < 1,
                'Please input your last name.',
              ]}
            />
          </div>
        </div>
        <button
          type='submit'
          className='mt-3 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold leading-5 text-white hover:bg-sky-700'
        >
          Save
        </button>
      </form>
    </>
  );
}
