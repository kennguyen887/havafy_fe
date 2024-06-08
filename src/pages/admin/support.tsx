import clsx from 'clsx';
import Router from 'next/router';
import * as React from 'react';

import { getApi } from '@/lib/request';
import useLoaded from '@/hooks/useLoaded';

import Support from '@/components/admin/Support';
import BaseLayout from '@/components/layout/BaseLayout';
import Seo from '@/components/Seo';
import Sidebar from '@/components/users/Sidebar';

import { User } from '@/domain/models';

import { useAuthState } from '@/contexts/AuthContext';

export default function AccountPage() {
  const isLoaded = useLoaded();
  // eslint-disable-next-line unused-imports/no-unused-vars
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
      <Seo templateTitle='Expert' />
      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className=' mx-auto mt-20 grid max-w-screen-xl grid-cols-12 items-start  gap-4'>
            <div className='col-span-3 mt-4 pr-6'>
              <Sidebar />
            </div>
            <div className='min-h-main col-span-8'>
              <Support />
            </div>
          </div>
        </section>
      </main>
    </BaseLayout>
  );
}
