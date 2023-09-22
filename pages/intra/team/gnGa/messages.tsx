import { useEffect, useState } from "react"
import Link from "next/link"
import Head from "next/head"
import moment from "moment-timezone"

import { useSession } from "next-auth/react"
import getTeam from "@/lib/getTeam"
import teamsIdTitle from "@/lib/teamsIdTitle"
import usersEmailName from "@/lib/usersEmailName"

import Calendar from "@/components/intra/team/calendar"
import colors from "@/theme/colors"
import { Box, Badge, Divider, Grid, GridItem } from "@chakra-ui/react"
import { Flex, VStack, HStack, Image, Center } from "@chakra-ui/react"
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react"

import {
  PhoneIcon,
  EmailIcon,
  ExternalLinkIcon,
  AttachmentIcon,
  CopyIcon,
} from "@chakra-ui/icons"
import { RxNotionLogo, RxDiscordLogo } from "react-icons/rx"
import { BiBuildingHouse, BiSolidCommentEdit } from "react-icons/bi"
import { RiKakaoTalkFill } from "react-icons/ri"
import { BsFileEarmarkSpreadsheet } from "react-icons/bs"
import { FiCheckCircle } from "react-icons/fi"
import { MdSsidChart } from "react-icons/md"
import { IoIosImages, IoIosCart } from "react-icons/io"
import { FaGoogleDrive, FaFire } from "react-icons/fa"
import { SiGoogleanalytics, SiFigma } from "react-icons/si"
import { MdGroups } from "react-icons/md"

import { useDisclosure } from "@chakra-ui/react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import Messages from "@/components/intra/team/messages"

const teamId = "gnGa"
const daysAgo = 30

export default function GnBizMessages() {
  // const router = useRouter()
  // const {
  //   query: { teamId },
  // } = router
  const { data: session, status } = useSession()
  const [teamData, setTeamData] = useState<any>(null)

  // const [modalText, setModalText] = useState("")
  // const { isOpen, onOpen, onClose } = useDisclosure()

  // useEffect(() => {
  //   // if (teamId !== "" && teamId !== undefined) getTeam(teamId)
  //   // if (teamId !== "" && teamId !== undefined) {
  //   const _ = async () => setTeamData(await getTeam("gnBiz"))
  //   _()
  //   // }
  // }, [])

  const [messages, setMessages] = useState([])
  const [teams, setTeams] = useState<any>(null)
  const [users, setUsers] = useState<any>(null)

  const getMessages = async () => {
    if (teamId) {
      const res = await fetch(`/api/message/${teamId}/to/${daysAgo}`)
      const resData = await res.json()
      // console.log(resData)
      setMessages(resData.data)
    }
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

  const MessageAccordion: any = ({ createdFrom }: { createdFrom: string }) => (
    <Accordion allowMultiple>
      <AccordionItem>
        <AccordionButton
          _expanded={{ bg: "#00e", color: "white", fontWeight: 700 }}
        >
          <Box w="100%">
            <Flex justifyContent={"space-between"} w="100%">
              <Box>{teams && teams[createdFrom]}</Box>
              <Box>
                {
                  messages.filter(
                    (message: any) => message.createdFrom === createdFrom
                  ).length
                }
              </Box>
            </Flex>
            <Flex maxWidth="100%" flexWrap={"wrap"} gap={1}>
              {messages
                .filter((message: any) => message.createdFrom === createdFrom)
                .map((message: any, index: number) => (
                  <Badge fontWeight={400} key={index}>
                    {moment(message.createdAt).tz("Asia/Seoul").format("MM-DD")}
                  </Badge>
                ))}
            </Flex>
          </Box>
        </AccordionButton>
        <AccordionPanel p={1}>
          <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
            {messages
              .filter((message: any) => message.createdFrom === createdFrom)
              .map((message: any, index: number) => (
                <AccordionItem
                  key={index}
                  border="solid 1px #222"
                  borderRadius={"5px"}
                  mb={1}
                >
                  <AccordionButton
                    fontSize={"0.8rem"}
                    // bgColor="#eee"
                    // color="#555"
                  >
                    <Flex
                      w="100%"
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                    >
                      <Badge>
                        {moment(message.createdAt)
                          .tz("Asia/Seoul")
                          .format("MM-DD")}
                      </Badge>
                      &nbsp;
                      <Box textAlign={"left"}>
                        {message.message.split("\n")[0].substring(0, 18)}
                      </Box>
                      &nbsp;
                      <Badge>{users && users[message.createdBy]}</Badge>
                    </Flex>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel borderTop="dashed 1px #222">
                    {/* {message.message} */}
                    {message.message
                      .split("\n")
                      .map((line: string, index: number) => (
                        <Box key={index}>
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
                            ) : word.length ? (
                              <span key={index}>{word}&nbsp;</span>
                            ) : null
                          )}
                          {line.length ? <br /> : null}
                        </Box>
                      ))}
                  </AccordionPanel>
                </AccordionItem>
              ))}
          </Accordion>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )

  return (
    <>
      <Head>
        <title>원리상상 학원사업부 메세지</title>
      </Head>
      <Box
        bgImage={
          "https://img.freepik.com/free-vector/geometric-pattern-background-vector-white_53876-126684.jpg"
        }
        p={{ base: 0, md: 3 }}
      >
        <Box fontSize="3rem" fontWeight={700}>
          경영지원부 메세지(관별 1개월)
        </Box>
        <Grid templateColumns={"repeat(3,minmax(350px, 1fr))"} gap={"10px"}>
          <GridItem>
            <MessageAccordion createdFrom={"SsDc"} />
            <MessageAccordion createdFrom={"SsMd"} />
            <MessageAccordion createdFrom={"SPAk"} />
          </GridItem>
          <GridItem>
            <MessageAccordion createdFrom={"SPSc"} />
            <MessageAccordion createdFrom={"SPJs"} />
            <MessageAccordion createdFrom={"PlCd"} />
          </GridItem>
          <GridItem>
            {/* <MessageAccordion createdFrom={"PlBb"} /> */}
            {/* <MessageAccordion createdFrom={"PlSd"} /> */}
            <MessageAccordion createdFrom={"PlDc"} />
            <MessageAccordion createdFrom={"PlPc"} />
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}
