import clsx from 'clsx';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import CheckoutForm from '@/components/checkout/CheckoutForm';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function RegisterPage() {
  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo
        templateTitle='Checkout'
        description='a selection of 100% natural sounding AI voices in 60 languages to make professional voice over for your videos and presentations.'
      />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout min-h-main py-20'>
            <div className='flex items-center justify-center'>
              <div className='mt-4 align-baseline' data-fade='2'>
                <CheckoutForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
