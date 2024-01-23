import clsx from 'clsx';
import * as React from 'react';

interface ButtonProps {
  isLoading?: boolean;
  className?: string;
  name: string;
  onClick?: () => void;
}
export default function FlatButton({
  name,
  onClick,
  className,
  isLoading,
}: ButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={clsx(
          className,
          'rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
        )}
      >
        {isLoading ? (
          <span className='mt-1 text-xs'>Loading...</span>
        ) : (
          <>{name}</>
        )}
      </button>
    </>
  );
}
