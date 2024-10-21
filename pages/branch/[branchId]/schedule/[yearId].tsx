import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import { GetServerSidePropsContext } from "next" // SSR

import { Center, VStack, Box } from "@chakra-ui/react"

import theme from "@/components/outer/theme.json"
import branches from "@/components/outer/branches.json"
import DetailHead from "@/components/outer/detailHead"
import Nav from "@/components/outer/nav"
import DetailTitle from "@/components/outer/detailTitle"
import DetailBottom from "@/components/outer/detailBottom"
import DetailSchedule from "@/components/outer/detailSchedule"
import Footer from "@/components/outer/footer"
// import DetailSchedule from "@/app/detailScheduleJson";

import getBranch from "@/lib/getBranch"

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryData = await context.query
  const branchData = await getBranch(queryData.branchId || "")

  return {
    props: {
      branchId: queryData.branchId,
      targetId: queryData.yearId,
      // targetId: queryData.yearId,
      branch: branchData,
    },
  }
}

export default function Schedule({
  branchId,
  targetId,
  branch,
}: {
  branchId: string
  targetId: number
  branch: any
}) {
  // const router = useRouter()
  // const { branchId: branchId, yearId: targetId } = router.query
  // // const branch = branches[branchId as keyof typeof branches]
  // const [branch, setBranch] = useState<any>(null)

  // useEffect(() => {
  //   // if (teamId !== "" && teamId !== undefined) getTeam(teamId)
  //   if (branchId) {
  //     const _ = async () => {
  //       setBranch(await getBranch(branchId))
  //     }
  //     _()
  //   }
  // }, [branchId])

  // console.log(branch)
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`https://gnss.co.kr/branch/${branchId}/schedule/${targetId}`}
        />
        <title>{`${branch?.branchTitle} 학원 시간표`}</title>
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
      <main style={{ overflowY: "hidden" }}>
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
              {/* <DetailHead branch={branch} yearId={yearId} detail="schedule" />
              <DetailTitle branch={branch} yearId={yearId} detail="schedule" />
              <DetailSchedule branch={branch} yearId={yearId} />
              <DetailBottom branch={branch} yearId={yearId} detail="schedule" /> */}
              <DetailHead
                branch={branch}
                targetId={targetId}
                detail="Schedule"
              />
              <DetailTitle
                branch={branch}
                targetId={targetId}
                detail="Schedule"
              />
              <DetailSchedule
                branch={branch}
                targetId={targetId}
                detail="Schedule"
              />
              <DetailBottom
                branch={branch}
                targetId={targetId}
                detail="Schedule"
              />
            </VStack>
          </Center>
          <Footer />
        </div>
      </main>
    </>
  )
}
