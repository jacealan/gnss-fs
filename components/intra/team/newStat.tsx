import { useEffect, useRef } from "react"
// import Link from "next/link"
import colors from "@/theme/colors"
import { CheckIcon, AddIcon } from "@chakra-ui/icons"
import { Box, Flex, Button, Link, Center } from "@chakra-ui/react"

export default function NewStat({
  newStatus,
  newChart,
  teamData,
}: {
  newStatus: string
  newChart: string
  teamData: any
}) {
  return (
    <>
      {newStatus && (
        <>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            w="100%"
            color={colors.grey}
            fontWeight={700}
            borderBottom={`solid 1px ${colors.grey}`}
            mb={1}
            mt={6}
          >
            <Box>신입생</Box>
          </Flex>
          <Box fontSize="0.6rem" w="100%" textAlign={"right"}>
            시트의 변경사항 적용까지 최대 5분의 시간이 필요합니다
          </Box>
          <object
            type="text/html"
            width="350px"
            height="300px"
            data={newStatus.split("?").join("/sheet?")}
          ></object>
        </>
      )}
      <Box>
        <object
          type="text/html"
          width="350px"
          height="220px"
          data={newChart}
        ></object>
      </Box>
    </>
  )
}
