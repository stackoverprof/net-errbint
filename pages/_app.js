import '../styles/globals.css'
import '../styles/componential.css'
import '../styles/typefaces.css'

import NextNprogress from 'nextjs-progressbar'
import Head from 'next/head'
// import Loader from '../components/spinner/Spinkit1'

function MyApp({ Component, pageProps }) {
  return ( 
  <>
    <Head>
        <title>Errbint.NET</title>
        <meta name="theme-color" content="#060410"/>
    </Head>
    <NextNprogress
      color="#FFCB11"
      startPosition={0.3}
      stopDelayMs={200}
      height="3"
    />
    {/* <Loader /> */}
    <Component {...pageProps} />
  </>
  )
}

export default MyApp