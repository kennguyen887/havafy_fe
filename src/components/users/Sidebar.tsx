import Link from 'next/link';
import Router from 'next/router';
import React from 'react';

import { useAuthState } from '@/contexts/AuthContext';

export default function Sidebar() {
  const { resetAuth } = useAuthState();
  const gotoPage = (page: string): void => {
    Router.push(page);
  };

  return (
    <>
      <div className='relative flex flex-col'>
        <nav className='flex min-w-[240px] flex-col gap-1 p-2 font-sans text-sm font-normal text-gray-700'>
          <div
            role='button'
            onClick={() => gotoPage('/user/account')}
            className='flex w-full items-center rounded-lg p-3 text-start leading-tight outline-none transition-all hover:bg-blue-50 hover:bg-opacity-80 hover:text-blue-900 focus:bg-blue-50 focus:bg-opacity-80 focus:text-blue-900 active:bg-blue-50 active:bg-opacity-80 active:text-blue-900'
          >
            <div className='mr-4 grid place-items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                aria-hidden='true'
                className='h-5 w-5'
              >
                <path
                  fillRule='evenodd'
                  d='M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
            <Link href=''>Account</Link>
          </div>
          <div
            role='button'
            onClick={() => gotoPage('/user/password')}
            className='flex w-full items-center rounded-lg p-3 text-start leading-tight outline-none transition-all hover:bg-blue-50 hover:bg-opacity-80 hover:text-blue-900 focus:bg-blue-50 focus:bg-opacity-80 focus:text-blue-900 active:bg-blue-50 active:bg-opacity-80 active:text-blue-900'
          >
            <div className='mr-4 grid place-items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                aria-hidden='true'
                className='h-5 w-5'
              >
                <path
                  fillRule='evenodd'
                  d='m8.533.133 5.25 1.68A1.75 1.75 0 0 1 15 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.697 1.697 0 0 1-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 0 1 1.217-1.667l5.25-1.68a1.748 1.748 0 0 1 1.066 0Zm-.61 1.429.001.001-5.25 1.68a.251.251 0 0 0-.174.237V7c0 1.36.275 2.666 1.057 3.859.784 1.194 2.121 2.342 4.366 3.298a.196.196 0 0 0 .154 0c2.245-.957 3.582-2.103 4.366-3.297C13.225 9.666 13.5 8.358 13.5 7V3.48a.25.25 0 0 0-.174-.238l-5.25-1.68a.25.25 0 0 0-.153 0ZM9.5 6.5c0 .536-.286 1.032-.75 1.3v2.45a.75.75 0 0 1-1.5 0V7.8A1.5 1.5 0 1 1 9.5 6.5Z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
            <Link href='/user/password'>Password</Link>
          </div>

          <div
            role='button'
            className='flex w-full items-center rounded-lg p-3 text-start leading-tight outline-none transition-all hover:bg-blue-50 hover:bg-opacity-80 hover:text-blue-900 focus:bg-blue-50 focus:bg-opacity-80 focus:text-blue-900 active:bg-blue-50 active:bg-opacity-80 active:text-blue-900'
          >
            <div className='mr-4 grid place-items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                aria-hidden='true'
                className='h-5 w-5'
              >
                <path
                  fillRule='evenodd'
                  d='M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
            Settings
          </div>

          <div className='my-3 border-t border-slate-200'></div>
          <div
            role='button'
            onClick={() => resetAuth !== undefined && resetAuth()}
            className='flex w-full items-center rounded-lg p-3 text-start leading-tight outline-none transition-all hover:bg-blue-50 hover:bg-opacity-80 hover:text-blue-900 focus:bg-blue-50 focus:bg-opacity-80 focus:text-blue-900 active:bg-blue-50 active:bg-opacity-80 active:text-blue-900'
          >
            <div className='mr-4 grid place-items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                aria-hidden='true'
                className='h-5 w-5'
              >
                <path
                  fillRule='evenodd'
                  d='M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
            Log Out
          </div>
        </nav>
      </div>
    </>
  );
}
