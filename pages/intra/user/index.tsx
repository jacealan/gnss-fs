import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

import colors from "@/theme/colors"
import { Box, Grid, GridItem, Center } from "@chakra-ui/react"
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react"

const getApi: any = async (url: string) => {
  const res = await fetch(url)
  const resData = await res.json()
  return resData
}
export default function UsersList() {
  const [teams, setTeams] = useState<any[]>([{}])
  const [users, setUsers] = useState<any[]>([{}])

  useEffect(() => {
    getApi("/api/team").then((res: any) => {
      setTeams(res.data)
    })
    getApi("/api/user").then((res: any) => {
      setUsers(res.data)
    })
  }, [])
  // console.log(teams)
  // console.log(users)
  return (
    <>
      <Box>
        <Center fontSize={"2rem"} fontWeight={700}>
          원리상상 직원 목록
        </Center>
        <Center fontSize={"0.7rem"} mb={10}>
          업무 처리를 위한 팀아이디,그룹아이디 등도 포함
        </Center>
      </Box>
      <Accordion
        defaultIndex={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
        allowMultiple
      >
        {[
          "gnBiz",
          "gnGa",
          "SsDc",
          "PlDc",
          "SsMd",
          "SPAk",
          "PlCd",
          "SPSc",
          "SsSc",
          "PlBb",
          "SPJs",
          "PlPc",
          "PlSj",
          "PlDt",
          "PlDs",
          // "PlSd",
          // "gnChief",
        ].map((teamId: string, index: number) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontWeight={700}>
                  {teams.find((team: any) => team?.teamId === teamId)?.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Grid>
                {teams
                  .find((team: any) => team?.teamId === teamId)
                  ?.members?.sort((a: any, b: any) =>
                    a.userName.localeCompare(b.userName)
                  )
                  .map((member: any, index: number) => {
                    const showUser = users.find(
                      (user) => user.email === member.userEmail
                    )
                    return (
                      <GridItem _hover={{ bgColor: "#f5f5f5" }} key={index}>
                        <Grid templateColumns={"2fr 3fr 1fr 2fr"}>
                          <GridItem>{showUser?.name}</GridItem>
                          <GridItem>{showUser?.email}</GridItem>
                          <GridItem>{showUser?.intraPhone}</GridItem>
                          <GridItem>{showUser?.phone}</GridItem>
                        </Grid>
                      </GridItem>
                    )
                  })}
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}
