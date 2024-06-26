import clsx from 'clsx';
import Router from 'next/router';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import BaseLayout from '@/components/layout/BaseLayout';
import Seo from '@/components/Seo';
import ResetPasswordWrap from '@/components/users/ResetPasswordForm';

import { useAuthState } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const isLoaded = useLoaded();
  const { isAuthenticated } = useAuthState();

  if (isAuthenticated) {
    Router.push('/');
  }

  return (
    <BaseLayout>
      <Seo templateTitle='Forgot password?' />
      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout min-h-main py-20'>
            <div className='flex items-center justify-center'>
              <div>
                <div className='mt-4 align-baseline' data-fade='2'>
                  <div className='max-w-xs'>
                    <ResetPasswordWrap />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </BaseLayout>
  );
}
