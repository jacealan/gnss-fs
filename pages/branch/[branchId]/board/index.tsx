import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"

import { useRealViewport } from "next-real-viewport"
import { Flex, Center, Box, Image } from "@chakra-ui/react"
import getBranch from "@/lib/getBranch"

import { HiChevronRight } from "react-icons/hi2"
import { TbPhoneCall } from "react-icons/tb"

export default function Branch() {
  const { vw, vh } = useRealViewport()
  const [vwC, setVwC] = useState(350)
  const router = useRouter()
  const { branchId: branchId, yearId: targetId } = router.query
  // const branch = branches[branchId as keyof typeof branches]
  const [branch, setBranch] = useState<any>(null)

  useEffect(() => {
    // if (teamId !== "" && teamId !== undefined) getTeam(teamId)
    if (branchId) {
      const _ = async () => {
        await setBranch(await getBranch(branchId))
      }
      _()
    }

    // if (branchId === "PlSj") router.push("/branch/PlSj/qr")
  }, [branchId])

  if (branch && branch.boardButton.length == 0) {
    router.push("/")
  }

  useEffect(() => {
    if (vw) {
      if (vw * 100 > 760) {
        setVwC(760)
      } else if (vw * 100 > 350) {
        setVwC(vw * 100)
      } else {
        setVwC(350)
      }
    }
  }, [vw])
  return (
    <Box>
      <Head>
        <link
          rel="canonical"
          href={`https://gnss.co.kr/branch/${branchId}/board`}
        />
        <title>{branch?.branchTitle} 학원</title>
        <meta name="keywords" content="개념상상 학원, 개념폴리아 학원" />
        <meta name="description" content="수학은 개념상상,개념폴리아" />
        <meta property="og:title" content="개념상상 | 개념폴리아" />
        <meta property="og:description" content="수학은 개념상상,개념폴리아" />
        <meta
          property="og:image"
          content="//gnss.co.kr/assets/images/og1605x647.png"
        />
        <meta property="og:type" content="website" />
      </Head>
      <Flex
        minWidth="350px"
        justifyContent="center"
        alignItems={"flex-start"}
        bgColor="#fff"
      >
        <Center
          width={vwC}
          minWidth="350px"
          flexDirection={"column"}
          boxShadow={"lg"}
        >
          <Box
            width="100%"
            height=""
            bgColor={branch?.boardBGColor}
            bgImage="/assets/images/board_top_pattern.png"
            bgSize={"cover"}
            boxShadow={"md"}
          >
            <Center
              mt={vwC / 8}
              fontSize={vw && (24 / (760 / vwC)).toString() + "px"}
              fontFamily={"Noto Sans KR"}
              color="#fff"
            >
              최상급 초중등 수학/과학 전문학원
            </Center>
            <Center
              color={branch?.boardColor}
              fontSize={vw && (86 / (760 / vwC)).toString() + "px"}
              fontFamily={"GmarketSans"}
              fontWeight={700}
              mt={-vwC / 40}
            >
              {branch?.brand}
            </Center>
            <Center
              color="white"
              fontSize={vw && (86 / (760 / vwC)).toString() + "px"}
              fontFamily={"GmarketSans"}
              fontWeight={700}
              mt={-vwC / 20}
            >
              {branch?.branchShort}
            </Center>
            <Center width="100%">
              <Center
                color="white"
                bgColor="#1e1e1e"
                fontSize={vw && (40 / (760 / vwC)).toString() + "px"}
                fontFamily={"GmarketSans"}
                fontWeight={700}
                mt={-vwC / 40}
                mb={vwC / 10}
                width="70%"
              >
                {branch?.boardConcept}
              </Center>
            </Center>
          </Box>
          <Center
            flexDirection={"column"}
            bgColor="#fff"
            border={`solid 1px ${branch?.boardBGColor}`}
            borderRadius={8}
            width={vwC * 0.77}
            mt={-vwC * 0.06}
            mb={vwC * 0.1}
            boxShadow={"md"}
          >
            {branch?.boardButton.map((button: any, index: number) => (
              <div key={index}>
                <Link href={button.link} target="_blank">
                  <Flex
                    justifyContent={"center"}
                    border={`solid 1px ${branch?.boardBGColor}`}
                    borderRadius={8}
                    width={vwC * 0.63}
                    height={vwC * 0.09}
                    fontSize={vwC * 0.037}
                    fontFamily={"Noto Sans KR"}
                    mt={vwC * 0.08}
                    boxShadow={"base"}
                  >
                    <Center
                      ml={vwC * 0.01}
                      width={vwC * 0.07}
                      height="100%"
                    ></Center>
                    <Center
                      width="100%"
                      fontSize={vwC * 0.037}
                      fontFamily={"Noto Sans KR"}
                    >
                      {button.title}
                    </Center>
                    <Center mr={vwC * 0.01} width={vwC * 0.07} height="100%">
                      <HiChevronRight />
                    </Center>
                  </Flex>
                </Link>
              </div>
            ))}
            <Link href={`tel://${branch?.target0Phone}`}>
              <Flex
                justifyContent={"center"}
                bgColor={branch?.boardBGColor}
                color="#fff"
                border={`solid 2px ${branch?.boardBGColor}`}
                borderRadius={8}
                width={vwC * 0.63}
                height={vwC * 0.09}
                fontSize={vwC * 0.037}
                fontFamily={"Noto Sans KR"}
                mt={vwC * 0.08}
                boxShadow={"base"}
              >
                <Center ml={vwC * 0.05} width={vwC * 0.1} height="100%">
                  <TbPhoneCall />
                </Center>
                <Center
                  width="100%"
                  fontSize={vwC * 0.037}
                  fontFamily={"Noto Sans KR"}
                >
                  상담문의 전화
                </Center>
                <Center
                  mr={vwC * 0.05}
                  width={vwC * 0.1}
                  height="100%"
                ></Center>
              </Flex>
            </Link>

            <Image
              src="/assets/logos/gnpolya_t.png"
              width="36%"
              mt={vwC * 0.08}
              mb={vwC * 0.06}
            />
          </Center>
        </Center>
      </Flex>
      {/* <Box>
        {vw},{vh}
      </Box> */}
    </Box>
  )
}
