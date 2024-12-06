import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { GetServerSidePropsContext } from "next" // SSR

import { useSession } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form"

import getBranch from "@/lib/getBranch"

import {
  Box,
  Center,
  Image,
  Flex,
  Grid,
  GridItem,
  Divider,
} from "@chakra-ui/react"
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
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

type Inputs = {
  name: string
  password: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryData = await context.query
  const branchData = await getBranch(queryData.branchId || "")

  return {
    props: {
      branchId: queryData.branchId,
      // targetId: queryData.yearId,
      branch: branchData,
    },
  }
}

export default function CheckStudent({
  branchId,
  // targetId,
  branch,
}: {
  branchId: string
  // targetId: number
  branch: any
}) {
  const [isLog, setIsLog] = useState<boolean>(false)
  const student = useRef<any>(null)
  // const [student, setStudent] = useState<any>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  async function onSubmit(formData: any) {
    const values = {
      branchId: branchId,
      name: formData.name,
      password: formData.password,
      // timezoneOffset: new Date().getTimezoneOffset() * 60 * 1000,
    }

    console.log(values)

    const res = await fetch("/api/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    if (res.status === 200) {
      student.current = await res.json()
      setIsLog(true)
      console.log(student)
    } else {
      alert("학생이름, 암호를 확인해주시기 바랍니다")
    }
  }

  return (
    <>
      <Head>
        <title>개념폴리아·개념상상 학습보고서</title>
      </Head>
      <Center width="100%">
        {!isLog && (
          <Flex
            direction={"column"}
            alignItems={"center"}
            justify={"flex-start"}
            width="100%"
            minWidth="350px"
            maxWidth="400px"
            minHeight="640px"
            maxHeight="896px"
            bgImage={"/assets/images/student1.png"}
            bgSize={"100%"}
            bgPosition="top"
            bgRepeat={"no-repeat"}
          >
            <Box
              width="80%"
              mt={350}
              bgColor="white"
              boxShadow={"2px 2px 2px lightgray"}
              borderRadius={20}
              p={4}
            >
              <Center fontWeight="900" mb={4}>
                {branch && branch.branchTitle}
              </Center>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={Boolean(errors.name)}>
                  <Input
                    borderRadius={"10px 10px 0 0"}
                    // h={120}
                    placeholder={`아이디`}
                    size="sm"
                    resize="none"
                    maxLength={10}
                    {...register("name")}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message?.toString()}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.password)}>
                  <Input
                    // borderRadius={"10px 10px 0 0"}
                    // h={120}
                    placeholder={`비밀번호`}
                    size="sm"
                    resize="none"
                    maxLength={20}
                    {...register("password")}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message?.toString()}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  borderRadius={"0 0 10px 10px"}
                  w="100%"
                  // colorScheme="teal"
                  // color="white"
                  isLoading={isSubmitting}
                  type="submit"
                  colorScheme="blue"
                  bgColor="#0C073B"
                  color="white"
                >
                  <Box>
                    <Box fontSize="0.8rem">로그인</Box>
                  </Box>
                </Button>
              </form>
            </Box>
            <Box width="80%" fontSize="0.7rem" mt={4} color="gray">
              ·학원에서 부여받은 아이디, 비밀번호를 사용하시기 바랍니다.
              <br />
              ·아이디와 비밀번호를 잊어버리신 경우 학원으로 문의하시기 바랍니다.
            </Box>
            <Divider width="80%" mt={50} mb={30} border="solid 1px lightgray" />
            <Image src="/assets/logos/gnssgnpolya.png" width="50%" />
          </Flex>
        )}
        {isLog && (
          <Flex
            direction={"column"}
            alignItems={"center"}
            justify={"flex-start"}
            width="100%"
            minWidth="350px"
            maxWidth="400px"
            minHeight="640px"
            maxHeight="896px"
            bgImage={"/assets/images/student2.png"}
            bgSize={"100%"}
            bgPosition="top"
            bgRepeat={"no-repeat"}
          >
            <Box
              width="80%"
              mt={300}
              bgColor="white"
              boxShadow={"2px 2px 2px #eee"}
              border="solid 1px #ddd"
              borderRadius={20}
              p={4}
            >
              <Flex
                width="100%"
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={4}
              >
                <Box fontSize="1.5rem" fontWeight="900">
                  {student.current.data.name} 학생
                </Box>
                <Divider width="20%" border="solid 1px #aaa" mb={4} />
                <Button
                  width="80%"
                  colorScheme="blue"
                  bgColor="#0C073B"
                  color="white"
                  onClick={() =>
                    window.open(
                      student.current.data.link1.split("?").join("/sheet?")
                    )
                  }
                >
                  {student.current.data.title1}
                </Button>
                <Button
                  width="80%"
                  colorScheme="blue"
                  bgColor="#0C073B"
                  color="white"
                  onClick={() =>
                    window.open(
                      student.current.data.link2.split("?").join("/sheet?")
                    )
                  }
                >
                  {student.current.data.title2}
                </Button>
                <Button
                  width="80%"
                  colorScheme="blue"
                  bgColor="#0C073B"
                  color="white"
                  onClick={() =>
                    window.open(
                      student.current.data.link3.split("?").join("/sheet?")
                    )
                  }
                >
                  {student.current.data.title3}
                </Button>
                <Button
                  width="80%"
                  colorScheme="blue"
                  bgColor="#0C073B"
                  color="white"
                  onClick={() =>
                    window.open(
                      student.current.data.link4.split("?").join("/sheet?")
                    )
                  }
                >
                  {student.current.data.title4}
                </Button>
                <Divider mt={30} />
                <Image src="/assets/logos/gnssgnpolya.png" width="50%" />
              </Flex>
            </Box>
          </Flex>
        )}
      </Center>
    </>
  )
}
