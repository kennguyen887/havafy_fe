import clsx from 'clsx';
import Router from 'next/router';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import RegisterInputForm from '@/components/users/RegisterForm';

import { useAuthState } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const isLoaded = useLoaded();
  const { isAuthenticated } = useAuthState();

  if (isAuthenticated === true) {
    Router.push('/');
  }

  return (
    <Layout>
      <Seo
        templateTitle='Register'
        description='a selection of 100% natural sounding AI voices in 60 languages to make professional voice over for your videos and presentations.'
      />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout min-h-main py-20'>
            <div className='flex items-center justify-center'>
              <div className='mt-4 align-baseline' data-fade='2'>
                <div className='mb-10 text-center'>
                  <Accent className='text-2xl font-semibold'>
                    Create a new account
                  </Accent>
                </div>

                <div className='max-w-2xl'>
                  <RegisterInputForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
