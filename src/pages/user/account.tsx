import clsx from 'clsx';
import Router from 'next/router';
import * as React from 'react';
import { IoMdLogOut } from 'react-icons/io';

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
          <div className='mx-2 mt-20 w-full justify-between md:mx-[20px] lg:mx-[90px]'>
            <div className='flex flex-row'>
              <div className='mt-4 flex-none pr-6'>
                <Sidebar />
              </div>

              <div className='min-h-main max-w-lg grow'>
                <div className='mb-5 mt-1'>
                  <Accent className='text-2xl'>Account</Accent>
                </div>
                <div className='my-3 border-t border-slate-200'></div>
                <div className='mt-10'>
                  <Account user={user} />
                </div>

                <div className='mt-8'>
                  <h4 className='mb-4 text-lg'>Change Password</h4>
                  <Password />
                </div>
                <div
                  className='my-3 flex rounded-md bg-gray-50 px-4 py-3 hover:bg-gray-100'
                  role='button'
                  onClick={() => resetAuth !== undefined && resetAuth()}
                >
                  <button>
                    <IoMdLogOut className='h-5 w-5' />
                  </button>
                  <div className='ml-3 text-base'>Logout</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </BaseLayout>
  );
}
