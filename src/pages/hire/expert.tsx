import clsx from 'clsx';
import Router from 'next/router';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import HireAnExpertFormWrap from '@/components/hire/HireAnExpertForm';
import BaseLayout from '@/components/layout/BaseLayout';
import Seo from '@/components/Seo';

import { useAuthState } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const isLoaded = useLoaded();
  const { isAuthenticated } = useAuthState();

  if (isAuthenticated) {
    Router.push('/');
  }

  return (
    <BaseLayout>
      <Seo templateTitle='Hire a Expert' />
      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='flex items-center justify-center'>
            <div className='mt-4 align-baseline' data-fade='2'>
              <HireAnExpertFormWrap />
            </div>
          </div>
        </section>
      </main>
    </BaseLayout>
  );
}
