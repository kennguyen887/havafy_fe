import clsx from 'clsx';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
// import TextToSpeech from '@/components/speech/TextToSpeech';
import TC from '@/components/TC';

export default function IndexPage() {
  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo />

      <main>
        <section
          className={clsx(
            'min-h-main -mt-20 mb-20 flex flex-col justify-center',
            isLoaded && 'fade-in-start'
          )}
        >
          <TC
            className={clsx(
              'absolute bottom-0 right-6',
              'translate-y-[37%] transform-gpu',
              'w-[calc(100%-3rem)] md:w-[600px] 2xl:w-[900px]',
              'dark:opacity-30 z-[-1] opacity-70'
            )}
          />
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
