import { useGoogleOneTapLogin } from '@react-oauth/google';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { setItem } from '@/lib/localStorage';
import { postApi } from '@/lib/request';

import { useAuthState } from '@/contexts/AuthContext';

function AuthenticatedMenuDropdown() {
  const { resetAuth, user } = useAuthState();
  return (
    <div className='group'>
      <button
        className='dark:text-white dark:group-hover:text-blue-500 dark:group-hover:ring-gray-700 flex h-5 items-center rounded-full text-sm font-medium text-gray-900 group-hover:text-blue-600 group-hover:ring-4 group-hover:ring-gray-100 md:me-0'
        type='button'
      >
        <span className='sr-only'>Open user menu</span>
        <div className='mr-2 mt-1'>
          <Image
            className='h-6 w-6 rounded-full'
            width={24}
            height={24}
            src={user?.avatar ? user?.avatar : '/images/user/user.png'}
            alt='user photo'
          />
        </div>
        <span className='text-xs'>{user?.firstName}</span>
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
      <div className='mt-2'>
        <div
          className={clsx(
            'dark:divide-gray-600 dark:bg-gray-700 invisible  absolute z-10 w-44 divide-y divide-gray-100 rounded bg-white shadow group-hover:visible'
          )}
        >
          <ul
            className='dark:text-gray-200 my-2 text-sm text-gray-700'
            aria-labelledby='dropdownInformdropdownAvatarNameButtonationButton'
          >
            <li>
              <Link
                href='/user/account'
                className='dark:hover:bg-gray-600 dark:hover:text-white block px-4 py-2 hover:bg-gray-100'
              >
                Account
              </Link>
            </li>
            <li>
              <Link
                href='/user/password'
                className='dark:hover:bg-gray-600 dark:hover:text-white block px-4 py-2 hover:bg-gray-100'
              >
                Change password
              </Link>
            </li>
          </ul>
          <div className='my-2'>
            <div
              role='button'
              onClick={() => resetAuth !== undefined && resetAuth()}
              className='dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
            >
              Sign out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginLink() {
  const { isAuthenticated, loadAuth } = useAuthState();

  useGoogleOneTapLogin({
    onSuccess: async ({ credential }) => {
      try {
        const data = await postApi('user/login/google', {
          credential,
        });

        if (data && loadAuth) {
          setItem('auth', data.token);
          loadAuth();
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Error on login', e);
      }
    },
    onError: () => {
      // eslint-disable-next-line no-console
      console.log('Login Failed');
    },
    auto_select: true,
    disabled: !!isAuthenticated,
  });

  return (
    <>
      {isAuthenticated ? (
        <AuthenticatedMenuDropdown />
      ) : (
        <>
          <Link
            href='/become-an-expert'
            className='animated-underline text-white'
          >
            become an expert
          </Link>
          <Link
            href='/hire-an-expert'
            className='block  bg-[#f0f0f0] px-4 py-2 text-sm font-semibold  text-gray-900'
          >
            hire an expert
          </Link>
        </>
      )}
    </>
  );
}
