import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { useAuthState } from '@/contexts/AuthContext';

function AuthenticatedMenuDropdown() {
  return (
    <div className='group'>
      <button
        className='flex items-center rounded-full pe-1 text-sm font-medium text-gray-900 group-hover:text-blue-600 group-hover:ring-4 group-hover:ring-gray-100 dark:text-white dark:group-hover:text-blue-500 dark:group-hover:ring-gray-700 md:me-0'
        type='button'
      >
        <span className='sr-only'>Open user menu</span>
        <div className='mr-2 '>
          <Image
            className='h-8 w-8 rounded-full'
            width={32}
            height={32}
            src='https://flowbite.com/docs/images/people/profile-picture-3.jpg'
            alt='user photo'
          />
        </div>
        Bonnie Green
        <svg
          className='ms-3 h-2.5 w-2.5'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 10 6'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='m1 1 4 4 4-4'
          />
        </svg>
      </button>
      <div
        className={clsx(
          'invisible absolute z-10 mt-1 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow group-hover:visible dark:divide-gray-600 dark:bg-gray-700'
        )}
      >
        <div className='px-4 py-3 text-sm text-gray-900 dark:text-white'>
          <div className='font-medium '>Pro User</div>
          <div className='truncate'>name@flowbite.com</div>
        </div>
        <ul
          className='py-2 text-sm text-gray-700 dark:text-gray-200'
          aria-labelledby='dropdownInformdropdownAvatarNameButtonationButton'
        >
          <li>
            <a
              href='#'
              className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href='#'
              className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href='#'
              className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
            >
              Earnings
            </a>
          </li>
        </ul>
        <div className='py-2'>
          <a
            href='#'
            className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
          >
            Sign out
          </a>
        </div>
      </div>
    </div>
  );
}

export default function LoginLink() {
  const { isAuthenticated } = useAuthState();

  return (
    <>
      {isAuthenticated ? (
        <AuthenticatedMenuDropdown />
      ) : (
        <>
          <Link href='/login'>Login</Link>
          <Link href='/register'>
            <a className='block rounded-md bg-slate-700 px-5 py-2 text-white'>
              Register
            </a>
          </Link>
        </>
      )}
    </>
  );
}
