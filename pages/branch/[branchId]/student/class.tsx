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

import {
  format,
  formatISO,
  differenceInHours,
  addDays,
  formatDistance,
  formatRelative,
  subDays,
  getDay,
  getDate,
  parseISO,
  parse,
  isSameDay,
} from "date-fns"

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

export default function LogStudent({
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
  const log = useRef<any>(null)
  const [classes, setClasses] = useState<any>(null)
  // const [student, setStudent] = useState<any>(null)
  const [enableUpdate, setEnableUpdate] = useState<boolean>(true)

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

    // console.log(values)

    const res = await fetch("/api/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    // console.log(res.json())
    if (res.status === 200) {
      student.current = await res.json()
      student.current.data.branchId = branchId
      setIsLog(true)
      // console.log(student.current)
      window.localStorage.setItem(
        "studentData",
        JSON.stringify(student.current)
      )
      // console.log(student.current.data.link1.split("="))
      // console.log(student.current.data.link1.split("=")[2])
      // student.current.data.pubhtml +
      //                     "/sheet?gid=" +
      //                     student.current.data.link1.split("=")[-1] +
      //                     "&single=true"
    } else {
      alert("학생이름, 암호를 확인해주시기 바랍니다")
    }
  }

  async function getLog() {
    const res = await fetch("/api/student/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        branchId: branchId,
        name: student.current.data.name,
        password: "gnedubiz",
        // timezoneOffset: new Date().getTimezoneOffset() * 60 * 1000,
      }),
    })

    if (res.status === 200) {
      log.current = await res.json()
      if (log.current.length > 0)
        log.current?.sort((a: any, b: any) => a[1] - b[1])
      window.localStorage.setItem("log", JSON.stringify(log.current))
      window.localStorage.setItem("getLogDate", formatISO(new Date()))
    }
  }

  async function getClassesNow() {
    await getLog()

    const classesSet = new Set()
    for (let row of log.current?.data) {
      if (row[6] !== "B" && row[6] !== "P") {
        continue
      }

      if (row[9] && row[10]) {
        classesSet.add(
          JSON.stringify([
            1,
            row[2],
            row[6],
            Number(row[7]),
            Number(row[8]),
            row[9],
            row[10],
          ])
        )
      }
      if (row[20] && row[21]) {
        classesSet.add(
          JSON.stringify([
            2,
            row[2],
            row[6],
            Number(row[7]),
            Number(row[8]),
            row[20],
            row[21],
          ])
        )
      }
      // console.log(row)
    }

    const classesArray: any[] = []
    classesSet.forEach((row: any) => {
      classesArray.push(JSON.parse(row))
    })
    await classesArray.sort((a, b) => -(a[4] - b[4]))
    // classes.current = classesArray
    setClasses(() => classesArray)

    // console.log(classesSet)
    // console.log(classesArray)
  }

  async function getClasses() {
    const tempDate = "2000/01/01"
    let getLogDate = await window.localStorage.getItem("getLogDate")
    // console.log(getLogDate)
    const logDate = parseISO(getLogDate ? getLogDate : tempDate)
    const logData = await window.localStorage.getItem("log")
    if (!logData || differenceInHours(new Date(), logDate) >= 1) {
      await getLog()
    } else {
      log.current = await JSON.parse(logData)
    }
    // console.log(log.current)
    // if (!log.current) return

    const classesSet = new Set()
    for (let row of log.current?.data) {
      if (row[6] !== "B" && row[6] !== "P") {
        continue
      }

      if (row[9] && row[10]) {
        classesSet.add(
          JSON.stringify([
            1,
            row[2],
            row[6],
            Number(row[7]),
            Number(row[8]),
            row[9],
            row[10],
          ])
        )
      }
      if (row[20] && row[21]) {
        classesSet.add(
          JSON.stringify([
            2,
            row[2],
            row[6],
            Number(row[7]),
            Number(row[8]),
            row[20],
            row[21],
          ])
        )
      }
      // console.log(row)
    }

    const classesArray: any[] = []
    classesSet.forEach((row: any) => {
      classesArray.push(JSON.parse(row))
    })
    await classesArray.sort((a, b) => -(a[4] - b[4]))
    setClasses(() => classesArray)
  }

  useEffect(() => {
    let studentData = window.localStorage.getItem("studentData")
    if (studentData) {
      setIsLog(true)
      student.current = JSON.parse(studentData)
    }
  }, [])

  useEffect(() => {
    let logData = window.localStorage.getItem("log")
    if (isLog && !classes) {
      getLog()
      getClasses()
    }
  }, [isLog])

  return (
    <>
      <Head>
        <title>
          {student.current && student.current.data && student.current.data.name
            ? student.current.data.name + " - 개념폴리아·개념상상 학습보고서"
            : "개념폴리아·개념상상 학습보고서"}
        </title>
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
              <Center fontWeight="900" mb={4} userSelect={"none"}>
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
                    pt={6}
                    pb={6}
                    {...register("name")}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message?.toString()}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={Boolean(errors.password)}>
                  <Input
                    type="password"
                    // borderRadius={"10px 10px 0 0"}
                    // h={120}
                    placeholder={`비밀번호`}
                    size="sm"
                    resize="none"
                    maxLength={20}
                    pt={6}
                    pb={6}
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
                    <Box fontSize="0.8rem" userSelect={"none"}>
                      로그인
                    </Box>
                  </Box>
                </Button>
              </form>
            </Box>
            <Box
              width="80%"
              fontSize="0.7rem"
              mt={4}
              color="gray"
              userSelect={"none"}
            >
              ·학원에서 부여받은 아이디, 비밀번호를 사용하시기 바랍니다.
              <br />
              ·아이디와 비밀번호를 잊어버리신 경우 학원으로 문의하시기 바랍니다.
            </Box>
            <Divider width="80%" mt={50} mb={30} border="solid 1px lightgray" />
            <Image src="/assets/logos/gnssgnpolya.png" alt="logo" width="50%" />
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
                <Box>
                  <Box fontSize="1.5rem" fontWeight="900" userSelect={"none"}>
                    {student.current.data.name} 학생
                  </Box>
                  <Center width="100%">
                    <Box
                      color="gray"
                      fontSize="0.7rem"
                      border="1px #aaa solid"
                      borderRadius={10}
                      pl={2}
                      pr={2}
                      _hover={{ cursor: "pointer" }}
                      onClick={() => {
                        log.current = null
                        setClasses(null)
                        window.localStorage.removeItem("studentData")
                        window.localStorage.removeItem("log")
                        window.localStorage.removeItem("getLogDate")
                        setIsLog(false)
                      }}
                      userSelect={"none"}
                    >
                      logout
                    </Box>
                    <Box
                      color={enableUpdate ? "gray" : "#eee"}
                      fontSize="0.7rem"
                      border={
                        enableUpdate ? "1px #aaa solid" : "1px #eee solid"
                      }
                      borderRadius={10}
                      ml={2}
                      pl={2}
                      pr={2}
                      _hover={{
                        cursor: enableUpdate ? "pointer" : "default",
                      }}
                      onClick={() => {
                        if (enableUpdate) {
                          setClasses(null)
                          setEnableUpdate(false)
                          setTimeout(() => {
                            setEnableUpdate(true)
                          }, 600000)
                          window.localStorage.removeItem("log")
                          getClassesNow()
                        }
                      }}
                      userSelect={"none"}
                    >
                      update
                    </Box>
                  </Center>
                  {enableUpdate === false && (
                    <Center width="100%">
                      <Box
                        fontSize="0.5rem"
                        mt={1}
                        color="grey"
                        userSelect={"none"}
                      >
                        update는 10분당 1회 가능합니다.
                      </Box>
                    </Center>
                  )}
                </Box>
                <Divider width="20%" border="solid 1px #aaa" mb={4} />
                {classes?.map((classObj: any) => (
                  <Box
                    width="80%"
                    borderRadius={"6px"}
                    // colorScheme="blue"
                    bgColor="#0C073B"
                    _hover={{ bg: "#1267d3" }}
                    color="white"
                    pt={1}
                    pb={1}
                    key={classObj[1] + "_" + classObj[0]}
                  >
                    <a href={classObj[1] + "/" + classObj[0]}>
                      <Box width="100%" textAlign="center" userSelect={"none"}>
                        {classObj[6]}
                      </Box>
                      <Box
                        width="100%"
                        textAlign="center"
                        fontSize={"0.6rem"}
                        color="#ddd"
                        userSelect={"none"}
                      >
                        {classObj[1]} · {classObj[5]}
                      </Box>
                    </a>
                  </Box>
                ))}
                {classes == null && (
                  <Box userSelect={"none"}>잠시만 기다려주세요</Box>
                )}

                <Divider mt={30} />
                <Image
                  src="/assets/logos/gnssgnpolya.png"
                  alt="logo"
                  width="50%"
                />
              </Flex>
            </Box>
          </Flex>
        )}
      </Center>
    </>
  )
}
