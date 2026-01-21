import { useEffect, useState } from "react"
import Link from "next/link"
import Head from "next/head"
import { useForm, SubmitHandler } from "react-hook-form"

import { useSession } from "next-auth/react"
import getTeam from "@/lib/getTeam"

import Calendar from "@/components/intra/team/calendar"
import colors from "@/theme/colors"
import { Box, Button, Divider, Grid, GridItem } from "@chakra-ui/react"
import { Flex, VStack, HStack, Image, Center } from "@chakra-ui/react"
import {
  InputAddon,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputLeftElement,
  InputRightElement,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  Textarea,
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
          alt="icon"
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

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  async function onSubmitHJ(formData: any) {
    const values = {
      sid: formData.sidHJ,
    }

    // console.log(values.sid)
    window.open(
      `https://www.hanjin.com/kor/CMS/DeliveryMgr/WaybillResult.do?mCode=MN038&wblnum=${values.sid
        .split("_")
        .join("")
        .split("-")
        .join("")
        .split(" ")
        .join("")}&schLang=KR&wblnumText=`
    )
  }

  async function onSubmitCJ(formData: any) {
    const values = {
      sid: formData.sidCJ,
    }

    // console.log(values.sid)
    window.open(
      `https://trace.cjlogistics.com/web/info.jsp?slipno=${values.sid
        .split("_")
        .join("")
        .split("-")
        .join("")
        .split(" ")
        .join("")}`
    )
  }

  async function onSubmitPost(formData: any) {
    const values = {
      sid: formData.sidPost,
    }

    // console.log(values.sid)
    window.open(
      `https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?sid1=${values.sid
        .split("_")
        .join("")
        .split("-")
        .join("")
        .split(" ")
        .join("")}`
    )
  }

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

            <Box
              justifyContent={"space-between"}
              alignItems={"center"}
              w="100%"
              color={colors.grey}
              fontWeight={700}
              borderBottom={`solid 1px ${colors.grey}`}
              mt={10}
            >
              택배조회
            </Box>
            <Box border="solid 1px #4682FE" borderRadius={10} mt={2} p={2}>
              <Box>
                <form onSubmit={handleSubmit(onSubmitHJ)}>
                  <InputGroup>
                    <InputAddon>한진택배</InputAddon>
                    <Input placeholder="송장번호" {...register("sidHJ")} />
                  </InputGroup>
                </form>
                <form onSubmit={handleSubmit(onSubmitCJ)}>
                  <InputGroup>
                    <InputAddon>CJ대한통운</InputAddon>
                    <Input placeholder="송장번호" {...register("sidCJ")} />
                  </InputGroup>
                </form>
                <form onSubmit={handleSubmit(onSubmitPost)}>
                  <InputGroup>
                    <InputAddon>우체국택배</InputAddon>
                    <Input placeholder="송장번호" {...register("sidPost")} />
                  </InputGroup>
                </form>
              </Box>
            </Box>
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
                  iconImage="/assets/icons/hjjn.jpg"
                  link="https://hanjinchatbot-web.azurewebsites.net/"
                  iconTitle="한진택배지니"
                ></IconBtn>
                <IconBtn
                  iconImage="/assets/icons/boxlist.png"
                  link="https://docs.google.com/spreadsheets/d/1Gz1HlXGJs4Zt86hmAncrLOoGOWoZnozHbW4uIOW5zgo/edit?usp=sharing"
                  iconTitle="택배내역"
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
                <IconBtn
                  iconImage="/assets/icons/scoreboard.png"
                  link="https://drive.google.com/drive/folders/1_uqKuV8iGm6qV46hoadsjZ6_o06NRDth?usp=sharing"
                  iconTitle="학습보고서"
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
                <IconBtn
                  iconImage="/assets/icons/googlecalendar.png"
                  link="https://calendar.google.com/"
                  iconTitle="구글 캘린더"
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
                  href="https://drive.google.com/drive/folders/1d6wynnCfD56t2z9VJLf890Kz4xI473vi?usp=sharing"
                  target="_blank"
                >
                  <Button w="64px" fontSize="0.8rem">
                    수지 개폴
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1VMnmeYMT9j6j2cq4k3FSzy4xz1G0t_ew?usp=drive_link"
                  target="_blank"
                >
                  <Button w="64px" fontSize="0.8rem">
                    남동탄 개폴
                  </Button>
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1mESPvDFYTVSyxpIAmTtu4jyRAVoAqo08?usp=sharing"
                  target="_blank"
                >
                  <Button w="64px" fontSize="0.8rem">
                    다산 개폴
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
                <Link
                  href="https://drive.google.com/drive/folders/14ka5FnFik80Obd_dEJByDf087yv5Wy1_?usp=sharing"
                  target="_blank"
                >
                  <Button w="64px" fontSize="0.8rem">
                    송도 개폴
                  </Button>
                </Link>
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
                  // link="https://docs.google.com/spreadsheets/d/1xjslOj-jsnxsA--YTAIpbwKf_QXsxV_30lnD7dWUIXs/edit?gid=1681472766#gid=1681472766"
                  link={teamData?.worklog}
                  iconTitle="근무일지"
                ></IconBtn>
                <IconBtn
                  iconImage="https://play-lh.googleusercontent.com/UcVVF38hFqysYyLVSX_wckqw5ZXHR1Uuv4k0xqIOaZPo8ig5lyCUqePxM5EdivQ_J7Mt=w240-h480-rw"
                  link="https://www.coupang.com/"
                  iconTitle="쿠팡"
                ></IconBtn>
              </Flex>

              <Flex gap={5} wrap="wrap">
                <IconBtn
                  iconImage="/assets/icons/cafe24.jpg"
                  link="https://hosting.cafe24.com/"
                  iconTitle="카페24"
                ></IconBtn>
                <IconBtn
                  iconImage="https://yt3.ggpht.com/ytc/AMLnZu-kiGe5lU_EnJo72TrAqe73NpIgH7-Fqi4jzbigdA=s900-c-k-c0x00ffffff-no-rj"
                  link="https://www.gabia.com/"
                  iconTitle="가비아"
                ></IconBtn>
                <IconBtn
                  iconImage="https://s3-alpha.figma.com/hub/file/3152337111/0e0f44e4-8de2-49c9-b8f0-406ece8fd1b6-cover.png"
                  link="https://www.figma.com/"
                  iconTitle="Figma"
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
                <IconBtn
                  iconImage="https://pipedream.com/s.v0/app_1M0hkk/logo/orig"
                  link="https://imgbb.com/"
                  iconTitle="ImgBB"
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
