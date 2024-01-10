import { FeedbackFish } from '@feedback-fish/react';
import * as React from 'react';
import { IconType } from 'react-icons/lib';
import { SiFacebook, SiLinkedin, SiYoutube } from 'react-icons/si';

import { trackEvent } from '@/lib/analytics';

import Accent from '@/components/Accent';
import UnstyledLink from '@/components/links/UnstyledLink';
import Tooltip from '@/components/Tooltip';

import { feedbackFlag } from '@/constants/env';

export default function Footer() {
  return (
    <footer className='mt-4 bg-white pb-2 pt-10'>
      <main className='layout flex flex-col items-center'>
        <FooterLinks />
        <SocialLinks />

        <p className='mt-8 text-sm text-gray-600 dark:text-gray-300'>
          © Havafy.com {new Date().getFullYear()}
          {feedbackFlag && (
            <>
              {' • '}
              <FeedbackFish
                projectId={process.env.NEXT_PUBLIC_FEEDBACK_FISH_ID || ''}
              >
                <button className='rounded-sm hover:text-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:hover:text-gray-100'>
                  Got any feedback?
                </button>
              </FeedbackFish>
            </>
          )}
        </p>
      </main>
    </footer>
  );
}

function FooterLinks() {
  return (
    <div className='flex flex-wrap justify-center gap-x-8 gap-y-4'>
      {footerLinks.map(({ href, text, tooltip }) => (
        <Tooltip interactive={false} key={href} tipChildren={tooltip}>
          <UnstyledLink
            className='animated-underline rounded-sm text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:text-gray-200'
            href={href}
            onClick={() => {
              trackEvent(`Footer Link: ${text}`, { type: 'link' });
            }}
          >
            {text}
          </UnstyledLink>
        </Tooltip>
      ))}
    </div>
  );
}

function SocialLinks() {
  return (
    <div className='mt-10 flex space-x-8'>
      {socials.map((social) => (
        <Tooltip
          interactive={false}
          key={social.href}
          tipChildren={social.text}
        >
          <UnstyledLink
            className='inline-flex items-center justify-center rounded-sm focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
            href={social.href}
            onClick={() => {
              trackEvent(`Footer Link: ${social.id}`, { type: 'link' });
            }}
          >
            <social.icon className='my-auto h-6 w-6 align-middle text-gray-600 transition-colors hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
          </UnstyledLink>
        </Tooltip>
      ))}
      {/* <div>
        <ThemeButton />
      </div> */}
    </div>
  );
}

const footerLinks: { href: string; text: string; tooltip: React.ReactNode }[] =
  [
    {
      href: '/about',
      text: 'About us',
      tooltip: 'About Havafy',
    },
    {
      href: '/contact',
      text: 'Contact us',
      tooltip: 'Contact Havafy',
    },
    {
      href: '/user/register',
      text: 'Register',
      tooltip: 'Register a account',
    },
    {
      href: '/user/login',
      text: 'Register',
      tooltip: 'Login to your account',
    },
  ];

type Social = {
  href: string;
  icon: IconType;
  id: string;
  text: React.ReactNode;
};
const socials: Social[] = [
  {
    href: 'https://www.facebook.com/havafydotcom',
    icon: SiFacebook,
    id: 'Github',
    text: (
      <>
        See our projects on <Accent className='font-medium'>Facebook</Accent>
      </>
    ),
  },
  {
    href: 'https://www.linkedin.com/company/74118757/',
    icon: SiLinkedin,
    id: 'Linkedin',
    text: (
      <>
        Find me on <Accent className='font-medium'>Linkedin</Accent>
      </>
    ),
  },
  {
    href: 'https://www.youtube.com/channel/UCCBzLMlpl7Rr-GzmN9orwzQ',
    icon: SiYoutube,
    id: 'Youtube',
    text: <>View our tuts on Youtube</>,
  },
];
