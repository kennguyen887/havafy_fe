import clsx from 'clsx';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Password from '@/components/users/Password';
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
              <div className='mr-10 mt-4 flex-none'>
                <Sidebar />
              </div>

              <div className='min-h-main grow'>
                <h1 className='mb-5 mt-1'>
                  <Accent className='text-2xl'>Account</Accent>
                </h1>
                <div className='my-3 border-t border-slate-200'></div>
                <div className='mt-10'>
                  <Password />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
