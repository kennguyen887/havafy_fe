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
        !onTop && 'bg-gray-900 shadow-sm'
      )}
    >
      <div className='layout items-centertransition-colors flex flex-col justify-between px-5 py-2 lg:flex-row lg:items-center'>
        <nav className={clsx('flex items-center', large && 'lg:max-w-[68rem]')}>
          <div className='my-1 lg:my-0'>
            <Logo />
          </div>
          <ul className='ml-10 hidden justify-between space-x-12 text-xs md:space-x-10 md:text-base lg:flex'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink
                  href={href}
                  className={clsx(
                    'animated-underline py-1 transition-colors',
                    'text-sm font-medium text-white'
                  )}
                >
                  <span
                    className={clsx(
                      ' transition-colors',
                      ' border-gray-400 bg-primary-300/0 group-hover:border-b-2',
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
