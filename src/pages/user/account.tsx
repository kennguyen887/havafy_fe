import clsx from 'clsx';
import Router from 'next/router';
import * as React from 'react';

import { getApi } from '@/lib/request';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Account from '@/components/users/Account';
import Sidebar from '@/components/users/Sidebar';

import { User } from '@/domain/models';

import { useAuthState } from '@/contexts/AuthContext';

export default function RegisterPage() {
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
    <Layout>
      <Seo templateTitle='Your profile' />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout before:py-20'>
            <div className='flex flex-row'>
              <div className='mr-10 mt-4 flex-none'>
                <Sidebar />
              </div>

              <div className='min-h-main grow'>
                <h1 className='mb-5 mt-1'>
                  <Accent className='text-2xl'>Account</Accent>
                </h1>
                <div className='my-3 border-t border-slate-200'></div>
                <div className='mt-10'>
                  <Account user={user} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
