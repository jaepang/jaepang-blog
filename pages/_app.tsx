import './styles/global.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>jaepang-blog</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
