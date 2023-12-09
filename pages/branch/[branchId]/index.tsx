import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

import { useRealViewport } from "next-real-viewport"
import { Flex, Center, Box, Image } from "@chakra-ui/react"
import getBranch from "@/lib/getBranch"

import QRSsMd from "@/components/outer/qr/SsMd"
import QRPlSj from "@/components/outer/qr/PlSj"

export default function Branch() {
  const { vw, vh } = useRealViewport()
  const router = useRouter()
  const { branchId: branchId, yearId: targetId } = router.query
  // const branch = branches[branchId as keyof typeof branches]
  const [branch, setBranch] = useState<any>(null)

  useEffect(() => {
    // if (teamId !== "" && teamId !== undefined) getTeam(teamId)
    if (branchId) {
      const _ = async () => {
        setBranch(await getBranch(branchId))
      }
      _()
    }

    // if (branchId === "PlSj") router.push("/branch/PlSj/qr")
  }, [branchId])
  return (
    <>
      <Head>
        <link rel="canonical" href={`https://gnss.co.kr/branch/${branchId}`} />
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
      <Flex justifyContent="center">
        <Box
          width={vw && (vw * 100 > 700 ? "700" : "100vw")}
          height={vw && (vw * 100 > 700 ? "889" : "auto")}
        >
          {branchId == "SsMd" && (
            <QRSsMd
              width={vw ? (vw * 100 > 700 ? "700" : "100vw") : ""}
              height={vw ? (vw * 100 > 700 ? "889" : "auto") : ""}
            />
          )}
          {branchId == "PlSj" && (
            <QRPlSj
              width={vw ? (vw * 100 > 700 ? "700" : "100vw") : ""}
              height={vw ? (vw * 100 > 700 ? "889" : "auto") : ""}
            />
          )}
        </Box>
      </Flex>
    </>
  )
}
