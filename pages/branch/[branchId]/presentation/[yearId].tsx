import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"

import { Center, VStack, Box } from "@chakra-ui/react"

import theme from "@/components/outer/theme.json"
import branches from "@/components/outer/branches.json"
import DetailHead from "@/components/outer/detailHead"
import Nav from "@/components/outer/nav"
import DetailTitle from "@/components/outer/detailTitle"
import DetailBottom from "@/components/outer/detailBottom"
import DetailKeynote from "@/components/outer/detailKeynote"
import Footer from "@/components/outer/footer"

import getBranch from "@/lib/getBranch"

export default function Keynote() {
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
  }, [branchId])

  return (
    <>
      {/* <Head>
         <title>
          {branch?.brand}&nbsp;
          {branch?.location}&nbsp;
          {branch?.brand === "개념폴리아"
            ? `(${branch[`year${yearId}` as keyof typeof branch]}) `
            : ""}
          설명회
        </title> 
        <meta name="description" content="수학은 개념상상,개념폴리아" />
        <meta property="og:title" content="개념상상 | 개념폴리아" />
        <meta property="og:description" content="수학은 개념상상,개념폴리아" />
        <meta
          property="og:image"
          content="//gnss.co.kr/assets/images/og1605x647.png"
        />
      </Head> */}
      <main>
        <Nav />
        <div
          style={{
            position: "fixed",
            top: "66px",
            left: 0,
            width: "100vw",
            // marginTop: "66px",
            height: "calc(100vh - 66px)",
            overflowY: "scroll",
          }}
        >
          <Center>
            <VStack width={{ base: "100%", lg: "992px" }}>
              <DetailHead
                branch={branch}
                targetId={targetId}
                detail="Keynote"
              />
              <DetailTitle
                branch={branch}
                targetId={targetId}
                detail="Keynote"
              />
              <DetailKeynote
                branch={branch}
                targetId={targetId}
                detail="Keynote"
              />
              <DetailBottom
                branch={branch}
                targetId={targetId}
                detail="Keynote"
              />
            </VStack>
          </Center>
          <Footer />
        </div>
      </main>
    </>
  )
}
