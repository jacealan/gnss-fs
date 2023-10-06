import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

import colors from "@/theme/colors"
import { Box, Divider, Flex, Stack, Center } from "@chakra-ui/react"

export default function BottomBar({ teams }: { teams: any }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [workTeams, setWorkTeams] = useState<string[]>([])
  // const [name, setName] = useState("")

  const getUser = async () => {
    try {
      const res = await fetch("/api/user/ismember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session?.user?.email }),
      })
      // console.log(3, res)
      const resData = await res.json()
      // console.log(2, resData)
      if (resData.success) {
        const workTeamsArray: string[] = []
        resData.data.teams.forEach((team: any) =>
          workTeamsArray.push(team.teamId)
        )
        // setWorkTeams((prev) => resData.data.teams)
        setWorkTeams(workTeamsArray)
        // setName(resData.data.name)
        // router.push("/intra/team/gnBiz")
        // } else {
        //   router.push("/intra/user/signup")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  // getUser()
  useEffect(() => {
    // if (status === "loading") return
    if (status === "authenticated") {
      getUser()
    }
  }, [status])

  // console.log(teams)
  // console.log(1, workTeams)

  return (
    <>
      <Box
        w="100%"
        bgColor={colors.neutrals}
        color={colors.primary}
        mt={10}
        p={5}
        fontSize="0.8rem"
      >
        <Flex justifyContent={"space-evenly"} mb={5}>
          <Box>
            <Box fontWeight={700} mb={2}>
              강남 대치
            </Box>

            {teams &&
              ["SsDc", "PlDc", "SsMd", "SPAk", "PlCd"].map((teamId, index) => (
                <Box key={index}>
                  {workTeams.includes(teamId) ||
                  workTeams.includes("gnBiz") ||
                  workTeams.includes("gnGa") ? (
                    <Link href={`/intra/team/${teamId}`}>
                      <Box color={colors.primary}>{`${teams[teamId]}`}</Box>
                    </Link>
                  ) : (
                    <Box color={"#aaa"}>{`${teams[teamId]}`}</Box>
                  )}
                </Box>
              ))}
          </Box>
          <Box>
            <Box fontWeight={700} mb={2}>
              서울 서초
            </Box>

            {teams &&
              ["SPSc", "PlBb"].map((teamId, index) => (
                <Box key={index}>
                  {workTeams.includes(teamId) ||
                  workTeams.includes("gnBiz") ||
                  workTeams.includes("gnGa") ? (
                    <Link href={`/intra/team/${teamId}`}>
                      <Box color={colors.primary}>{`${teams[teamId]}`}</Box>
                    </Link>
                  ) : (
                    <Box color={"#aaa"}>{`${teams[teamId]}`}</Box>
                  )}
                </Box>
              ))}
          </Box>
          <Box>
            <Box fontWeight={700} mb={2}>
              서울 잠실
            </Box>

            {teams &&
              ["SPJs", "LbJs"].map((teamId, index) => (
                <Box key={index}>
                  {workTeams.includes(teamId) ||
                  workTeams.includes("gnBiz") ||
                  workTeams.includes("gnGa") ? (
                    <Link href={`/intra/team/${teamId}`}>
                      <Box color={colors.primary}>{`${teams[teamId]}`}</Box>
                    </Link>
                  ) : (
                    <Box color={"#aaa"}>{`${teams[teamId]}`}</Box>
                  )}
                </Box>
              ))}
          </Box>
          <Box>
            <Box fontWeight={700} mb={2}>
              수도권 경기
            </Box>

            {teams &&
              ["PlPc", "PlSd", "PlSj"].map((teamId, index) => (
                <Box key={index}>
                  {workTeams.includes(teamId) ||
                  workTeams.includes("gnBiz") ||
                  workTeams.includes("gnGa") ? (
                    <Link href={`/intra/team/${teamId}`}>
                      <Box color={colors.primary}>{`${teams[teamId]}`}</Box>
                    </Link>
                  ) : (
                    <Box color={"#aaa"}>{`${teams[teamId]}`}</Box>
                  )}
                </Box>
              ))}
          </Box>
          <Box>
            <Box fontWeight={700} mb={2}>
              원리상상 본부
            </Box>

            {teams &&
              ["gnBiz", "gnGa", "Test"].map((teamId, index) => (
                <Box key={index}>
                  {workTeams.includes(teamId) || workTeams.includes("gnBiz") ? (
                    <Link href={`/intra/team/${teamId}`}>
                      <Box color={colors.primary}>{`${teams[teamId]}`}</Box>
                    </Link>
                  ) : (
                    <Box color={"#aaa"}>{`${teams[teamId]}`}</Box>
                  )}
                </Box>
              ))}
          </Box>
        </Flex>
        <Divider border={"solid 1px #333"} />
        <Center>
          <Stack direction={"row"}>
            <Box>원리상상(주)</Box>
            <Box>서울특별시 강남구 도곡로 418, 4층(대치동)</Box>
            <Link href="/" target="_blank">
              https://gnss.co.kr
            </Link>
          </Stack>
        </Center>
      </Box>
    </>
  )
}
