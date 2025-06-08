import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { GetServerSidePropsContext } from "next" // SSR

import { useSession } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form"

import getBranch from "@/lib/getBranch"
import StudentScore from "@/components/outer/studentScore"

import {
  Box,
  Center,
  Image,
  Flex,
  Grid,
  GridItem,
  Divider,
  HStack,
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
import { from } from "form-data"

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

export default function Teacher({
  branchId,
  // targetId,
  branch,
}: {
  branchId: string
  // targetId: number
  branch: any
}) {
  const [isLog, setIsLog] = useState<boolean>(false)
  const teacher = useRef<any>(null)
  const logs = useRef<any>(null)
  const logs1 = useRef<any>([])
  const logs2 = useRef<any>(null)

  const [classes1, setClasses1] = useState<any>(null)
  const [class1, setClass1] = useState<any>(null)
  const [students1, setStudents1] = useState<any>(null)
  const [student1, setStudent1] = useState<string>("")
  const [student1Log, setStudent1Log] = useState<any>(null)
  const [classes2, setClasses2] = useState<any>(null)
  const [class2, setClass2] = useState<any>(null)
  const [students2, setStudents2] = useState<any>(null)
  const [student2, setStudent2] = useState<string>("")
  const [student2Log, setStudent2Log] = useState<any>(null)

  const [enableUpdate, setEnableUpdate] = useState<boolean>(true)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const googleDate0 = new Date(1899, 11, 30)

  async function onSubmit(formData: any) {
    const values = {
      branchId: branchId,
      name: formData.name,
      password: formData.password,
      // timezoneOffset: new Date().getTimezoneOffset() * 60 * 1000,
    }

    // console.log(values)

    const res = await fetch("/api/teacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    // console.log(res.json())
    if (res.status === 200) {
      teacher.current = await res.json()
      getLogs()
      teacher.current.branchId = branchId
      teacher.current.password = formData.password
      setIsLog(true)
      console.log(teacher.current)
      window.localStorage.setItem(
        "teacherData",
        JSON.stringify(teacher.current)
      )
    } else {
      alert("이름, 암호를 확인해주시기 바랍니다")
    }
  }

  async function logout() {
    window.localStorage.removeItem("teacherData")
    window.localStorage.removeItem("teacherLog")
    window.localStorage.removeItem("getLogDate")
    setIsLog(false)
  }

  async function getLogs() {
    const res = await fetch("/api/teacher/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        branchId: branchId,
        name: teacher.current.name,
        password: "gnedubiz",
        // timezoneOffset: new Date().getTimezoneOffset() * 60 * 1000,
      }),
    })

    if (res.status === 200) {
      logs.current = await res.json()
      await logs.current.sort((a: any, b: any) => a[1] - b[1])
      divideLogs12()
      // console.log(logs.current)
      window.localStorage.setItem("teacherLog", JSON.stringify(logs.current))
      window.localStorage.setItem("getLogDate", formatISO(new Date()))
    }
  }

  async function divideLogs12() {
    if (logs.current === null) return

    const logs1Data = []
    const logs2Data = []
    const classes1Data = new Set<string>()
    const classes2Data = new Set<string>()

    for (const log of logs.current) {
      if (log[11] && log[9].includes(teacher.current.name)) {
        await logs1Data.push({
          classId: log[2],
          kind: log[6],
          startDate: log[7],
          endDate: log[8],
          teacher: log[9],
          subject: log[10],
          classDate: parse(log[1], "yyyy/MM/dd", new Date()),
          name: log[3],
          attendance: log[11],
          supplementDate: log[12]
            ? addDays(googleDate0, Number(log[12]))
            : null,
          homework: log[14],
          testNo: log[15],
          testTitle: log[16],
          testScore: log[17],
          testAvr: log[18],
          comment: log[19],
        })
        classes1Data.add(log[2])
      }
      if (log[22] && log[20].includes(teacher.current.name)) {
        await logs2Data.push({
          classId: log[2],
          kind: log[6],
          startDate: log[7],
          endDate: log[8],
          teacher: log[20],
          subject: log[21],
          classDate: parse(log[1], "yyyy/MM/dd", new Date()),
          name: log[3],
          attendance: log[22],
          supplementDate: log[23]
            ? addDays(googleDate0, Number(log[23]))
            : null,
          homework: log[25],
          testNo: log[26],
          testTitle: log[27],
          testScore: log[28],
          testAvr: log[29],
          comment: log[30],
        })
        classes2Data.add(log[2])
      }
    }

    logs1.current = await logs1Data
    logs2.current = await logs2Data
    const classes1wSubject = []
    for (const c of Array.from(classes1Data).reverse()) {
      const sbjOfOne = ""
      for (const s of logs1Data) {
        if (s.classId === c) {
          classes1wSubject.push({ classId: c, subject: s.subject })
          break
        }
      }
    }
    setClasses1(classes1wSubject)
    const classes2wSubject = []
    for (const c of Array.from(classes2Data).reverse()) {
      const sbjOfOne = ""
      for (const s of logs2Data) {
        if (s.classId === c) {
          classes2wSubject.push({ classId: c, subject: s.subject })
          break
        }
      }
    }
    setClasses2(classes2wSubject)

    // console.log(logs1Data)
    // console.log(classes1)
    // console.log(logs2.current)
  }

  async function selectStudents1(classId: string) {
    const studentsData = new Set()

    for (const log of logs1.current) {
      if (log.classId === classId) {
        await studentsData.add(log.name)
      }
    }

    await setStudents1(Array.from(studentsData).sort())
    // console.log(students1)
  }
  async function selectStudents2(classId: string) {
    const studentsData = new Set()

    for (const log of logs2.current) {
      if (log.classId === classId) {
        await studentsData.add(log.name)
      }
    }

    await setStudents2(Array.from(studentsData).sort())
    // console.log(students1)
  }

  async function selectLogs1(classId: string, student: string) {
    const selectLogs = []

    for (const log of logs1.current) {
      if (log.classId === classId && log.name === student) {
        selectLogs.push(log)
      }
    }

    await setStudent1Log(selectLogs)
    return selectLogs
  }

  async function selectLogs2(classId: string, student: string) {
    const selectLogs = []

    for (const log of logs2.current) {
      if (log.classId === classId && log.name === student) {
        selectLogs.push(log)
      }
    }

    await setStudent2Log(selectLogs)
    return selectLogs
  }

  async function getLocalStorage() {
    const teacherLog = await window.localStorage.getItem("teacherLog")
    if (teacherLog) {
      logs.current = await JSON.parse(teacherLog)
      await logs.current.sort((a: any, b: any) => a[1] - b[1])
      setClass1(null)
      await divideLogs12()
    }
  }

  useEffect(() => {
    let teacherData = window.localStorage.getItem("teacherData")
    // console.log(teacherData)
    if (teacherData) {
      setIsLog(true)
      teacher.current = JSON.parse(teacherData)
      // console.log("login")
      getLocalStorage()
    }
  }, [])

  return (
    <>
      <Head>
        <title>
          {`${teacher.current?.name} - ${branch && branch.branchTitle}`}
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
                    placeholder={`이름T`}
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
                    <Box fontSize="0.8rem">로그인</Box>
                  </Box>
                </Button>
              </form>
            </Box>
            <Box width="80%" fontSize="0.7rem" mt={4} color="gray">
              ·데스크에서 부여받은 비밀번호를 사용하시기 바랍니다.
            </Box>
            <Divider width="80%" mt={50} mb={30} border="solid 1px lightgray" />
            <Image src="/assets/logos/gnssgnpolya.png" alt="logo" width="50%" />
          </Flex>
        )}

        {isLog && (
          <>
            <Center flexDirection={"column"}>
              <Flex
                justifyContent={"space-between"}
                width="100%"
                bgColor="#0D073B"
                color="#FDFFAD"
                fontWeight={700}
                fontSize="1rem"
                p={2}
              >
                <HStack>
                  <Box userSelect={"none"}>{teacher.current.name}</Box>
                  <Box
                    color="white"
                    fontSize="0.7rem"
                    border="1px white solid"
                    borderRadius={10}
                    pl={2}
                    pr={2}
                    _hover={{ cursor: "pointer" }}
                    onClick={logout}
                    userSelect={"none"}
                  >
                    logout
                  </Box>
                  <Box
                    color={enableUpdate ? "white" : "grey"}
                    fontSize="0.7rem"
                    border={enableUpdate ? "1px white solid" : "1px grey solid"}
                    borderRadius={10}
                    pl={2}
                    pr={2}
                    _hover={{
                      cursor: enableUpdate ? "pointer" : "default",
                    }}
                    onClick={() => {
                      if (enableUpdate) {
                        setEnableUpdate(false)
                        setTimeout(() => {
                          setEnableUpdate(true)
                        }, 600000)
                        window.localStorage.removeItem("log")
                        getLogs()
                      }
                    }}
                    userSelect={"none"}
                  >
                    update
                  </Box>
                  {enableUpdate === false && (
                    <Box fontSize="0.5rem" color="white" userSelect={"none"}>
                      update는 10분당 1회 가능합니다.
                    </Box>
                  )}
                </HStack>
                <Box userSelect={"none"}>{branch && branch.branchTitle}</Box>
              </Flex>
              <Grid
                templateColumns={"1fr 1fr"}
                gap={"0 10px"}
                alignItems={"start"}
              >
                <GridItem border="solid 1px #eee" p={4}>
                  <Box
                    fontWeight={700}
                    bgColor="#39e75f"
                    userSelect={"none"}
                    mb={2}
                    p={1}
                  >
                    과정1
                  </Box>
                  <Grid
                    templateColumns={"1fr 1fr 1fr"}
                    gap={2}
                    overflowY={"auto"}
                    overflowX={"hidden"}
                    maxHeight={"140px"}
                  >
                    {classes1?.map((classTS: any, index: number) => (
                      <GridItem key={index}>
                        <Center
                          flexDirection={"column"}
                          width="100%"
                          minHeight="2.5rem"
                          m={class1?.classId == classTS.classId ? 0 : "1px"}
                          border={
                            class1?.classId == classTS.classId
                              ? "solid 2px #39e75f"
                              : "solid 1px #cefad0"
                          }
                          borderRadius={8}
                          fontWeight={
                            class1?.classId == classTS.classId ? 900 : 400
                          }
                          onClick={() => {
                            // console.log(classTS)
                            setClass1(classTS)
                            setStudent1("")
                            setStudent1Log(null)
                            selectStudents1(classTS.classId)
                          }}
                          _hover={{ cursor: "pointer" }}
                        >
                          <Center>
                            <Box fontSize="0.8rem" userSelect={"none"}>
                              {classTS.classId?.split("@")[0]}
                            </Box>
                            <Box fontSize="0.6rem" userSelect={"none"}>
                              @{classTS.classId?.split("@")[1]}
                            </Box>
                          </Center>
                          <Box fontSize="0.8rem" userSelect={"none"}>
                            {classTS.subject}
                          </Box>
                        </Center>
                      </GridItem>
                    ))}
                  </Grid>
                </GridItem>
                <GridItem border="solid 1px #eee" p={4}>
                  <Box
                    fontWeight={700}
                    bgColor="#44b7fc"
                    userSelect={"none"}
                    mb={2}
                    p={1}
                  >
                    과정2
                  </Box>
                  <Grid
                    templateColumns={"1fr 1fr 1fr"}
                    gap={2}
                    overflowY={"auto"}
                    overflowX={"hidden"}
                    maxHeight={"140px"}
                  >
                    {classes2?.map((classTS: any, index: number) => (
                      <GridItem key={index}>
                        <Center
                          flexDirection={"column"}
                          width="100%"
                          minHeight="2.5rem"
                          m={class2?.classId == classTS.classId ? 0 : "1px"}
                          border={
                            class2?.classId == classTS.classId
                              ? "solid 2px #44b7fc"
                              : "solid 1px #b4f2fc"
                          }
                          borderRadius={8}
                          fontWeight={
                            class2?.classId == classTS.classId ? 900 : 400
                          }
                          onClick={() => {
                            // console.log(classTS)
                            setClass2(classTS)
                            setStudent2("")
                            setStudent2Log(null)
                            selectStudents2(classTS.classId)
                          }}
                          _hover={{ cursor: "pointer" }}
                        >
                          <Center>
                            <Box fontSize="0.8rem" userSelect={"none"}>
                              {classTS.classId?.split("@")[0]}
                            </Box>
                            <Box fontSize="0.6rem" userSelect={"none"}>
                              @{classTS.classId?.split("@")[1]}
                            </Box>
                          </Center>
                          <Box fontSize="0.8rem" userSelect={"none"}>
                            {classTS.subject}
                          </Box>
                        </Center>
                      </GridItem>
                    ))}
                  </Grid>
                </GridItem>

                <GridItem>
                  <Grid templateColumns={"1fr 3fr"} gap={2}>
                    <GridItem>
                      <Center color="#83f28f" userSelect={"none"}>
                        ▼
                      </Center>
                    </GridItem>
                    <GridItem>
                      <Box></Box>
                    </GridItem>
                  </Grid>
                </GridItem>
                <GridItem>
                  <Grid templateColumns={"1fr 3fr"} gap={2}>
                    <GridItem>
                      <Center color="#44b7fc" userSelect={"none"}>
                        ▼
                      </Center>
                    </GridItem>
                    <GridItem>
                      <Box></Box>
                    </GridItem>
                  </Grid>
                </GridItem>

                <GridItem maxWidth="500px">
                  <Grid templateColumns={"1fr 10px 3fr"}>
                    <GridItem border="solid 1px #eee" p={4}>
                      {class1 && (
                        <Center
                          flexDirection={"column"}
                          width="100%"
                          // height="4rem"
                          border="solid 1px #83f28f"
                          borderRadius={8}
                        >
                          <Box fontSize="0.8rem" userSelect={"none"}>
                            {class1?.classId?.split("@")[0]}
                          </Box>
                          <Box fontSize="0.6rem" userSelect={"none"}>
                            @{class1?.classId?.split("@")[1]}
                          </Box>
                          <Box fontSize="0.8rem" userSelect={"none"}>
                            {class1?.subject}
                          </Box>
                        </Center>
                      )}
                      {class1 === null && (
                        <Center
                          flexDirection={"column"}
                          width="100%"
                          border="solid 1px #83f28f"
                          borderRadius={8}
                          bgColor={"#39e75f"}
                        >
                          <Box
                            fontSize="0.8rem"
                            userSelect={"none"}
                            textAlign={"center"}
                          >
                            위에서 수업을 선택하세요
                          </Box>
                        </Center>
                      )}
                      <Grid templateColumns={"1fr"} gap={1} mt={2}>
                        {students1?.map((s: string, index: number) => (
                          <GridItem key={index}>
                            <Center
                              flexDirection={"column"}
                              width="100%"
                              m={s === student1 ? 0 : "1px"}
                              border={
                                s === student1
                                  ? "solid 2px #39e75f"
                                  : "solid 1px #cefad0"
                              }
                              borderRadius={8}
                              fontSize="0.9rem"
                              fontWeight={s === student1 ? 900 : 400}
                              onClick={() => {
                                setStudent1(s)
                                selectLogs1(class1?.classId, s)
                              }}
                              _hover={{ cursor: "pointer" }}
                              userSelect={"none"}
                            >
                              {s}
                            </Center>
                          </GridItem>
                        ))}
                      </Grid>
                    </GridItem>
                    <GridItem>
                      <Center
                        height="80px"
                        width="10px"
                        color="#39e75f"
                        userSelect={"none"}
                      >
                        ▶
                      </Center>
                    </GridItem>
                    <GridItem border="solid 1px #eee" p={1} minWidth="350px">
                      <StudentScore
                        isLog={isLog}
                        branchId={branchId}
                        teacher={teacher.current.name}
                        classId={class1?.classId}
                        subNumber={1}
                        subject={class1?.subject}
                        name={student1}
                        logData={student1Log}
                      ></StudentScore>
                    </GridItem>
                  </Grid>
                </GridItem>

                <GridItem maxWidth="500px">
                  <Grid templateColumns={"1fr 10px 3fr"}>
                    <GridItem border="solid 1px #eee" p={4}>
                      {class2 && (
                        <Center
                          flexDirection={"column"}
                          width="100%"
                          // height="4rem"
                          border="solid 1px #44b7fc"
                          borderRadius={8}
                        >
                          <Box fontSize="0.8rem" userSelect={"none"}>
                            {class2?.classId?.split("@")[0]}
                          </Box>
                          <Box fontSize="0.6rem" userSelect={"none"}>
                            @{class2?.classId?.split("@")[1]}
                          </Box>
                          <Box fontSize="0.8rem" userSelect={"none"}>
                            {class2?.subject}
                          </Box>
                        </Center>
                      )}
                      {class2 === null && (
                        <Center
                          flexDirection={"column"}
                          width="100%"
                          border="solid 1px #44b7fc"
                          borderRadius={8}
                          bgColor={"#44b7fc"}
                        >
                          <Box
                            fontSize="0.8rem"
                            userSelect={"none"}
                            textAlign={"center"}
                          >
                            위에서 수업을 선택하세요
                          </Box>
                        </Center>
                      )}
                      <Grid templateColumns={"1fr"} gap={1} mt={2}>
                        {students2?.map((s: string, index: number) => (
                          <GridItem key={index}>
                            <Center
                              flexDirection={"column"}
                              width="100%"
                              m={s === student2 ? 0 : "1px"}
                              border={
                                s === student2
                                  ? "solid 2px #44b7fc"
                                  : "solid 1px #b4f2fc"
                              }
                              borderRadius={8}
                              fontSize="0.9rem"
                              fontWeight={s === student2 ? 900 : 400}
                              onClick={() => {
                                setStudent2(s)
                                selectLogs2(class2?.classId, s)
                              }}
                              _hover={{ cursor: "pointer" }}
                              userSelect={"none"}
                            >
                              {s}
                            </Center>
                          </GridItem>
                        ))}
                      </Grid>
                    </GridItem>
                    <GridItem>
                      <Center
                        height="80px"
                        width="10px"
                        color="#44b7fc"
                        userSelect={"none"}
                      >
                        ▶
                      </Center>
                    </GridItem>
                    <GridItem border="solid 1px #eee" p={1} minWidth="350px">
                      <StudentScore
                        isLog={isLog}
                        branchId={branchId}
                        teacher={teacher.current.name}
                        classId={class2?.classId}
                        subNumber={2}
                        subject={class2?.subject}
                        name={student2}
                        logData={student2Log}
                      ></StudentScore>
                    </GridItem>
                  </Grid>
                </GridItem>
              </Grid>
            </Center>
          </>
        )}
      </Center>
    </>
  )
}
