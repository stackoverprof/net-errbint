import '../styles/globals.css'
import '../styles/typefaces.css'

import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return ( 
  <>
    <Head>
        <title>Errbint.NET</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <meta name="theme-color" content="#060410"/>
    </Head>
    <Component {...pageProps} />
  </>
  );
}

export default MyApp