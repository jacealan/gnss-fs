import { useEffect, useState } from "react"
import Link from "next/link"
import moment from "moment-timezone"

import colors from "@/theme/colors"
import { Box, Button, Badge, Flex, Stack } from "@chakra-ui/react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react"

import {
  EditIcon,
  CheckCircleIcon,
  ChatIcon,
  CalendarIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons"
import { BiBuildingHouse, BiCommentEdit } from "react-icons/bi"

export default function Notice({ teamId }: { teamId: any }) {
  const [notices, setNotices] = useState<any[]>([])
  const [today, setToday] = useState(new Date())

  const getNotices = async () => {
    if (teamId) {
      const res =
        teamId === "gnBiz"
          ? await fetch("/api/notice/all")
          : await fetch(`/api/notice/${teamId}`)
      const resData = await res.json()
      setNotices(resData.data)
    }
  }

  useEffect(() => {
    getNotices()
  }, [teamId])

  return (
    <>
      <Box>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          width="350px"
          color={colors.grey}
          fontWeight={700}
          borderBottom={`solid 1px ${colors.grey}`}
          mb={4}
        >
          <Box>공지사항</Box>
          <Link href={`/intra/team/${teamId}/editNotice`}>
            <BiCommentEdit />
          </Link>
        </Flex>
        <Box width="350px" p={"8px"} bgColor={colors.blue0} borderRadius={5}>
          {notices?.map((notice, index) => {
            // console.log(notice.title)
            // console.log(notice.startDate)
            // console.log(today.toISOString())
            // console.log(notice.endDate)
            // console.log(typeof notice.startDate, typeof today)
            // console.log(notice.endDate.add(1, "days"))
            if (
              moment(notice.startDate) <= moment(today.toISOString()) &&
              moment(today.toISOString()) <
                moment(notice.endDate).add(1, "days")
            )
              return (
                <Popover>
                  <PopoverTrigger>
                    <Button
                      w="100%"
                      bgColor="white"
                      fontWeight={400}
                      // size="sm"
                      p={0}
                      h="1.2rem"
                    >
                      <Box textAlign={"left"} w="100%" pl={3}>
                        {notice.createdFrom === "gnBiz" && (
                          <Badge colorScheme="red" mr={1}>
                            학원사업부
                          </Badge>
                        )}
                        {notice.createdFrom === "gnGa" && (
                          <Badge colorScheme="green" mr={1}>
                            경영지원부
                          </Badge>
                        )}
                        {notice.title}
                        {moment().tz("Asia/Seoul").format("YYYY-MM-DD") ===
                          moment(notice.endDate)
                            .tz("Asia/Seoul")
                            .format("YYYY-MM-DD") && (
                          <span style={{ fontSize: "1rem" }}> 💢</span>
                        )}
                      </Box>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>{notice.title}</PopoverHeader>
                    <PopoverBody>
                      {notice.description
                        .split("\n")
                        .map((line: string, index: number) => (
                          <div key={index}>
                            {line
                              .split(" ")
                              .map((word: string, index: number) =>
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
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              )
          })}
        </Box>
        {/* <Flex justifyContent={"flex-end"} width="100%" textAlign={"right"}>
          <Link href={`/intra/team/${teamId}/editNotice`}>
            <BiCommentEdit />
          </Link>
        </Flex> */}
      </Box>
    </>
  )
}
