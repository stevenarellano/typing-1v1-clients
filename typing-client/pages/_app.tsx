import '/styles/global/globals.scss';

import Head from 'next/head';
import type { AppProps } from 'next/app';

import { RecoilRoot } from 'recoil';


export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>Device Link</title>
        <meta
          name="description"
          content="A webapp"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </main>

    </>
  );
}
