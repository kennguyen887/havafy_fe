import clsx from 'clsx';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import ChangeResetPasswordForm from '@/components/users/ChangeResetPasswordForm';

export default function ChangePasswordPage() {
  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo
        templateTitle='Sign in to your account'
        description='a selection of 100% natural sounding AI voices in 60 languages to make professional voice over for your videos and presentations.'
      />
      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout min-h-main py-20'>
            <div className='flex items-center justify-center'>
              <div>
                <div className='mt-4 align-baseline' data-fade='2'>
                  <div className='max-w-xs'>
                    <ChangeResetPasswordForm />
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
