import clsx from 'clsx';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import CreateTaskWrap from '@/components/tasks/CreateTask';

export default function RegisterPage() {
  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo
        templateTitle='Gởi một yêu cầu công việc'
        description='a selection of 100% natural sounding AI voices in 60 languages to make professional voice over for your videos and presentations.'
      />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout'>
            <div className='flex items-center justify-center pt-10'>
              <div className='mt-4 align-baseline' data-fade='2'>
                <CreateTaskWrap />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
