import clsx from 'clsx';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function AboutPage() {
  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo
        templateTitle='About'
        description='a selection of 100% natural sounding AI voices in 60 languages to make professional voice over for your videos and presentations.'
      />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout min-h-main py-20'>
            <h2 data-fade='0'>About</h2>
            <h1 className='mt-1' data-fade='1'>
              <Accent className='text-3xl'>
                Havafy: Empowering Your Digital Vision
              </Accent>
            </h1>
            <div className='mt-4' data-fade='2'>
              <article className='prose dark:prose-invert'>
                <p data-fade='3'>
                  Havafy is not just a platform; it's your gateway to a world of
                  digital innovation. We pride ourselves on offering exceptional
                  AI services, a dynamic marketplace featuring scalable source
                  code, and a bustling hub for freelance opportunities that
                  cater to developers worldwide.
                </p>
                <h3> AI Services Redefined</h3>
                <p data-fade='4'>
                  Step into the future with Havafy's unparalleled AI services.
                  Whether you're seeking to integrate advanced machine learning
                  models, implement natural language processing, or harness the
                  capabilities of computer vision, our team of experts is
                  dedicated to transforming your ideas into groundbreaking
                  solutions. Experience the next level of innovation with
                  Havafy.
                </p>
                <h3>Freelance Job Tailored for You</h3>
                <p data-fade='5'>
                  Freelance Opportunities Tailored for You: For developers
                  seeking opportunities beyond the ordinary, Havafy is your
                  destination. Explore our carefully curated list of freelance
                  jobs, offering a chance to collaborate on exciting projects
                  with businesses of all sizes. Whether you're a seasoned
                  professional or an emerging talent, Havafy is where skills
                  meet opportunity.
                </p>

                <h3>Source Code Marketplace</h3>
                <p>
                  Discover a curated marketplace at Havafy, where scalability
                  meets reliability. Our collection of source code for web and
                  app development is meticulously selected to accelerate your
                  projects. From robust backend systems to sleek frontend
                  interfaces, Havafy's marketplace is your one-stop solution for
                  high-quality, scalable codebases. Transform your concepts into
                  reality effortlessly.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section>
          <div className='layout py-6'>
            <h2>Contact</h2>
            <article className='prose mt-4 dark:prose-invert'>
              <p>
                Do contact us if you need our opinion about web and app
                development, especially frontend works.
              </p>
            </article>
          </div>
        </section>
      </main>
    </Layout>
  );
}
