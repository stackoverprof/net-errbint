import '../styles/globals.css'
import '../styles/componential.css'
import '../styles/typefaces.css'

import NextNprogress from 'nextjs-progressbar'
import Head from 'next/head'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // document.removeEventListener()
  }, [])

  return ( 
  <>
    <Head>
        <title>Errbint.NET</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <meta name="theme-color" content="#060410"/>
    </Head>
    <NextNprogress
      color="#FFCB11"
      startPosition={0.3}
      stopDelayMs={200}
      height="3"
    />
    <Component {...pageProps} />
  </>
  )
}

export default MyApp