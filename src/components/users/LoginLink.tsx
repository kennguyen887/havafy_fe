import Link from 'next/link';
import React from 'react';

import { useAuthState } from '@/contexts/AuthContext';

export default function LoginLink() {
  const { isAuthenticated } = useAuthState();

  return (
    <>
      {isAuthenticated ? (
        <div> isAuthenticated </div>
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
