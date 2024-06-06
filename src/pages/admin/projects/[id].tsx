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
          <div className='mx-auto mt-20 grid max-w-screen-xl grid-cols-12 items-start  gap-4'>
            <div className='col-span-3 mt-4 hidden pr-6 md:block'>
              <Sidebar />
            </div>
            <div className='min-h-main col-span-9'>
              <ProjectView />
            </div>
          </div>
        </section>
      </main>
    </BaseLayout>
  );
}
