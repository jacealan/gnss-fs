import { useEffect, useState } from "react"
import Link from "next/link"
import Head from "next/head"

import { useSession } from "next-auth/react"
import getTeam from "@/lib/getTeam"

import Calendar from "@/components/intra/team/calendar"
import colors from "@/theme/colors"
import { Box, Button, Divider, Grid, GridItem } from "@chakra-ui/react"
import { Flex, VStack, HStack, Image, Center } from "@chakra-ui/react"

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

const IconBtn = ({
  iconTitle = "iconbutton",
  link = "https://gnss.co.kr",
  iconImage = "https://cdn3d.iconscout.com/3d/premium/thumb/business-document-3635277-3038684.png",
}: {
  iconTitle: string
  link: string
  iconImage: string
}) => {
  const boxSize = "64px"
  const fontSize = "0.7rem"
  const fontWeight = 700
  const borderStyle = "solid 1px #aaa"

  return (
    <Link href={link} target="_blank">
      <Box
        w={boxSize}
        fontSize={fontSize}
        // fontWeight={fontWeight}
        _active={{ fontWeight: fontWeight }}
      >
        <Image
          src={iconImage}
          w={boxSize}
          h={boxSize}
          borderRadius={10}
          // border={borderStyle}
          boxShadow={"-1px -1px 4px #aaa"}
          _hover={{ boxShadow: "-1px -1px 4px #555" }}
          _active={{ boxShadow: "inset 1px 1px 2px #aaa" }}
          // _focus={{ boxShadow: "0px 0px 0px" }}
        />
        <Center>{iconTitle}</Center>
      </Box>
    </Link>
  )
}

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
        <title>원리상상 학원사업부</title>
      </Head>
      <Box
        bgImage={
          "https://img.freepik.com/free-vector/geometric-pattern-background-vector-white_53876-126684.jpg"
        }
        p={{ base: 0, md: 3 }}
      >
        <Box fontSize="3rem" fontWeight={700}>
          학원사업부
        </Box>
        <Grid
          templateColumns={"350px minmax(350px, 1fr) minmax(350px, 1fr)"}
          gap={"10px"}
        >
          <GridItem>
            <Box>
              <a href={`tel://${teamData?.phone}`}>
                <Button leftIcon={<PhoneIcon />} fontSize="0.9rem">
                  {teamData?.phone}
                </Button>
              </a>
              <button onClick={() => openModal(teamData?.phone)}>
                <CopyIcon />
              </button>
            </Box>
            <Box>
              <a href={`mailto://${teamData?.email}`}>
                <Button leftIcon={<EmailIcon />} fontSize="0.9rem">
                  {teamData?.email}
                </Button>
              </a>
              <button onClick={() => openModal(teamData?.email)}>
                <CopyIcon />
              </button>
            </Box>
            <Box>
              <a
                href={`https://map.naver.com/v5/search/${teamData?.address}`}
                target="_blank"
              >
                <Button leftIcon={<BiBuildingHouse />} fontSize="0.8rem">
                  {teamData?.address}
                </Button>
              </a>
              <button onClick={() => openModal(teamData?.address)}>
                <CopyIcon />
              </button>
            </Box>
            <Divider />
            <Calendar teamId={"gnBiz"} />
          </GridItem>
          <GridItem>
            <VStack align="left">
              <Flex gap={5} wrap="wrap" alignItems={"center"}>
                <IconBtn
                  iconImage="https://cdn-icons-png.flaticon.com/512/7803/7803013.png"
                  link="/intra/team/gnBiz/editNotice"
                  iconTitle="공지사항관리"
                ></IconBtn>
                <IconBtn
                  iconImage="https://icon-library.com/images/messaging-icon-png/messaging-icon-png-6.jpg"
                  link="/intra/team/gnBiz/messages"
                  iconTitle="메세지(관별)"
                ></IconBtn>
                <IconBtn
                  iconImage="https://cdn-icons-png.flaticon.com/512/5941/5941725.png"
                  link="/intra/user"
                  iconTitle="직원 목록"
                ></IconBtn>
                <IconBtn
                  iconImage="https://hiviewsolutions.com/wp-content/uploads/2022/01/Groups.png"
                  link="https://groups.google.com/my-groups"
                  iconTitle="GGroups"
                ></IconBtn>
              </Flex>
              <Divider />

              <Flex gap={5} wrap="wrap">
                <IconBtn
                  iconImage="https://play-lh.googleusercontent.com/zXvb_BwfUH87dm2jo0NksWgcEmweWjEdgvS4v9NjoXuHQk7Z5Rd4fKGsscHnQ_7jxNg=w240-h480-rw"
                  link="https://docs.google.com/spreadsheets/d/1ivn1YCim5U65WGX8WWtHIKzz99IhQ8smfFNovK0J3So/edit?usp=sharing"
                  iconTitle="물품대장"
                ></IconBtn>
                <IconBtn
                  iconImage="https://www.logishub.net/Content/Images/service_icon_planner.png"
                  link="https://www.logishub.net/Delivery/HomeDelivery"
                  iconTitle="로지스허브 택배서비스"
                ></IconBtn>
                <IconBtn
                  iconImage="data:image/jpeg;base64,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"
                  link="https://hanjinchatbot-web.azurewebsites.net/"
                  iconTitle="한진택배지니"
                ></IconBtn>
              </Flex>

              <Flex gap={5} wrap="wrap">
                <IconBtn
                  iconImage="/assets/icons/orderBook.png"
                  link="https://drive.google.com/drive/folders/1WK8QsXCzYwPAhUVcYA3yWGithuS8vG4E"
                  iconTitle="교재주문서"
                ></IconBtn>
                <IconBtn
                  iconImage="/assets/icons/orderDesign.png"
                  link="https://drive.google.com/drive/folders/1Z4xBNNXL0_nrbvs6cgU--TKbPPGbKMe7"
                  iconTitle="업무요청서"
                ></IconBtn>
                <IconBtn
                  iconImage="/assets/icons/distFolder.png"
                  link="https://drive.google.com/drive/folders/1LAMIlQdEc_RYkZ9c9z3ML0-fX_gQA6Nx"
                  iconTitle="관별배포시트"
                ></IconBtn>
              </Flex>

              <Flex gap={5} wrap="wrap">
                <IconBtn
                  iconImage="/assets/icons/mockTest.png"
                  link="https://drive.google.com/drive/folders/1B_Ub7EryOlPiIWgL7XsQ8y8GMxCIf2WA"
                  iconTitle="모의고사"
                ></IconBtn>
                <IconBtn
                  iconImage="/assets/icons/youtube_square.png"
                  link="https://www.youtube.com/channel/UCwgew-iQxiOL1_XeYG0Tn0A"
                  iconTitle="개상TV"
                ></IconBtn>
                <IconBtn
                  iconImage="/assets/icons/youtube_edit1.png"
                  link="/intra/team/gnBiz/gstv"
                  iconTitle="개상TV List on GNSS"
                ></IconBtn>
              </Flex>

              <Flex gap={5} wrap="wrap">
                <IconBtn
                  iconImage="https://cdn.iconscout.com/icon/free/png-256/free-gmail-2981844-2476484.png?f=webp"
                  link="https://mail.google.com/mail/u/0/#inbox"
                  iconTitle="GMail"
                ></IconBtn>
                <IconBtn
                  iconImage="/assets/icons/cabinet.ico"
                  link="https://drive.google.com/drive/folders/1-2Mf_ful3n3oEXZXSI6y8ox7UY-Uy-Aj?usp=sharing"
                  iconTitle="서류함"
                ></IconBtn>
                <IconBtn
                  iconImage="https://ninaimg.thenina.com/1661347126131.png"
                  link="https://drive.google.com/drive/folders/1HNYNDVe1moLI-bwjWQ3POmwYfDLxeb47?usp=sharing"
                  iconTitle="관별 폴더"
                ></IconBtn>
                <IconBtn
                  iconImage="https://cdn4.iconfinder.com/data/icons/finance-and-payments-2-2/512/80-512.png"
                  link="https://drive.google.com/drive/folders/1ONtizmfdV6cAGHNQXp1hqHlTpSjvxNZP?usp=sharing"
                  iconTitle="경영지원부"
                ></IconBtn>
              </Flex>

              <Flex
                gap={"0px 20px"}
                wrap="wrap"
                // border="dashed 1px #aaa"
                borderRadius={"5px"}
                w="318px"
                m={0}
                mt={-4}
                p={0}
                h={2}
              >
                <Box w="64px"></Box>
                <Box w="64px"></Box>
                <Box w="64px" textAlign={"center"}>
                  ▲
                </Box>
                <Box w="64px"></Box>
              </Flex>
              <Flex
                gap={"4px 20px"}
                wrap="wrap"
                border="dashed 1px #aaa"
                borderRadius={"5px"}
                w="318px"
              >
                <Link
                  href="https://drive.google.com/drive/folders/1pBaeuO5zK4tBJAGLCYwjJG3G0Hl0OvCw?usp=sharing"
                  target="_blank"
                >
                  <Button w="64px" fontSize="0.8rem">
                    대치 상상
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1Dx8yEMrdB4gc3ajDZhka7ULFRObbKMUk?usp=sharing"
                  target="_blank"
                >
                  <Button w="64px" fontSize="0.8rem">
                    대치 개폴
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1v6J72pXwQUUi4dBtO7ZqhTgzyLBnaox4?usp=sharing"
                  target="_blank"
                >
                  <Button w="64px" fontSize="0.8rem">
                    대치 의대
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1yBQwRul-ak2eJ5ueV-YHFoUjdG9z78b_?usp=sharing"
                  target="_blank"
                >
                  <Button w="64px" fontSize="0.8rem">
                    압구정 상폴
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/11bZW17DVRkoccZPJBXgn5eCeo1EcAtEf?usp=sharing"
                  target="_blank"
                >
                  <Button w="64px" fontSize="0.8rem">
                    서초 상폴
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1J-f3oB03jT9sGxR2xS9MGTKoGHPgCTMF?usp=sharing"
                  target="_blank"
                >
                  <Button w="64px" fontSize="0.8rem">
                    잠실 상폴
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1EGDN_H-qNxZZFdKLEQYqN_qZasthAGR2?usp=sharing"
                  target="_blank"
                >
                  <Button w="64px" fontSize="0.8rem">
                    청담 개폴
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1xymI4O3iMjWWEM-qMXjCxsZKzJ3jkuSo?usp=sharing"
                  target="_blank"
                >
                  <Button w="64px" fontSize="0.8rem">
                    방배 개폴
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/17OtFVuVhv2bjdflj2Yl1CvnNH28Q_HlI?usp=sharing"
                  target="_blank"
                >
                  <Button w="64px" fontSize="0.8rem">
                    평촌 개폴
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/14ka5FnFik80Obd_dEJByDf087yv5Wy1_?usp=sharing"
                  target="_blank"
                >
                  <Button w="64px" fontSize="0.8rem">
                    송도 개폴
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1d6wynnCfD56t2z9VJLf890Kz4xI473vi?usp=sharing"
                  target="_blank"
                >
                  <Button w="64px" fontSize="0.8rem">
                    수지 개폴
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1IqAs3GfalUScKYeaJySyNCfzFBBFAFkK?usp=sharing"
                  target="_blank"
                >
                  <Button w="64px" fontSize="0.8rem">
                    경영지원부
                  </Button>
                </Link>
              </Flex>

              <Flex gap={5} wrap="wrap">
                <IconBtn
                  iconImage="https://cdn.iconscout.com/icon/free/png-256/free-team-1543465-1305963.png"
                  link="https://docs.google.com/spreadsheets/d/17niR7eIVjTuH8NocDotF-0otOn9EF4P_b5rxDaGMZJ8/edit?usp=sharing"
                  iconTitle="입학관리"
                ></IconBtn>
                <IconBtn
                  iconImage="https://cdn-icons-png.flaticon.com/512/1946/1946058.png"
                  link="https://docs.google.com/spreadsheets/d/1PnkxW6JHnDgBDRdpjrwBQn7etUouIrhXkNNKJa0OIXY/edit#gid=1132987259"
                  iconTitle="입테-초등부"
                ></IconBtn>
                <IconBtn
                  iconImage="https://cdn.icon-icons.com/icons2/1617/PNG/512/3700468-archive-document-education-exam-file-test_108747.png"
                  link="https://docs.google.com/spreadsheets/d/17FRY2yEpF8otE_OCJCvLHzMZnwEnXW5ylCG0GXoYCVQ/edit#gid=1250364125"
                  iconTitle="입테-중등부"
                ></IconBtn>
              </Flex>

              <Flex gap={5} wrap="wrap">
                <IconBtn
                  iconImage="https://static-00.iconduck.com/assets.00/discord-icon-512x511-blfje7wy.png"
                  link="https://discord.com/channels/1088002442060386376/1088002442651762760"
                  iconTitle="Discord"
                ></IconBtn>
                <IconBtn
                  iconImage="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png"
                  link="https://www.notion.so/813f68bc70e440e0aac7b405e01d8447?pvs=4"
                  iconTitle="Notion"
                ></IconBtn>
                <IconBtn
                  iconImage="/assets/icons/worklog.png"
                  link="https://docs.google.com/spreadsheets/d/1nDkM117tmrGhVech9AsIp3eMsf46w_NUcefqN-MBryU/edit#gid=872999154"
                  iconTitle="근무일지"
                ></IconBtn>
                <IconBtn
                  iconImage="https://s3-alpha.figma.com/hub/file/3152337111/0e0f44e4-8de2-49c9-b8f0-406ece8fd1b6-cover.png"
                  link="https://www.figma.com/"
                  iconTitle="Figma"
                ></IconBtn>
              </Flex>

              <Flex gap={5} wrap="wrap">
                <IconBtn
                  iconImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_ng65XZzr2-e7w_cbvC8f-K1ssCtCDEXPjLUZ_4g2l-nBNRc71sxVBPYBhfvy41YS3g4&usqp=CAU"
                  link="https://hosting.cafe24.com/"
                  iconTitle="카페24"
                ></IconBtn>
                <IconBtn
                  iconImage="https://yt3.ggpht.com/ytc/AMLnZu-kiGe5lU_EnJo72TrAqe73NpIgH7-Fqi4jzbigdA=s900-c-k-c0x00ffffff-no-rj"
                  link="https://www.gabia.com/"
                  iconTitle="가비아"
                ></IconBtn>
                <IconBtn
                  iconImage="https://pipedream.com/s.v0/app_1M0hkk/logo/orig"
                  link="https://imgbb.com/"
                  iconTitle="ImgBB"
                ></IconBtn>
                <IconBtn
                  iconImage="https://www.gstatic.com/analytics-suite/header/suite/v2/ic_analytics.svg"
                  link="https://analytics.google.com/analytics/web/#/p357454198/"
                  iconTitle="GA4"
                ></IconBtn>
              </Flex>

              <Flex gap={5} wrap="wrap">
                <IconBtn
                  iconImage="https://image.rocketpunch.com/company/72377/alrineunsaramdeul_logo_1583212120.png?s=400x400&t=inside"
                  link="https://smartsms.aligo.in/"
                  iconTitle="ALIGO문자"
                ></IconBtn>
              </Flex>

              <Divider />
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
            <Messages teamId={"gnBiz"} daysAgo={10} />
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}
