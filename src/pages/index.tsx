import clsx from 'clsx';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import HireAnExpertSection from '@/components/hire/HireAnExpertSection';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function IndexPage() {
  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo />

      <main>
        <section
          className={clsx(
            'min-h-main -mt-20 mb-20',
            isLoaded && 'fade-in-start'
          )}
        >
          <HireAnExpertSection />
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
