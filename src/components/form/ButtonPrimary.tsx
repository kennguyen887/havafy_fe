import clsx from 'clsx';
import * as React from 'react';

interface ButtonProps {
  isLoading?: boolean;
  className?: string;
  name: string;
  onClick?: () => void;
}
export default function ButtonPrimary({
  name,
  onClick,
  className,
  isLoading,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        className,
        'hover:bg-slate-100 group relative inline-flex  items-center justify-start overflow-hidden rounded-none border bg-gray-800 py-4 pl-7 pr-12 text-xs font-semibold text-gray-100 transition-all duration-150 ease-in-out hover:pl-10 hover:pr-6 lg:text-sm'
      )}
      onClick={onClick}
    >
      <span className='absolute bottom-0 left-0 h-1 w-full bg-transparent transition-all duration-150 ease-in-out group-hover:h-full'></span>
      <span className='absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12'>
        <svg
          className='h-5 w-5  text-gray-200'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M14 5l7 7m0 0l-7 7m7-7H3'
          ></path>
        </svg>
      </span>
      <span className='absolute  left-0 -translate-x-12 pl-2.5 duration-200 ease-out group-hover:translate-x-0'>
        <svg
          className='text-gray-10 h-5 w-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M14 5l7 7m0 0l-7 7m7-7H3'
          ></path>
        </svg>
      </span>
      <span className='group-hover:text-gray-10 relative flex w-full items-center justify-center text-center transition-colors duration-200 ease-in-out'>
        {isLoading ? (
          <>
            <svg
              className='-ml-1 mr-3 h-5 w-5 animate-spin text-gray-800'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              ></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              ></path>
            </svg>
            <span className='mt-1 text-xs'>Loading...</span>
          </>
        ) : (
          <>{name}</>
        )}
      </span>
    </button>
  );
}
