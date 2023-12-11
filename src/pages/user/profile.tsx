import clsx from 'clsx';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Sidebar from '@/components/users/Sidebar';

export default function RegisterPage() {
  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo templateTitle='Your profile' />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout before:py-20'>
            <div className='flex flex-row'>
              <div className='mr-10 mt-4'>
                <Sidebar />
              </div>

              <div className=''>
                <h1 className='mb-14 mt-1'>
                  <Accent>Your profile</Accent>
                </h1>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
