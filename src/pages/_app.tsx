import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { AppProps } from 'next/app';
import Router from 'next/router';
import { useRemoteRefresh } from 'next-remote-refresh/hook';
import { ThemeProvider } from 'next-themes';
import nProgress from 'nprogress';
import * as React from 'react';
import { SWRConfig } from 'swr';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import 'react-tippy/dist/tippy.css';
import '@/styles/globals.css';
import '@/styles/carbon.css';
import '@/styles/mdx.css';
import '@/styles/nprogress.css';

import { getFromLocalStorage } from '@/lib/helper.client';

import { blockDomainMeta } from '@/constants/env';
import { AuthProvider } from '@/contexts/AuthContext';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Don't increment views if not on main domain
    if (
      window.location.host !==
        (process.env.NEXT_PUBLIC_BLOCK_DOMAIN_WHITELIST || 'havafy.com') &&
      blockDomainMeta
    ) {
      if (getFromLocalStorage('incrementMetaFlag') !== 'false') {
        localStorage.setItem('incrementMetaFlag', 'false');
        // reload page to make changes
        window.location.reload();
      }
    }
  }, []);

  useRemoteRefresh();

  return (
    <>
      <AuthProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
        >
          <SWRConfig
            value={{
              fetcher: (url) => axios.get(url).then((res) => res.data),
            }}
          >
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GCLOUD_CLIENT_ID || ''}
            >
              <Component {...pageProps} />
            </GoogleOAuthProvider>
          </SWRConfig>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
