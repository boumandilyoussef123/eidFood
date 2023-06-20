import '@/styles/globals.css'
import { Roboto } from '@next/font/google'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

const RobotoFont = Roboto({
  weight: '400',
  subsets: ['latin']
})


export default function App({ Component,
  pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Eid Food</title>
        <meta name="description" content="Eid Food" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="px-3 py-6 md:px-6 lg:px-12">
        <Toaster />
        <Navbar />
        <main className={(RobotoFont.className)}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </SessionProvider>
  )
}
