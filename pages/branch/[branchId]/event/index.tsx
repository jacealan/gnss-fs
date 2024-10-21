import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import { GetServerSidePropsContext } from "next" // SSR

import { useRealViewport } from "next-real-viewport"
import { Flex, Center, Box, Image } from "@chakra-ui/react"
import getBranch from "@/lib/getBranch"
import EventPlDt from "@/components/outer/event/PlDt"

import { HiChevronRight } from "react-icons/hi2"
import { TbPhoneCall } from "react-icons/tb"

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryData = await context.query
  const branchData = await getBranch(queryData.branchId || "")

  return {
    props: {
      branchId: queryData.branchId,
      // targetId: queryData.yearId,
      branch: branchData,
    },
  }
}

export default function Event({
  branchId,
  // targetId,
  branch,
}: {
  branchId: string
  // targetId: number
  branch: any
}) {
  const { vw, vh } = useRealViewport()
  const [vwC, setVwC] = useState(350)
  // const router = useRouter()
  // const { branchId: branchId, yearId: targetId } = router.query
  // // const branch = branches[branchId as keyof typeof branches]
  // const [branch, setBranch] = useState<any>(null)

  // useEffect(() => {
  //   // if (teamId !== "" && teamId !== undefined) getTeam(teamId)
  //   if (branchId) {
  //     const _ = async () => {
  //       await setBranch(await getBranch(branchId))
  //     }
  //     _()
  //   }

  //   // if (branchId === "PlSj") router.push("/branch/PlSj/qr")
  // }, [branchId])

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
        <link rel="canonical" href={`https://gnss.co.kr/branch/${branchId}`} />
        <title>{`${branch?.branchTitle} 학원`}</title>
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
      <Flex justifyContent="center">
        <Box
          width={vw && (vw * 100 > 700 ? "700" : "100vw")}
          height={vw && (vw * 100 > 700 ? "889" : "auto")}
        >
          {branchId == "PlDt" && (
            <EventPlDt
            // width={vw ? (vw * 100 > 700 ? "700" : "100vw") : ""}
            // height={vw ? (vw * 100 > 700 ? "889" : "auto") : ""}
            />
          )}
        </Box>
      </Flex>
    </Box>
  )
}
