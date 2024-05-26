import * as React from 'react';
import { IconType } from 'react-icons/lib';
import { SiFacebook, SiLinkedin, SiYoutube } from 'react-icons/si';

import { trackEvent } from '@/lib/analytics';

import Accent from '@/components/Accent';
import UnstyledLink from '@/components/links/UnstyledLink';
import Tooltip from '@/components/Tooltip';

export default function Footer() {
  return (
    <footer className='bg-gray-950 px-10 py-[80px]'>
      <FooterLinks />
      <SocialLinks />

      <div className='dark:text-gray-300 mt-10 flex space-x-4  text-sm text-gray-500'>
        <div className=''>© {new Date().getFullYear()} Havafy.com, Inc.</div>

        <div>privacy policy</div>
        <div>terms of service</div>
      </div>
    </footer>
  );
}

function FooterLinks() {
  return (
    <div className='grid gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-4'>
      <div>
        {footerLinks.map(({ href, text }) => (
          <div key={href} className='my-4 '>
            <UnstyledLink
              className='animated-underline rounded-sm text-xl font-medium text-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
              href={href}
              onClick={() => {
                trackEvent(`Footer Link: ${text}`, { type: 'link' });
              }}
            >
              {text}
            </UnstyledLink>
          </div>
        ))}
      </div>
      <div className=''>
        {[
          {
            href: '/home',
            text: 'become an expert ',
          },
          {
            href: '/how-it-works',
            text: 'partner with us',
          },
          {
            href: '/our-customers',
            text: 'expert login',
          },
          {
            href: '/pricing',
            text: 'partner login',
          },
        ].map(({ href, text }) => (
          <div key={href} className=' my-4 '>
            <UnstyledLink
              className='animated-underline rounded-sm text-xl font-medium text-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
              href={href}
              onClick={() => {
                trackEvent(`Footer Link: ${text}`, { type: 'link' });
              }}
            >
              {text}
            </UnstyledLink>
          </div>
        ))}
      </div>
      <div>
        <div className='font-mono text-3xl text-gray-50'>
          {' '}
          Are you become an expert?{' '}
        </div>
      </div>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className='mt-16 flex space-x-8'>
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
            <social.icon className='dark:text-gray-300 dark:hover:text-primary-300 my-auto h-6 w-6 align-middle text-gray-100 transition-colors hover:text-primary-300' />
          </UnstyledLink>
        </Tooltip>
      ))}
      {/* <div>
        <ThemeButton />
      </div> */}
    </div>
  );
}

const footerLinks: { href: string; text: string }[] = [
  {
    href: '/home',
    text: 'home',
  },
  {
    href: '/how-it-works',
    text: 'how it works',
  },
  {
    href: '/our-customers',
    text: 'our customers',
  },
  {
    href: '/pricing',
    text: 'pricing',
  },
  {
    href: '/pricing',
    text: 'blog',
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
