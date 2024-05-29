import clsx from 'clsx';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import CustomerReviewSection from '@/components/hire/CustomerReviewSection';
import FreelanceHiringFixed from '@/components/hire/FreelanceHiringFixed';
import FreelancerSlideSection from '@/components/hire/FreelancerSlideSection';
import HireAnExpertModal from '@/components/hire/HireAnExpertModal';
import HireAnExpertSection from '@/components/hire/HireAnExpertSection';
import MeetTechStackSection from '@/components/hire/MeetTechStackSection';
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
            '-mt-20 bg-[#1c3d62] pb-10',
            isLoaded && 'fade-in-start'
          )}
        >
          <HireAnExpertSection />
        </section>
        <FreelanceHiringFixed />
        <FreelancerSlideSection
          title='Fullstack Developers'
          images={[
            'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg',
            'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg',
            'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg',
            'https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg',
            'https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg',
            'https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg',
            'https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg',
          ]}
        />

        <FreelancerSlideSection
          title='Backend Developers'
          images={[
            'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg',
            'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg',
            'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg',
            'https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg',
            'https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg',
            'https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg',
            'https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg',
          ]}
        />
        <MeetTechStackSection title='Meet our techstacks' />
        <CustomerReviewSection />
        <HireAnExpertModal />
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
