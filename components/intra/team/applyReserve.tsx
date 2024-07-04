import { useEffect, useRef } from "react"
// import Link from "next/link"
import colors from "@/theme/colors"
import { CheckIcon, AddIcon } from "@chakra-ui/icons"
import { Box, Flex, Button, Link, Center } from "@chakra-ui/react"

export default function ApplyReserve({
  askStatus,
  applyReserveStatus,
  applyChart,
  teamData,
}: {
  askStatus: string
  applyReserveStatus: string
  applyChart: string
  teamData: any
}) {
  return (
    <>
      <Flex flexDirection={"column"} justifyContent={"flex-start"}>
        <Box>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            width="350px"
            color={colors.grey}
            fontWeight={700}
            borderBottom={`solid 1px ${colors.grey}`}
            mb={1}
          >
            <Box>상담예약</Box>
            <Flex alignItems={"center"}>
              <Link href={teamData?.askInput} target="_blank">
                <Center
                  color="#aaa"
                  border="solid 1px #aaa"
                  borderRadius={"10px"}
                  w="14px"
                  h="14px"
                  mr={1}
                  mt="1px"
                  fontSize="0.8rem"
                >
                  +
                </Center>
                {/* </Button> */}
              </Link>
              <Link href={teamData?.askSheet} target="_blank">
                <Button
                  bgColor={colors.blue2}
                  color="white"
                  fontSize="0.6rem"
                  h="20px"
                  leftIcon={<CheckIcon />}
                >
                  확인
                </Button>
              </Link>
            </Flex>
          </Flex>

          <Box fontSize="0.6rem" w="100%" textAlign={"right"}>
            시트의 변경사항 적용까지 최대 5분의 시간이 필요합니다
          </Box>
          <object
            type="text/html"
            width="350px"
            height="300px"
            data={askStatus.split("?").join("/sheet?")}
          ></object>
        </Box>

        <Box>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            width="350px"
            color={colors.grey}
            fontWeight={700}
            borderBottom={`solid 1px ${colors.grey}`}
            mt={4}
            mb={1}
          >
            <Box>입학테스트</Box>
            <Box>
              <Link href={teamData?.applyReserveSheet} target="_blank">
                <Button
                  bgColor={colors.blue2}
                  color="white"
                  fontSize="0.6rem"
                  h="20px"
                  leftIcon={<CheckIcon />}
                >
                  확인
                </Button>
              </Link>
            </Box>
          </Flex>

          <Box fontSize="0.6rem" w="100%" textAlign={"right"}>
            시트의 변경사항 적용까지 최대 5분의 시간이 필요합니다
          </Box>
          <Box width="350px" height="400px">
            <object
              type="text/html"
              width="350px"
              height="100%"
              data={applyReserveStatus.split("?").join("/sheet?")}
            ></object>
          </Box>
        </Box>

        <Box>
          <object
            type="text/html"
            width="350px"
            height="220px"
            data={applyChart}
          ></object>
        </Box>
      </Flex>
    </>
  )
}
