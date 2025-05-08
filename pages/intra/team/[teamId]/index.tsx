import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import type { NextPage } from "next"
import Head from "next/head"

import Calendar from "@/components/intra/team/calendar"
import NewStat from "@/components/intra/team/newStat"
import Notice from "@/components/intra/team/notice"
import ApplyReserve from "@/components/intra/team/applyReserve"
import Controller from "@/components/intra/team/controller"
import Info from "@/components/intra/team/info"
import MessageToHeadquarter from "@/components/intra/team/messageToHeadquarter"
import TeamMember from "@/components/intra/team/teamMember"

import { useSession } from "next-auth/react"
import getTeam from "@/lib/getTeam"

import colors from "@/theme/colors"
import { Box, Image, Link, Grid, GridItem, Flex } from "@chakra-ui/react"
import { BiCalendarEdit } from "react-icons/bi"

import team from "@/models/team"
import Tuition from "@/components/intra/team/tuition"

export default function Team() {
  const router = useRouter()
  const {
    query: { teamId },
  } = router
  const { data: session, status } = useSession()
  const [teamData, setTeamData] = useState<any>(null)

  // const getTeam = async (teamId: string | string[]) => {
  //   const res = await fetch(`/api/team/${teamId}`)
  //   const resData = await res.json()
  //   // console.log(resData)
  //   if (resData.success === false) {
  //     router.push("/intra")
  //   }
  //   setTeamData(resData.data)
  // }

  useEffect(() => {
    // if (teamId !== "" && teamId !== undefined) getTeam(teamId)
    if (teamId !== "" && teamId !== undefined) {
      // if (
      //   teamId !== "PlCd" &&
      //   teamId !== "gnBiz" &&
      //   teamId !== "gnGa" &&
      //   teamId !== "LbJs"
      // ) {
      //   alert("가입 감사합니다\nINTRANET은 다음주부터 오픈됩니다")
      //   router.push("/")
      // }
      const _ = async () => setTeamData(await getTeam(teamId))
      _()
    }
  }, [teamId])

  // console.log(session)
  return (
    <>
      <Head>
        <title>개념상상/개념폴리아 INTRANET</title>
      </Head>
      <Grid
        templateColumns={"repeat(3, minmax(350px, 1fr))"}
        gap={"15px"}
        borderBottom="solid 2px #bbb"
      >
        <GridItem>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            h="100%"
          >
            <Box mb={4}>
              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                w="100%"
                color={colors.grey}
                fontWeight={700}
                borderBottom={`solid 1px ${colors.grey}`}
                mb={3}
              >
                <Box>일정</Box>
                <Link href={`/intra/team/${teamId}/editEvent/0`}>
                  <BiCalendarEdit />
                </Link>
              </Flex>
              <Box>
                <Calendar teamId={teamId ?? ""} />
              </Box>
            </Box>

            <NewStat
              newStatus={teamData?.newStatus ?? ""}
              newChart={teamData?.newChart ?? ""}
              teamData={teamData}
            />

            <Info teamData={teamData} teamId={teamId ?? ""} />
          </Flex>
        </GridItem>
        <GridItem>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            h="100%"
          >
            <Flex
              flexDirection={"column"}
              justifyContent={"flex-start"}
              h="100%"
            >
              <Notice teamId={teamId} />
              <Box h="10px" />
              <MessageToHeadquarter />
              <Controller teamData={teamData} teamId={teamId ?? ""} />

              {teamData?.tuitions?.length > 0 && (
                <>
                  <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    w="100%"
                    color={colors.grey}
                    fontWeight={700}
                    borderBottom={`solid 1px ${colors.grey}`}
                    mb={3}
                    mt={6}
                  >
                    <Box>수강료</Box>
                  </Flex>
                  <Box>
                    <Tuition teamData={teamData} teamId={teamId ?? ""} />
                  </Box>
                </>
              )}
            </Flex>
            <TeamMember teamData={teamData} teamId={teamId ?? ""} />
          </Flex>
        </GridItem>
        <GridItem>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            h="100%"
          >
            <ApplyReserve
              askStatus={teamData?.askStatus ?? ""}
              applyReserveStatus={teamData?.applyReserveStatus ?? ""}
              applyChart={teamData?.applyChart ?? ""}
              teamData={teamData}
            />

            <Box w="100%" h="40px" mt={1} textAlign="right">
              <a href="/" target="_blank">
                <Image
                  src="/assets/logos/gnssgnpolya.png"
                  alt="logo"
                  width="200px"
                  style={{ marginLeft: "auto" }}
                />
              </a>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}
