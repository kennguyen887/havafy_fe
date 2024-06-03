import clsx from 'clsx';
import Router from 'next/router';
import * as React from 'react';

import { getApi } from '@/lib/request';
import useLoaded from '@/hooks/useLoaded';

import ProjectManager from '@/components/admin/ProjectManager';
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
      <Seo templateTitle='Your projects' />
      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='mx-5 mt-20 w-full justify-between md:mx-20'>
            <div className='flex '>
              <div className='mr-10 mt-4'>
                <Sidebar />
              </div>
              <div className='min-h-main'>
                <ProjectManager />
              </div>
            </div>
          </div>
        </section>
      </main>
    </BaseLayout>
  );
}
