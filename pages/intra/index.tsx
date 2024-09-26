import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/react"

import Head from "next/head"
import Link from "next/link"
// import Image from "next/image"
import styles from "@/styles/Home.module.css"
import teamsIdTitle from "@/lib/teamsIdTitle"

import colors from "@/theme/colors"
import { Box, Center, Image, Flex, Button, Divider } from "@chakra-ui/react"

export default function Home() {
  const { data: session, status } = useSession()
  const [teams, setTeams] = useState<any>(null)
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

  useEffect(() => {
    const _ = async () => {
      setTeams(await teamsIdTitle())
    }
    _()
  }, [])

  useEffect(() => {
    if (status === "authenticated") {
      getUser()
    }
  }, [status])

  // console.log(workTeams)
  return (
    <>
      <Head>
        <title>개념상상/개념폴리아 INTRANET</title>
      </Head>
      <main>
        <Box
          bgImage="/assets/images/intraAccessBG.png"
          bgSize={"cover"}
          h="494px"
        >
          {status !== "authenticated" ? (
            <Flex justifyContent={"center"} w="100%">
              <Link
                href="/api/auth/signin"
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                <Image src="/assets/images/intraAccessCard.png" zIndex={9999} />
              </Link>
            </Flex>
          ) : (
            <Center>
              <Box
                border={`solid 1px ${colors.blue1}`}
                borderRadius={20}
                p={3}
                w="300px"
                mt="110px"
                bgColor={"white"}
                color={"black"}
                textAlign={"center"}
              >
                <Box color={colors.blue1}>업무팀을 선택하세요</Box>
                <Center>
                  <Box
                    w="100px"
                    h="10px"
                    borderRadius={"5px"}
                    bgColor={colors.blue1}
                    mt={2}
                    mb={6}
                  />
                </Center>
                {/* <Box color={colors.blue1} fontSize="0.7rem" mb={4}>
                  ▼&nbsp;&nbsp;&nbsp;▼&nbsp;&nbsp;&nbsp;▼
                </Box> */}
                {teams &&
                  [
                    "SsDc",
                    "PlDc",
                    "SsMd",
                    "SPAk",
                    "PlCd",
                    "-",
                    "SPSc",
                    "PlBb",
                    "-",
                    "SPJs",
                    "LbJs",
                    "-",
                    "PlPc",
                    "PlSj",
                    "PlDt",
                    "PlDs",
                    "PlSd",
                    "-",
                    "gnBiz",
                    "gnGa",
                  ].map((teamId, index) => (
                    <>
                      {teamId === "-" ? (
                        <Divider />
                      ) : (
                        <Box key={index}>
                          {workTeams.includes(teamId) ? (
                            //  ||
                            // workTeams.includes("gnBiz")
                            <Link href={`/intra/team/${teamId}`}>
                              <Box fontWeight={700}>{`${teams[teamId]}`}</Box>
                            </Link>
                          ) : (
                            <Box>{`${teams[teamId]}`}</Box>
                          )}
                        </Box>
                      )}
                    </>
                  ))}
              </Box>
            </Center>
          )}
        </Box>
        {/* <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          w="100%"
          minHeight="600px"
          gap={10}
        >
          <Link href="/">
            <Image src="/assets/logos/gnssgnpolya1605x647.png" w="400px" />
          </Link>
          <Image
            src="https://static.vecteezy.com/system/resources/thumbnails/004/695/801/small/intranet-global-network-connection-technology-intranet-business-corporate-communication-document-management-system-dms-business-team-illustration-with-characters-and-icons-vector.jpg"
            w="400px"
          />
          {status !== "authenticated" ? (
            <Box
              border={`solid 1px ${colors.accents}`}
              borderRadius={20}
              p={3}
              color={colors.accents}
            >
              로그인 하시면 아래의 근무팀 링크가 활성화됩니다
            </Box>
          ) : (
            <Box
              border={`solid 1px ${colors.accents}`}
              borderRadius={20}
              p={3}
              color={colors.accents}
            >
              아래에서 업무할 근무팀을 선택하세요
            </Box>
          )}
        </Flex> */}
      </main>
    </>
  )
}
