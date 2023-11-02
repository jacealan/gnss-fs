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

export default function TeamMember({
  teamData,
  teamId,
}: {
  teamData: any
  teamId: string | string[]
}) {
  return (
    <>
      <Box
        width="350px"
        p={"8px"}
        fontSize={"0.7rem"}
        bgColor={colors.primary}
        borderRadius={"20px 20px 0 0"}
      >
        <Box fontWeight={700} mb={1} fontSize={"0.8rem"}>
          {teamData?.title} : 팀원-내선번호
        </Box>
        {teamData?.members.length > 0 && (
          <>
            <Divider border="dashed 1px #aaa" mt={1} mb={1} />
            <Flex gap={"4px"} flexWrap={"wrap"}>
              {teamData?.members
                .sort((a: any, b: any) => a.userName.localeCompare(b.userName))
                .map((member: any, index: number) => (
                  <Box
                    w="80px"
                    key={index}
                    border="dashed 1px #aaa"
                    borderRadius={"10px"}
                    p={1}
                    textAlign={"center"}
                  >
                    {member.userName} {member.userIntraPhone}
                  </Box>
                ))}
            </Flex>
          </>
        )}
      </Box>
    </>
  )
}
