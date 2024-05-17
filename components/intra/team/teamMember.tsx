import { useEffect, useState } from "react"

import colors from "@/theme/colors"
import { Box, Badge, Divider, Flex, Link } from "@chakra-ui/react"
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
        <Flex
          justifyContent={"space-between"}
          alignItems={"flex-end"}
          fontWeight={700}
          mb={1}
          fontSize={"0.8rem"}
        >
          <Box>{teamData?.title}: 팀원-내선번호</Box>
          <Box>
            <Box fontSize={"0.7rem"} fontWeight={500}>
              {teamData?.worklog && (
                <a href={teamData?.worklog} target="_blank">
                  🗓️근무일지
                </a>
              )}
              {teamData?.worklogSci && (
                <a href={teamData?.worklogSci} target="_blank">
                  &nbsp;/ 과학
                </a>
              )}
            </Box>
            <Box fontSize={"0.7rem"} fontWeight={500}>
              {(teamId == "SsDc" ||
                teamId == "PlDc" ||
                teamId == "SsMd" ||
                teamId == "SPAk" ||
                teamId == "PlCd" ||
                teamId == "SPSc" ||
                teamId == "SPJs" ||
                teamId == "LbJs" ||
                teamId == "PlPc") && (
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfB23qoeLdHvY-9wlFGJzUaVFGAa3sondnhnYWItIO1_WBNKw/viewform"
                  target="_blank"
                >
                  ✉️서류발급 신청서
                </a>
              )}
            </Box>
          </Box>
        </Flex>
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
