import clsx from 'clsx';
import Router from 'next/router';
import * as React from 'react';

import { getApi } from '@/lib/request';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import BaseLayout from '@/components/layout/BaseLayout';
import Seo from '@/components/Seo';
import Account from '@/components/users/Account';
import Password from '@/components/users/Password';
import Sidebar from '@/components/users/Sidebar';

import { User } from '@/domain/models';

import { useAuthState } from '@/contexts/AuthContext';

export default function AccountPage() {
  const isLoaded = useLoaded();
  const [user, setUser] = React.useState<User>();
  const { resetAuth } = useAuthState();

  React.useEffect(() => {
    getApi('user/me')
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        if (error.response) {
          const { status } = error.response;

          if (status === 401 && resetAuth) {
            resetAuth();
          }
        }

        Router.push('/');
      });
  }, [resetAuth]);

  return (
    <BaseLayout>
      <Seo templateTitle='Your profile' />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='mx-3 mt-20 w-full justify-between before:py-20 md:mx-20'>
            <div className='flex flex-row'>
              <div className='mr-10 mt-4 flex-none'>
                <Sidebar />
              </div>

              <div className='min-h-main max-w-lg grow'>
                <h1 className='mb-5 mt-1'>
                  <Accent className='text-2xl'>Account</Accent>
                </h1>
                <div className='my-3 border-t border-slate-200'></div>
                <div className='mt-10'>
                  <Account user={user} />
                </div>

                <div className='mt-8'>
                  <h1 className=''>
                    <h4 className='text-lg'>Change Password</h4>
                  </h1>
                  <div className='mt-10'>
                    <Password />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </BaseLayout>
  );
}
