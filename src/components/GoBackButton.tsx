import clsx from 'clsx';
import * as React from 'react';

export default function GoBackButton({
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
        'group relative my-8 inline-flex items-center justify-start text-sm text-gray-800 hover:text-red-700'
      )}
    >
      <span className='absolute left-0 -translate-x-2  duration-200 ease-linear group-hover:translate-x-0'>
        <svg
          className='h-3 w-3 text-black'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 52 52'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M38,52a2,2,0,0,1-1.41-.59l-24-24a2,2,0,0,1,0-2.82l24-24a2,2,0,0,1,2.82,0,2,2,0,0,1,0,2.82L16.83,26,39.41,48.59A2,2,0,0,1,38,52Z' />
        </svg>
      </span>
      <span className='-translate-x-2 pl-4  duration-200 ease-out group-hover:translate-x-0'>
        {name}
      </span>
    </button>
  );
}
