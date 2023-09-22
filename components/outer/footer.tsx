import theme from "@/components/outer/theme.json"
import { Center, Box, Flex } from "@chakra-ui/react"
import { useRealViewport } from "next-real-viewport"

import Link from "next/link"

function Footer() {
  const { vw, vh } = useRealViewport()

  return (
    <Center backgroundColor={theme.grey} color={theme.white}>
      <Box
        width={{ base: "100%", lg: "992px" }}
        padding={"15px 20px"}
        margin={0}
      >
        <Flex justifyContent={"space-between"}>
          <Box fontSize={14} fontWeight={600}>
            원리상상(주)
          </Box>
          <Link href="/intra">ⓘ</Link>
        </Flex>
        {/* <Box fontSize={10} fontWeight={300}>
          개념상상 | 개념폴리아 | 개념상상GMP | 개념상상 과학마스터올 |
          리틀폴리아 | 교육연구소 | 입시전략연구소 | THE독한공부
        </Box> */}
        <Box fontSize={10} fontWeight={300}>
          대표 : 이재익, 사업자등록번호 : 120-87-37234, 주소 : 서울특별시 강남구
          도곡로 418 강원빌딩 4층 개념상상대치관, 전화 :{" "}
          <a href="tel://02-566-0508">02-566-0508</a>
        </Box>
        <Box fontSize={10} fontWeight={300}>
          ⓒ 원리상상(주) All Right Reserved
        </Box>
      </Box>
    </Center>
  )
}

export default Footer
