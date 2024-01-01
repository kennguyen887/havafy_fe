import clsx from 'clsx';
import Router from 'next/router';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import LoginForm from '@/components/users/LoginForm';

import { useAuthState } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const isLoaded = useLoaded();
  const { isAuthenticated } = useAuthState();

  if (isAuthenticated) {
    Router.push('/');
  }

  return (
    <Layout>
      <Seo
        templateTitle='Sign in to your account'
        description='Clarence is a front-end developer that started learning in May 2020. He write blogs about his approach and mental model on understanding topics in front-end development.'
      />
      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout min-h-main py-20'>
            <div className='flex items-center justify-center'>
              <div>
                <div className='mt-4 align-baseline' data-fade='2'>
                  <div className='max-w-xs'>
                    <LoginForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
