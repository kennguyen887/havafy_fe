import clsx from 'clsx';
import Router from 'next/router';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import BaseLayout from '@/components/layout/BaseLayout';
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
    <BaseLayout>
      <Seo
        templateTitle='Register'
        description='a selection of 100% natural sounding AI voices in 60 languages to make professional voice over for your videos and presentations.'
      />
      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout min-h-main py-20'>
            <div className='flex items-center justify-center'>
              <RegisterInputForm />
            </div>
          </div>
        </section>
      </main>
    </BaseLayout>
  );
}
