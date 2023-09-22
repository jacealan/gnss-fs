// import Link from "next/link"
import colors from "@/theme/colors"
import { CheckIcon, AddIcon } from "@chakra-ui/icons"
import { Box, Flex, Button, Link } from "@chakra-ui/react"

export default function ApplyReserve({
  askStatus,
  applyReserveStatus,
  teamData,
}: {
  askStatus: string
  applyReserveStatus: string
  teamData: any
}) {
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
          <Box>상담예약자</Box>
          <Box>
            <Link href={teamData?.askInput} target="_blank">
              <Button
                bgColor={colors.blue21}
                color="white"
                fontSize="0.6rem"
                h="20px"
                leftIcon={<AddIcon />}
              >
                입력
              </Button>
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
          </Box>
        </Flex>

        <object
          type="text/html"
          width="350px"
          height="300px"
          data={askStatus}
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
          mb={4}
        >
          <Box>입학테스트 예약자</Box>
          <Box>
            <Link href={teamData?.applyReserve} target="_blank">
              <Button
                bgColor={colors.blue21}
                color="white"
                fontSize="0.6rem"
                h="20px"
                leftIcon={<AddIcon />}
              >
                입력
              </Button>
            </Link>
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

        <object
          type="text/html"
          width="350px"
          height="500px"
          data={applyReserveStatus}
        ></object>
      </Box>
    </>
  )
}
