import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

export default function BaseHeader() {
  return (
    <header>
      <div className='layout mx-auto flex max-w-screen-xl flex-col justify-between py-2 transition-colors'>
        <nav className={clsx('flex items-center')}>
          <div className='my-1 lg:my-0'>
            <Link href='/'>
              {' '}
              <Image
                src='/images/logo_colorful.svg'
                width={110}
                height={50}
                alt='Havafy logo'
              />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
