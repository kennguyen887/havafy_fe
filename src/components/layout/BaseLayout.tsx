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
    </>
  );
}
