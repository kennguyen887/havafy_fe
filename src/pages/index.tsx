import clsx from 'clsx';
import * as React from 'react';

import { getAllFilesFrontmatter, getFeatured } from '@/lib/mdx.server';
import { generateRss } from '@/lib/rss';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
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
          <article className='layout'>
            <h1
              className='mt-1 text-2xl md:text-4xl 2xl:text-5xl'
              data-fade='2'
            >
              <Accent>
                Text to Speech Voice Over
                <br />
                with Realistic AI Voices
              </Accent>
            </h1>
            <p
              className={clsx(
                'mt-4 max-w-4xl text-gray-700 dark:text-gray-200 md:mt-6',
                'md:text-lg 2xl:text-xl'
              )}
              data-fade='3'
            >
              I work with React Ecosystem, and write to teach people how to
              rebuild and redefine fundamental concepts through mental models.
            </p>
          </article>
          <TC
            className={clsx(
              'absolute bottom-0 right-6',
              'translate-y-[37%] transform-gpu',
              'w-[calc(100%-3rem)] md:w-[600px] 2xl:w-[900px]',
              'z-[-1] opacity-70 dark:opacity-30'
            )}
          />
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  generateRss();

  const blogs = await getAllFilesFrontmatter('blog');
  const projects = await getAllFilesFrontmatter('projects');
  const shorts = await getAllFilesFrontmatter('library');

  const featuredPosts = getFeatured(blogs, [
    'nextjs-boilerplate-2023',
    'nextjs-auth-hoc',
    '2022-retrospective',
    'react-core-concept-rendering-state',
    'nextjs-fetch-method',
    'one-stop-starter',
  ]);
  const featuredProjects = getFeatured(projects, [
    'hexcape',
    'notiolink',
    'ppdbsumsel',
  ]);
  const featuredShorts = getFeatured(shorts, [
    'react/absolute-import',
    'auth-context',
    'mac/zsh',
    'react/jsx-one-parent',
    'styling/margin-usage',
    'uncategorized/search-removal',
  ]);

  const introPosts = getFeatured(blogs, [
    'btb-flex-mental-model',
    'nextjs-fetch-method',
  ]);

  return {
    props: {
      featuredPosts,
      featuredProjects,
      featuredShorts,
      introPosts,
    },
  };
}
