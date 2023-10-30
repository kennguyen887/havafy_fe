import Link from 'next/link';
import React from 'react';

export default function LoginLink() {
  return (
    <>
      <Link href='/login'>Login</Link>
      <Link href='/register'>
        <a className='block rounded-md bg-slate-700 px-5 py-2 text-white'>
          Register
        </a>
      </Link>
    </>
  );
}
