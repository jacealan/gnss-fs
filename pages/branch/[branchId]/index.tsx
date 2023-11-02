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
        <title>{branch?.branchTitle}</title>
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
