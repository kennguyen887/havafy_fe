import * as React from 'react';
import { FaArrowDown } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { SiFacebook, SiLinkedin, SiYoutube } from 'react-icons/si';

import { trackEvent } from '@/lib/analytics';

import Logo from '@/components/layout/Logo';
import UnstyledLink from '@/components/links/UnstyledLink';

export default function Footer() {
  return (
    <footer className='bg-gray-900 px-10 py-[80px]'>
      <FooterLinks />
      <SocialLinks />

      <div className='mt-10'>
        <Logo width={200} height={100} />
      </div>
      <div className='dark:text-gray-300 mt-10 flex space-x-4  text-sm text-gray-500'>
        <div className=''>© {new Date().getFullYear()} Havafy, Inc.</div>

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
          <div key={href} className='my-5 '>
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
        {[
          {
            href: '/become-an-expert',
            text: 'become an expert',
          },
          {
            href: '/partner-with-us',
            text: 'partner with us',
          },
          {
            href: '/expert-login',
            text: 'expert login',
          },
          {
            href: '/partner-login',
            text: 'partner login',
          },
        ].map(({ href, text }) => (
          <div key={href} className=' my-5 '>
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
      <div className='col-span-2'>
        <div className='justify-end lg:flex'>
          <div className='max-w-sm text-gray-50'>
            <div className='font-mono text-3xl'>
              Are you a talented developer, designer, or devops?
            </div>
            <FaArrowDown className='mb-3 mt-6 h-10 w-10 text-gray-300' />
            <button className='font-base mt-5 inline-block rounded-full border border-x-2 border-y-2 border-gray-400 bg-transparent px-7 py-4 hover:border-gray-100 hover:bg-gray-100 hover:text-gray-800'>
              apply to join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className='mt-5 flex space-x-8'>
      {socials.map((social) => (
        <UnstyledLink
          key={social.href}
          className='inline-flex items-center justify-center rounded-sm focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
          href={social.href}
          onClick={() => {
            trackEvent(`Footer Link: ${social.id}`, { type: 'link' });
          }}
        >
          <social.icon className='dark:text-gray-300 dark:hover:text-primary-300 my-auto h-5 w-5 align-middle text-gray-100 transition-colors hover:text-primary-300' />
        </UnstyledLink>
      ))}
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
    href: '/blog',
    text: 'blog',
  },
];

type Social = {
  href: string;
  icon: IconType;
  id: string;
};
const socials: Social[] = [
  {
    href: 'https://www.facebook.com/havafydotcom',
    icon: SiFacebook,
    id: 'Facebook',
  },
  {
    href: 'https://www.linkedin.com/company/74118757/',
    icon: SiLinkedin,
    id: 'Linkedin',
  },
  {
    href: 'https://www.youtube.com/channel/UCCBzLMlpl7Rr-GzmN9orwzQ',
    icon: SiYoutube,
    id: 'Youtube',
  },
];
