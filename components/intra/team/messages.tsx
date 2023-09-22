import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import moment from "moment-timezone"
import teamsIdTitle from "@/lib/teamsIdTitle"
import usersEmailName from "@/lib/usersEmailName"

import colors from "@/theme/colors"
import { Box, Badge, Flex } from "@chakra-ui/react"

export default function Messages({
  teamId,
  daysAgo,
}: {
  teamId: string
  daysAgo: number
}) {
  const router = useRouter()
  // const {
  //   query: { teamId },
  // } = router
  const [messages, setMessages] = useState([])
  const [teams, setTeams] = useState<any>(null)
  const [users, setUsers] = useState<any>(null)

  const getMessages = async () => {
    if (teamId) {
      const res = await fetch(`/api/message/${teamId}/to/${daysAgo}`)
      const resData = await res.json()
      setMessages(resData.data)
    }
    // console.log(new Date())
    // console.log(messages)
  }

  useEffect(() => {
    const _ = async () => {
      setTeams(await teamsIdTitle())
      setUsers(await usersEmailName())
    }
    _()
    getMessages()
    setInterval(getMessages, 10 * 60 * 1000)
  }, [])

  return (
    <>
      <Box borderBottom={`solid 1px ${colors.secondary}`} w="330px" mb={2}>
        updated at {moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm")}
      </Box>
      {messages &&
        messages?.map((messageObj: any, index: number) => (
          <>
            <Box
              border={`solid 1px ${colors.secondary}`}
              p={3}
              borderRadius={10}
              mb={2}
              key={index}
              w="330px"
            >
              <Box>
                {messageObj.message
                  .split("\n")
                  .map((line: string, index: number) => (
                    <div key={index}>
                      {line.split(" ").map((word: string, index: number) =>
                        word.substring(0, 4) === "http" ? (
                          <Link href={word} target="_blank" key={index}>
                            <span
                              style={{
                                fontWeight: 700,
                                fontSize: "0.7rem",
                              }}
                            >
                              {word}
                            </span>
                            &nbsp;
                          </Link>
                        ) : (
                          <span key={index}>{word}&nbsp;</span>
                        )
                      )}
                      <br />
                    </div>
                  ))}
              </Box>
              <Flex justifyContent={"flex-end"} w="300px">
                <Badge>
                  {teams && teams[messageObj.createdFrom]}(
                  {/* {messageObj.createdBy.split("@")[0]} */}
                  {users && users[messageObj.createdBy]})
                </Badge>
                {/* →
                <Badge>
                  {messageObj.toTeamId === "gnBiz"
                    ? "학원사업부"
                    : "경영지원부"}
                </Badge> */}
              </Flex>
              <Box style={{ fontSize: "0.7rem" }} w="300px" textAlign="right">
                {moment(messageObj.createdAt)
                  .tz("Asia/Seoul")
                  .format("YYYY-MM-DD HH:mm")}
                &nbsp;
              </Box>
            </Box>
          </>
        ))}
    </>
  )
}
