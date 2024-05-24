import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';

import Logo from '@/components/layout/Logo';
import UnstyledLink from '@/components/links/UnstyledLink';
import User from '@/components/users/User';

type HeaderProps = {
  large?: boolean;
};

export default function Header({ large = false }: HeaderProps) {
  //#region  //*=========== Route Functionality ===========
  const router = useRouter();
  /** Ex: /projects/petrolida-2021 -> ['', 'projects', 'petrolida-2021'] */
  const arrOfRoute = router.route.split('/');
  const baseRoute = '/' + arrOfRoute[1];
  //#endregion  //*======== Route Functionality ===========

  //#region  //*=========== Scroll Shadow ===========
  const [onTop, setOnTop] = React.useState<boolean>(true);
  React.useEffect(() => {
    const handleScroll = () => {
      setOnTop(window.pageYOffset === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //#endregion  //*======== Scroll Shadow ===========

  return (
    <header
      className={clsx(
        'shadow-xs sticky top-0 z-50 transition-shadow',
        !onTop && 'bg-black shadow-sm'
      )}
    >
      <div className='layout items-centertransition-colors flex flex-col items-center justify-between px-5 py-2 lg:flex-row'>
        <nav
          className={clsx(
            'flex items-center py-1',
            large && 'lg:max-w-[68rem]'
          )}
        >
          <Logo />
          <ul className='ml-10 flex justify-between space-x-12 text-xs md:space-x-10 md:text-base'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink
                  href={href}
                  className={clsx(
                    'rounded-sm py-2 transition-colors',
                    'text-sm font-medium text-white',
                    'group',
                    'focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
                  )}
                >
                  <span
                    className={clsx(
                      'pb-1 transition-colors',
                      'mx-1 border-gray-400 bg-primary-300/0 group-hover:border-b-2',
                      href === baseRoute && 'border-b-1'
                    )}
                  >
                    {label}
                  </span>
                </UnstyledLink>
              </li>
            ))}
          </ul>
        </nav>
        <User />
      </div>
    </header>
  );
}

const links = [
  { href: '/experts', label: 'experts' },
  { href: '/how-it-works', label: 'how it works' },
  { href: '/customers', label: 'customers' },
  { href: '/pricing', label: 'pricing' },
  { href: '/blog', label: 'blog' },
];
