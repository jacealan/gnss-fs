import { useEffect, useState } from "react"

import colors from "@/theme/colors"
import { Box, Badge, Divider, Flex } from "@chakra-ui/react"
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
import {
  PhoneIcon,
  EmailIcon,
  ExternalLinkIcon,
  AttachmentIcon,
  CopyIcon,
} from "@chakra-ui/icons"
import {
  EditIcon,
  CheckCircleIcon,
  ChatIcon,
  CalendarIcon,
} from "@chakra-ui/icons"
import { BsPerson, BsFileEarmarkSpreadsheet } from "react-icons/bs"
import { FaBlogger, FaGoogleDrive } from "react-icons/fa"
import { IoIosImages } from "react-icons/io"
import { SiNaver, SiNotion } from "react-icons/si"

export default function Info({
  teamData,
  teamId,
}: {
  teamData: any
  teamId: string | string[]
}) {
  const [modalText, setModalText] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const [sortedMembers, setSortedMembers] = useState<any>(null)

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
    setTimeout(onClose, 500)
  }

  // useEffect(() => {
  //   setSortedMembers(
  //     teamData?.members.sort((x: any, y: any) => x.userName - y.userName)
  //   )
  // }, [teamData])

  return (
    <>
      <Box
        width="350px"
        p={"8px"}
        fontSize={"0.7rem"}
        bgColor={colors.primary}
        borderRadius={"0 20px 0 0"}
      >
        <Box fontWeight={700} mb={1} fontSize={"0.8rem"}>
          {teamData?.title}
        </Box>
        {teamData?.phone && (
          <Box>
            <a href={`tel://${teamData.phone}`}>{teamData.phone}</a>&nbsp;&nbsp;
            <button onClick={() => openModal(teamData.phone)}>
              <CopyIcon />
            </button>
            <br />
            <a
              href={`https://map.naver.com/v5/search/${teamData.address}`}
              target="_blank"
            >
              {teamData.address}
            </a>
            &nbsp;&nbsp;
            <button onClick={() => openModal(teamData.address)}>
              <CopyIcon />
            </button>
          </Box>
        )}
        {teamData?.phoneElement && (
          <Box>
            <Badge>초등</Badge>{" "}
            <a href={`tel://${teamData.phoneElement}`}>
              {teamData.phoneElement}
            </a>
            &nbsp;&nbsp;
            <button onClick={() => openModal(teamData.phoneElement)}>
              <CopyIcon />
            </button>
            <br />
            <a
              href={`https://map.naver.com/v5/search/${teamData.addressElement}`}
              target="_blank"
            >
              {teamData.addressElement}
            </a>
            &nbsp;&nbsp;
            <button onClick={() => openModal(teamData.addressElement)}>
              <CopyIcon />
            </button>
          </Box>
        )}
        {teamData?.phoneMiddle && (
          <Box>
            <Badge>중등</Badge>{" "}
            <a href={`tel://${teamData.phoneMiddle}`}>{teamData.phoneMiddle}</a>
            &nbsp;&nbsp;
            <button onClick={() => openModal(teamData.phoneMiddle)}>
              <CopyIcon />
            </button>
            <br />
            <a
              href={`https://map.naver.com/v5/search/${teamData.addressMiddle}`}
              target="_blank"
            >
              {teamData.addressMiddle}
            </a>
            &nbsp;&nbsp;
            <button onClick={() => openModal(teamData.addressMiddle)}>
              <CopyIcon />
            </button>
          </Box>
        )}
        {teamData?.phoneHigh && (
          <Box>
            <Badge>고등</Badge>{" "}
            <a href={`tel://${teamData.phoneHigh}`}>{teamData.phoneHigh}</a>
            &nbsp;&nbsp;
            <button onClick={() => openModal(teamData.phoneHigh)}>
              <CopyIcon />
            </button>
            <br />
            <a
              href={`https://map.naver.com/v5/search/${teamData.addressHigh}`}
              target="_blank"
            >
              {teamData.addressHigh}
            </a>
            &nbsp;&nbsp;
            <button onClick={() => openModal(teamData.addressHigh)}>
              <CopyIcon />
            </button>
          </Box>
        )}
        {/* {teamData?.members.length > 0 && (
          <>
            <Divider border="dashed 1px #aaa" mt={1} mb={1} />
            <Flex gap={"0px 2px"} flexWrap={"wrap"}>
              {teamData?.members
                .sort((a: any, b: any) => a.userName.localeCompare(b.userName))
                .map((member: any, index: number) => (
                  <Box w="80px" key={index}>
                    {member.userName} {member.userIntraPhone}
                  </Box>
                ))}
            </Flex>
          </>
        )} */}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalText}</ModalHeader>
          <ModalBody>클립보드에 복사되었습니다</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
