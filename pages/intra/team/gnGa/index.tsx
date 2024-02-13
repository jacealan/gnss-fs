import { useEffect, useState } from "react"
import Link from "next/link"
import Head from "next/head"

import { useSession } from "next-auth/react"
import getTeam from "@/lib/getTeam"

import Calendar from "@/components/intra/team/calendar"
import colors from "@/theme/colors"
import { Box, Button, Divider, Grid, GridItem } from "@chakra-ui/react"
import { Flex, VStack, HStack, Image } from "@chakra-ui/react"

import {
  PhoneIcon,
  EmailIcon,
  ExternalLinkIcon,
  AttachmentIcon,
  CopyIcon,
  ChatIcon,
} from "@chakra-ui/icons"
import { RxNotionLogo, RxDiscordLogo } from "react-icons/rx"
import {
  BiBuildingHouse,
  BiSolidCommentEdit,
  BiMessageAltError,
} from "react-icons/bi"
import { RiKakaoTalkFill } from "react-icons/ri"
import { BsFileEarmarkSpreadsheet } from "react-icons/bs"
import { FiCheckCircle } from "react-icons/fi"
import { MdSsidChart } from "react-icons/md"
import { IoIosImages, IoIosCart, IoIosPeople } from "react-icons/io"
import { FaGoogleDrive, FaFire } from "react-icons/fa"
import { SiGoogleanalytics } from "react-icons/si"
import { MdGroups } from "react-icons/md"
import { SlPeople } from "react-icons/sl"
import { HiSpeakerphone } from "react-icons/hi"

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

export default function GNBIZ() {
  const { data: session, status } = useSession()
  const [teamData, setTeamData] = useState<any>(null)

  const [modalText, setModalText] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const openModal = (text: string) => {
    setModalText(text)
    if (text === null || text === "") return
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(text)
    } else {
      // Use the 'out of viewport hidden text area' trick
      const textArea = document.createElement("textarea")
      textArea.value = text

      // Move textarea out of the viewport so it's not visible
      textArea.style.position = "absolute"
      textArea.style.left = "-999999px"

      document.body.prepend(textArea)
      textArea.select()

      try {
        document.execCommand("copy")
      } catch (error) {
        console.error(error)
      } finally {
        textArea.remove()
      }
    }
    onOpen()
    setTimeout(onClose, 1000)
  }

  useEffect(() => {
    // if (teamId !== "" && teamId !== undefined) getTeam(teamId)
    // if (teamId !== "" && teamId !== undefined) {
    const _ = async () => setTeamData(await getTeam("gnBiz"))
    _()
    // }
  }, [])

  return (
    <>
      <Head>
        <title>원리상상 경영지원부</title>
      </Head>
      <Box
        bgImage={
          "https://img.freepik.com/free-vector/abstract-background-with-monochrome-low-poly-design_1048-14453.jpg"
        }
        p={{ base: 0, md: 3 }}
      >
        <Box fontSize="3rem" fontWeight={700}>
          경영지원부
        </Box>
        <Grid
          templateColumns={"350px minmax(350px, 1fr) minmax(350px, 1fr)"}
          gap={"10px"}
        >
          <GridItem>
            <Calendar teamId={"gnGa"} />
          </GridItem>
          <GridItem>
            <VStack align="left">
              <Box>
                <a
                  href={`https://map.naver.com/v5/search/${teamData?.address}`}
                  target="_blank"
                >
                  <Button leftIcon={<BiBuildingHouse />} fontSize="0.9rem">
                    {teamData?.address}
                  </Button>
                </a>
                <button onClick={() => openModal(teamData?.address)}>
                  <CopyIcon />
                </button>
              </Box>
              <Divider />
              <Flex gap="10px">
                <Link href="/intra/team/gnGa/editNotice">
                  <Button
                    leftIcon={<HiSpeakerphone />}
                    colorScheme="red"
                    variant="outline"
                  >
                    공지사항 관리
                  </Button>
                </Link>
                <Link href="/intra/team/gnGa/messages">
                  <Button
                    leftIcon={<ChatIcon />}
                    colorScheme="green"
                    variant="outline"
                  >
                    메시지(관별)
                  </Button>
                </Link>
              </Flex>

              <Divider />

              <HStack>
                <Flex gap={2} wrap="wrap">
                  <Box>
                    <a
                      href="https://docs.google.com/spreadsheets/d/1ivn1YCim5U65WGX8WWtHIKzz99IhQ8smfFNovK0J3So/edit?usp=sharing"
                      target="_blank"
                    >
                      <Button
                        leftIcon={<BsFileEarmarkSpreadsheet />}
                        colorScheme="pink"
                        variant={"outline"}
                      >
                        물품대장
                      </Button>
                    </a>
                  </Box>
                  <Box>
                    <a
                      href="https://docs.google.com/spreadsheets/d/1lra4_ftBgtf3QRVvDRGrlaB_wvnuqXwkRKeDnCgYPiI/edit?usp=sharing"
                      target="_blank"
                    >
                      <Button
                        leftIcon={<BsFileEarmarkSpreadsheet />}
                        colorScheme="teal"
                        variant={"outline"}
                      >
                        학원사업부 업무요청내역
                      </Button>
                    </a>
                  </Box>
                </Flex>
              </HStack>

              <Divider />

              <HStack>
                <Flex gap={2} wrap="wrap">
                  <Box>
                    <a href="/intra/user" target="_blank">
                      <Button
                        leftIcon={<SlPeople />}
                        colorScheme="blue"
                        variant="outline"
                      >
                        직원목록
                      </Button>
                    </a>
                  </Box>
                </Flex>
              </HStack>

              <Divider />

              <HStack>
                <Flex gap={2} wrap="wrap">
                  <Box>
                    <a
                      href="https://drive.google.com/drive/folders/1OHAE6r-6kCcboTZ-jHVs53j5OXwQV0j7?usp=sharing"
                      target="_blank"
                    >
                      <Button
                        leftIcon={<FaGoogleDrive />}
                        colorScheme="messenger"
                      >
                        GoogleDRIVE
                      </Button>
                    </a>
                  </Box>
                  <a
                    href="https://drive.google.com/drive/folders/1IqAs3GfalUScKYeaJySyNCfzFBBFAFkK?usp=sharing"
                    target="_blank"
                  >
                    <Button
                      leftIcon={<FaGoogleDrive />}
                      colorScheme="orange"
                      variant={"outline"}
                    >
                      to 학원사업부
                    </Button>
                  </a>
                  {/* <Box>
                    <a
                      href="https://mail.google.com/mail/u/0/#inbox"
                      target="_blank"
                    >
                      <Button leftIcon={<EmailIcon />} colorScheme="messenger">
                        GMail
                      </Button>
                    </a>
                  </Box> */}
                </Flex>
              </HStack>

              <Flex
                // justifyContent={"center"}
                gap={"4px 17px"}
                wrap="wrap"
                border="dashed 1px "
                borderRadius={"5px"}
                w="318px"
                // bgColor={"#f2f6fb"}
                p={1}
              >
                <Link
                  href="https://drive.google.com/drive/folders/1j-ZAcevMRF9lwPw2uujru7PjW_Bc2Rxj?usp=sharing"
                  target="_blank"
                >
                  <Button
                    w="64px"
                    fontSize="0.8rem"
                    colorScheme="messenger"
                    variant={"outline"}
                  >
                    본관
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1hpUEvgUtllQ7Ad-gXvWTwqebjWXBWG6n?usp=sharing"
                  target="_blank"
                >
                  <Button
                    w="64px"
                    fontSize="0.8rem"
                    colorScheme="messenger"
                    variant={"outline"}
                  >
                    압구정
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1OGpBj0VamRIkf5KFPEql6qShyPRIT5g2?usp=sharing"
                  target="_blank"
                >
                  <Button
                    w="64px"
                    fontSize="0.8rem"
                    colorScheme="messenger"
                    variant={"outline"}
                  >
                    대치폴
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/10_vMITlk37e2CZpClEbr2nNzWaLM-1wj?usp=sharing"
                  target="_blank"
                >
                  <Button
                    w="64px"
                    fontSize="0.8rem"
                    colorScheme="messenger"
                    variant={"outline"}
                  >
                    평촌폴
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1kic9expz_jR5yNArt8Hs_tiTMKtJFaz7?usp=sharing"
                  target="_blank"
                >
                  <Button
                    w="64px"
                    fontSize="0.8rem"
                    colorScheme="messenger"
                    variant={"outline"}
                  >
                    잠실
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1PyY9ijlg-nGmQDgr8ZBcG_e4A4h4V4hT?usp=sharing"
                  target="_blank"
                >
                  <Button
                    w="64px"
                    fontSize="0.8rem"
                    colorScheme="messenger"
                    variant={"outline"}
                  >
                    서초
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1shButy3mmqJGJ2xpjVTL8oWw55o3GuUl?usp=sharing"
                  target="_blank"
                >
                  <Button
                    w="64px"
                    fontSize="0.8rem"
                    colorScheme="messenger"
                    variant={"outline"}
                  >
                    의대관
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1BWXR4NwoXa5nHMpGdIo0w9VyIRHWwbA4?usp=sharing"
                  target="_blank"
                >
                  <Button
                    w="64px"
                    fontSize="0.8rem"
                    colorScheme="messenger"
                    variant={"outline"}
                  >
                    삼성청담폴
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1ZCsSh3rSlnEzpCCskC5HYgS181vARCSx?usp=sharing"
                  target="_blank"
                >
                  <Button
                    w="64px"
                    fontSize="0.8rem"
                    colorScheme="messenger"
                    variant={"outline"}
                  >
                    과학
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1ONtizmfdV6cAGHNQXp1hqHlTpSjvxNZP?usp=sharing"
                  target="_blank"
                >
                  <Button
                    w="64px"
                    fontSize="0.8rem"
                    colorScheme="messenger"
                    variant={"outline"}
                  >
                    학원사업부
                  </Button>
                </Link>
              </Flex>
            </VStack>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{modalText}</ModalHeader>
                <ModalBody>클립보드에 복사되었습니다</ModalBody>
              </ModalContent>
            </Modal>
          </GridItem>
          <GridItem>
            <Messages teamId={"gnGa"} daysAgo={10} />
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}
