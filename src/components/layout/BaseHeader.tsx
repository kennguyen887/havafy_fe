import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

export default function BaseHeader() {
  return (
    <header>
      <div className='layout mx-5 flex w-full flex-col justify-between px-5 py-2 transition-colors lg:mx-20'>
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
