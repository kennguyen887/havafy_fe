import * as React from 'react';

import BaseHeader from '@/components/layout/BaseHeader';

import { PreloadProvider } from '@/contexts/PreloadContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BaseHeader />
      <PreloadProvider>
        <div id='skip-nav'>{children}</div>
      </PreloadProvider>

      <div className='my-10 flex w-full space-x-4 text-sm text-gray-800 md:mx-20'>
        <div className=''>© {new Date().getFullYear()} Havafy, Inc.</div>

        <div>privacy policy</div>
        <div>terms of service</div>
      </div>
    </>
  );
}
