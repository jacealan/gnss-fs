import * as gtag from "@/lib/gtag"
import Script from "next/script"

import "@/styles/globals.css"
import "@/styles/calendar.css"

import type { AppProps } from "next/app"

import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"
import { RealViewportProvider } from "next-real-viewport"
import Layout from "@/components/layout"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtag.GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      <RealViewportProvider>
        <SessionProvider session={pageProps.session}>
          <ChakraProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </SessionProvider>
      </RealViewportProvider>
    </>
  )
}
