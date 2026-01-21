import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import styles from "@/styles/Home.module.css"

import { Box, Center, Flex, VStack } from "@chakra-ui/react"

import Nav from "@/components/outer/nav"
import Footer from "@/components/outer/footer"
import BranchListTitle from "@/components/outer/branchListTitle"
import Tv from "@/components/outer/tv"
import LocationBox from "@/components/outer/locationBox"
import Slideshow from "@/components/outer/slideshow"

const branchesData = [
  {
    name: "개념상상 대치관",
    phone: "02-567-0508",
    address: "서울특별시 강남구 도곡로 418, 4층(대치동)",
  },
  {
    name: "개념폴리아 대치관",
    phone: "02-557-4808",
    address: "서울특별시 강남구 남부순환로 2911-1",
  },
  {
    name: "개념상상 SM관",
    phone: "02-569-7440",
    address: "서울특별시 강남구 도곡로 511 대진빌딩 4층",
  },
  {
    name: "개념상상·개념폴리아 압구정관",
    phone: "02-547-4808",
    address: "서울특별시 강남구 압구정로30길 17 이소니프라자 5층",
  },
  {
    name: "개념폴리아 삼성청담관",
    phone: "02-565-4808",
    address: "서울특별시 강남구 삼성로 119길 14 주호빌딩 4층",
  },
  {
    name: "개념폴리아 서초1관",
    phone: "02-591-4808",
    address: "서울특별시 서초구 서초중앙로 225 남도빌딩 5층",
  },
  {
    name: "개념폴리아 서초2관",
    phone: "02-558-2500",
    address: "서울특별시 서초구 서초중앙로33길 6-6 신청담빌딩 1층",
  },
  {
    name: "개념폴리아 서초3관",
    phone: "02-595-4808",
    address: "서울특별시 서초구 고무래로 22 쌍동빌딩 서관 5층",
  },
  {
    name: "개념상상 서초관",
    phone: "02-594-4808",
    address: "서울특별시 서초구 명달로9길 6 제중빌딩 2층",
  },
  {
    name: "개념폴리아 방배관",
    phone: "02-533-4808",
    address: "서울특별시 서초구 서초대로 39 2층",
  },
  {
    name: "개념폴리아 잠실관",
    phone: "02-423-4808",
    address: "서울특별시 송파구 삼전로 100 아카데미빌딩 6층",
  },
  {
    name: "개념상상 잠실관",
    phone: " 02-422-4808",
    address: "서울특별시 송파구 백제고분로21길 35 창원빌딩 3층",
  },
  {
    name: "개념상상2관학원",
    phone: " 02-425-4808",
    address: "서울특별시 송파구 삼전로 89 영빌딩 2층",
  },
  {
    name: "개념폴리아 평촌관",
    phone: "031-344-4808",
    address: "경기도 안양시 동안구 평촌대로 129, 301호(호계동, 신흥상가)",
  },
  {
    name: "개념폴리아 수지관",
    phone: "031-262-4808",
    address: "경기도 용인시 수지구 풍덕천로 122 하나로 프라자 5층",
  },
  {
    name: "개념폴리아 동탄관",
    phone: "031-375-4808",
    address: "경기도 화성시 동탄순환대로 127-19 동탄에스비타운 8층",
  },
  {
    name: "개념폴리아 다산관",
    phone: "031-556-4808",
    address: "경기도 남양주시 다산순환로 356 푸리마타워 4층",
  },
  {
    name: "메이커즈_개념폴리아 송도학원",
    phone: "032-859-8892",
    address: "인천광역시 연수구 해돋이로152번길 9, 7층(703 704 705)",
  },
]

export default function Branches() {
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
          <Center>
            <Flex
              alignItems={"stretch"}
              flexWrap={"wrap"}
              width={{ base: "100%", lg: "992px" }}
              p={4}
            >
              {branchesData.map((branch) => (
                <Box
                  key={branch.name}
                  maxWidth={{ base: "100%", md: "49%" }}
                  flexGrow={1}
                  border="solid 1px #ccc"
                  borderRadius={10}
                  // p="4px 8px 4px 8px"
                  p={4}
                  m={1}
                  _hover={{ border: "solid 1px #555" }}
                >
                  <Box fontWeight={700} mb={2}>
                    {branch.name}
                  </Box>
                  <Box>
                    <Link href={`tel://${branch.phone}`}>{branch.phone}</Link>
                  </Box>
                  <Box>
                    <Link
                      href={`https://map.naver.com/v5/search/${branch.address}`}
                      target="_blank"
                    >
                      {branch.address}
                    </Link>
                  </Box>
                </Box>
              ))}
            </Flex>
          </Center>
          <Footer />
        </div>
      </main>
    </>
  )
}
