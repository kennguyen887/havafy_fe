import clsx from 'clsx';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import ProjectView from '@/components/admin/ProjectView';
import BaseLayout from '@/components/layout/BaseLayout';
import Seo from '@/components/Seo';
import Sidebar from '@/components/users/Sidebar';

export default function AccountPage() {
  const isLoaded = useLoaded();

  return (
    <BaseLayout>
      <Seo templateTitle='Your projects' />
      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='mx-auto mt-20 flex max-w-screen-xl flex-row '>
            <div className='mt-4 pr-6'>
              <Sidebar />
            </div>
            <div className='min-h-main'>
              <ProjectView />
            </div>
          </div>
        </section>
      </main>
    </BaseLayout>
  );
}
