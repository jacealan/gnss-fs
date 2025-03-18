import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

import colors from "@/theme/colors"
import { Box, Divider, Flex, Stack, Center, VStack } from "@chakra-ui/react"

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
              ["SPSc", "SsSc", "PlBb"].map((teamId, index) => (
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
              ["SPJs"].map((teamId, index) => (
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
              ["PlPc", "PlSj", "PlDt", "PlDs", "PlSd"].map((teamId, index) => (
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
          <Box>
            <Stack direction={"row"}>
              <Box>원리상상(주)</Box>
              <Box>서울특별시 강남구 도곡로 418 강원빌딩 4층</Box>
              <Link href="/" target="_blank">
                https://gnss.co.kr
              </Link>
            </Stack>
            {/* <Stack direction={"row"}>
              <Box>경영지원부</Box>
              <Link
                href="https://map.naver.com/v5/search/%EC%84%9C%EC%9A%B8%EC%8B%9C%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EA%B4%91%ED%8F%89%EB%A1%9C56%EA%B8%B8%208-13%20%08%EC%88%98%EC%84%9C%ED%83%80%EC%9B%8C%201519%ED%98%B8"
                target="_blank"
              >
                서울시 강남구 광평로56길 8-13 수서타워 1519호
              </Link>
            </Stack> */}
            <Stack direction={"row"}>
              <Box>학원사업부</Box>
              <Link href="tel://02-566-0508">02-566-0508</Link>
              <Link
                href="https://map.naver.com/v5/search/%EC%84%9C%EC%9A%B8%EC%8B%9C%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EA%B4%91%ED%8F%89%EB%A1%9C56%EA%B8%B8%208-13%20%08%EC%88%98%EC%84%9C%ED%83%80%EC%9B%8C%201519%ED%98%B8"
                target="_blank"
              >
                서울시 강남구 광평로56길 8-13 수서타워 1519호
              </Link>
            </Stack>
          </Box>
        </Center>
      </Box>
    </>
  )
}
