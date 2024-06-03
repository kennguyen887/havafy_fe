import clsx from 'clsx';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import HireAnExpertFormWrap from '@/components/hire/HireAnExpertForm';
import BaseLayout from '@/components/layout/BaseLayout';
import Seo from '@/components/Seo';

export default function RegisterPage() {
  const isLoaded = useLoaded();
  return (
    <BaseLayout>
      <Seo templateTitle='Hire a Expert' />
      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='flex items-center justify-center'>
            <div className='mx-10 max-w-3xl md:mx-20' data-fade='2'>
              <HireAnExpertFormWrap />
            </div>
          </div>
        </section>
      </main>
    </BaseLayout>
  );
}
