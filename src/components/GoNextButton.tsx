import clsx from 'clsx';
import * as React from 'react';

export default function GoNextButton({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <button
      className={clsx(
        className,
        'group relative inline-flex items-center justify-start text-sm text-gray-800 hover:text-red-700'
      )}
    >
      <span className='-translate-x-2 pl-4  duration-200 ease-out group-hover:translate-x-0'>
        {name}
      </span>
      <span className='absolute right-0 -translate-x-2  duration-200 ease-linear group-hover:translate-x-0'>
        <svg
          className='-mr-80 h-5 w-5 text-gray-600'
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
    </button>
  );
}
