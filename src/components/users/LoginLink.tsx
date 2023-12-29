import { useGoogleOneTapLogin } from '@react-oauth/google';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { setItem } from '@/lib/localStorage';
import { postApi } from '@/lib/request';

import { useAuthState } from '@/contexts/AuthContext';

function AuthenticatedMenuDropdown() {
  const { resetAuth } = useAuthState();
  return (
    <div className='group'>
      <button
        className='flex items-center rounded-full pe-1 text-sm font-medium text-gray-900 group-hover:text-blue-600 group-hover:ring-4 group-hover:ring-gray-100 dark:text-white dark:group-hover:text-blue-500 dark:group-hover:ring-gray-700 md:me-0'
        type='button'
      >
        <span className='sr-only'>Open user menu</span>
        <div className='mr-2'>
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
      <div className='mt-2'>
        <div
          className={clsx(
            'invisible absolute z-10  w-44 divide-y divide-gray-100 rounded bg-white shadow group-hover:visible dark:divide-gray-600 dark:bg-gray-700'
          )}
        >
          <ul
            className='my-2 text-sm text-gray-700 dark:text-gray-200'
            aria-labelledby='dropdownInformdropdownAvatarNameButtonationButton'
          >
            <li>
              <Link href='/user/account'>
                <a className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                  Account
                </a>
              </Link>
            </li>
            <li>
              <Link href='/user/password'>
                <a className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                  Change password
                </a>
              </Link>
            </li>
          </ul>
          <div className='my-2'>
            <button
              onClick={() => resetAuth !== undefined && resetAuth()}
              className='block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
            >
              Sign out
            </button>
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
    disabled: isAuthenticated,
  });

  return (
    <>
      {isAuthenticated ? (
        <AuthenticatedMenuDropdown />
      ) : (
        <>
          <Link href='/user/login'>
            <a className='text-sm font-semibold'>Login</a>
          </Link>
          <Link href='/user/register'>
            <a className='block rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold  text-white'>
              Register
            </a>
          </Link>
        </>
      )}
    </>
  );
}
