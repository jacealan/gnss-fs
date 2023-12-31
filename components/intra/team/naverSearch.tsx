import { useState, useEffect } from "react"
import {
  Center,
  VStack,
  Box,
  Grid,
  GridItem,
  HStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"

import colors from "@/theme/colors"

export default function NaverSearch() {
  const [keywordNaver, setKeywordNaver] = useState("")
  // const [keywordGoogle, setKeywordGoogle] = useState("")

  // const placeHolder = ["개념상상", "개념폴리아", "개념상상"]
  // const [rdnum, setRdnum] = useState(0)

  // useEffect(() => {
  //   setRdnum(Math.floor(Math.random() * 2))
  // }, [])

  return (
    <>
      {/* <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        w={{ base: "100%", lg: "992px" }}
        gap={5}
      >
        <GridItem> */}
      <form
        onSubmit={() => {
          window.open(
            `https://search.naver.com/search.naver?query=${keywordNaver}`
          )
        }}
      >
        <FormControl>
          <HStack w="100%" bgColor={colors.primary}>
            {/* <FormLabel>NAVER</FormLabel> */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="green.300" />
              </InputLeftElement>
              <Input
                type="search"
                value={keywordNaver}
                onChange={(e) => setKeywordNaver(e.target.value)}
                focusBorderColor="green.400"
                placeholder={"(네이버) 검색어를 입력해주세요"}
              />
              <InputRightElement>
                <Button colorScheme="green" type="submit">
                  N
                </Button>
              </InputRightElement>
            </InputGroup>
          </HStack>
        </FormControl>
      </form>
    </>
  )
}
