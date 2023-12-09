import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import styles from "@/styles/Home.module.css"

import { Box, Center, VStack } from "@chakra-ui/react"

import Nav from "@/components/outer/nav"
import Footer from "@/components/outer/footer"
import BranchListTitle from "@/components/outer/branchListTitle"
import Tv from "@/components/outer/tv"
import LocationBox from "@/components/outer/locationBox"
import Slideshow from "@/components/outer/slideshow"

export default function Home() {
  return (
    <>
      <Head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_URL}`} />
        <title>개념상상 학원 | 개념폴리아 학원</title>
        <meta name="keywords" content="개념상상 학원, 개념폴리아 학원" />
        <meta
          name="description"
          // content="수학은 개념상상 학원, 개념폴리아 학원"
          content="최상급 초중고 수학,과학 전문학원"
        />
        {/* open graph */}
        <meta property="og:title" content="개념상상 학원 | 개념폴리아 학원" />
        <meta
          property="og:description"
          // content="수학은 개념상상 학원, 개념폴리아 학원"
          content="최상급 초중고 수학,과학 전문학원"
        />
        <meta
          property="og:image"
          content="//gnss.co.kr/assets/images/og1605x647.png"
        />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Nav />
        <div
          style={{
            width: "100%",
            marginTop: "66px",
          }}
        >
          <Slideshow />

          <Center>
            <VStack width={{ base: "100%", xl: "992px" }}>
              <BranchListTitle />
              <LocationBox />
              <Tv />
            </VStack>
          </Center>
          <Footer />
        </div>
      </main>
    </>
  )
}
