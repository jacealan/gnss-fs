import { useEffect, useState, useRef, PureComponent } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { GetServerSidePropsContext } from "next" // SSR
import {
  format,
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
  Button,
} from "@chakra-ui/react"

import {
  ComposedChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryData = await context.query
  const branchData = await getBranch(queryData.branchId || "")

  return {
    props: {
      branchId: queryData.branchId,
      classId: queryData.classId,
      subNumber: queryData.subNumber,
    },
  }
}

export default function LogBoard({
  branchId,
  classId,
  subNumber,
}: {
  branchId: string
  classId: string
  subNumber: string
}) {
  const route = useRouter()
  const [isLog, setIsLog] = useState<boolean>(false)
  const [student, setStudent] = useState<any>(null)
  const [logs, setLogs] = useState<any>(null)
  const log = useRef<any>(null)

  const [branchTitle, setBranchTitle] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [classTitle, setClassTitle] = useState<string>("")
  const [subject, setSubject] = useState<string>("")
  const [teacher, setTeacher] = useState<string>("")
  const [startDate, setStartDate] = useState<any>(null)
  const [endDate, setEndDate] = useState<any>(null)
  const [isMoreCalendar, setIsMoreCalendar] = useState<boolean>(false)
  const [calendarStart, setCalendarStart] = useState<any>(null)
  const [calendarDates, setCalendarDates] = useState<any>(null)
  const [calendarDatesDefault, setCalendarDatesDefault] = useState<any>(null)
  const [calendarStartDefault, setCalendarStartDefault] = useState<any>(null)
  const today = useRef<any>(new Date())
  const [isMoreComments, setIsMoreComments] = useState<boolean>(false)
  const [comments, setComments] = useState<any>(null)
  const [commentsDefault, setCommentsDefault] = useState<any>(null)
  const [chartData, setChartData] = useState<any>(null)
  const [isChartDetail, setIsChartDetail] = useState<boolean>(false)
  const [finalScore, setFinalScore] = useState<any>(null)
  const [finalAvr, setFinalAvr] = useState<any>(null)

  const googleDate0 = new Date(1899, 11, 30)

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
      // console.log(log)
      window.localStorage.setItem("log", JSON.stringify(log.current.data))
    }
  }

  useEffect(() => {
    const studentData = window.localStorage.getItem("studentData")
    // console.log(studentData)
    // console.log(branchId)
    if (studentData === null)
      route.push("/branch/" + branchId + "/student/class")

    switch (branchId) {
      case "PlDs":
        setBranchTitle("개념폴리아 다산관")
        break
      case "PlDt":
        setBranchTitle("개념폴리아 동탄관")
        break
      case "PlBb":
        setBranchTitle("개념폴리아 방배관")
        break
      case "PlCd":
        setBranchTitle("개념폴리아 삼성청담관")
        break
      // case "PlSj":
      //   spreadsheetId = "1V7R78rk1cS4nAnaFXNbr8sn1PR-TrTJELh4_wwPlEhc"
      //   break
      case "PlSc":
        setBranchTitle("개념폴리아 서초관")
        break
      // case "SsSc":
      //   spreadsheetId = "11pWutAZn0gSkyCPKJHXvTHa08xxtmalyN3VOqx15gU8"
      //   break
      case "PlJs":
        setBranchTitle("개념폴리아 잠실관")
        break
      case "SsJs":
        setBranchTitle("개념상상 잠실관")
    }

    if (studentData) {
      setIsLog(true)
      setStudent(JSON.parse(studentData).data)
      setName(JSON.parse(studentData).data.name)
      setClassTitle(classId.split("@")[0])

      const logData = window.localStorage.getItem("log")
      console.log(logData)
      if (logData) {
        const logFull = JSON.parse(logData).data
        const logPick = []
        const logChart = []
        const logComment = []
        console.log(logFull)

        // logFull.sort((a: any, b: any) => a[1] - a[2])
        for (let log of logFull) {
          if (log[2] == classId) {
            if (subNumber === "1" && log[11] !== "") {
              // classId, kindby, startDate, endDate, teacher, subject, date, attendance, supplementDate, homework, testTitle, testScore, testAvr, comment
              logPick.push({
                classId: log[2],
                kind: log[6],
                startDate: log[7],
                endDate: log[8],
                teacher: log[9],
                subject: log[10],
                classDate: parse(log[1], "yyyy/MM/dd", new Date()),
                attendance: log[11],
                supplementDate: log[12]
                  ? addDays(googleDate0, Number(log[12]))
                  : null,
                homework: log[14],
                testNo: log[15],
                testTile: log[16],
                testScore: log[17],
                testAvr: log[18],
                comment: log[19],
              })
              if (log[19]) {
                logComment.push({
                  classDate: parse(log[1], "yyyy/MM/dd", new Date()),
                  comment: log[19],
                })
              }
              if (log[17] && log[15] !== "999") {
                logChart.push({
                  idx: logChart.length + 1,
                  testDate: parse(log[1], "yyyy/MM/dd", new Date()),
                  name: log[16],
                  score: Number(log[17]),
                  avr: Number(log[18]).toFixed(1),
                })
              }
              if (log[17] && log[15] === "999") {
                setFinalScore(Number(log[17]))
                setFinalAvr(Number(log[18]).toFixed(2))
              }
            }
            if (subNumber === "2" && log[22] !== "") {
              // classId, kindby, startDate, endDate, teacher, subject,date, attendance, supplementDate, homework, testTitle, testScore, testAvr, comment
              logPick.push({
                classId: log[2],
                kind: log[6],
                startDate: log[7],
                endDate: log[8],
                teacher: log[20],
                subject: log[21],
                classDate: parse(log[1], "yyyy/MM/dd", new Date()),
                attendance: log[22],
                supplementDate: log[23]
                  ? addDays(googleDate0, Number(log[23]))
                  : null,
                homework: log[25],
                testNo: log[26],
                testTile: log[27],
                testScore: log[28],
                testAvr: log[29],
                comment: log[30],
              })
              if (log[30]) {
                logComment.push({
                  classDate: parse(log[1], "yyyy/MM/dd", new Date()),
                  comment: log[30],
                })
              }
              if (log[28] && log[26] !== "999") {
                logChart.push({
                  idx: logChart.length + 1,
                  testDate: parse(log[1], "yyyy/MM/dd", new Date()),
                  name: log[27],
                  score: Number(log[28]),
                  avr: Number(log[29]).toFixed(1),
                })
              }
              if (log[28] && log[26] === "999") {
                setFinalScore(Number(log[28]))
                setFinalAvr(Number(log[29]).toFixed(2))
              }
            }
          }
        }
        setLogs(logPick)
        setComments(logComment)
        if (logComment.length > 2) {
          setCommentsDefault([
            logComment[logComment.length - 2],
            logComment[logComment.length - 1],
          ])
        } else {
          setCommentsDefault(logComment)
        }
        setChartData(logChart)
        // console.log(logComment)

        if (logPick.length > 0) {
          setSubject(logPick[0].subject)
          setTeacher(logPick[0].teacher)
          // addDays(new Date(1899, 11, 30), Number(startDate)),
          const classStart = addDays(googleDate0, Number(logPick[0].startDate))
          const classEnd = addDays(googleDate0, Number(logPick[0].endDate))
          setStartDate(classStart)
          setEndDate(classEnd)

          let theDate = subDays(classStart, getDay(classStart))
          setCalendarStart(theDate)
          const calendar = []
          while (theDate <= new Date() && theDate <= classEnd) {
            for (let i = 0; i < 7; i++) {
              calendar.push(theDate)
              theDate = addDays(theDate, 1)
            }
          }
          // console.log(calendar)
          // console.log(today.current)
          setCalendarDates(calendar)
          if (calendar.length > 14) {
            const _c = []
            for (let i = calendar.length - 14; i < calendar.length; i++) {
              _c.push(calendar[i])
            }
            setCalendarDatesDefault(_c)
          } else {
            setCalendarDatesDefault(calendar)
          }
        }
        // console.log(logPick)
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>
          {`${subject} - ${classTitle} - ${name} [개념폴리아/개념상상 학습보고서]`}
        </title>
      </Head>
      <Center width="100vw" minWidth="350px" fontSize="0.98rem">
        <Center flexDirection={"column"} width="100%" maxWidth="460px">
          <Box
            width="100%"
            bgColor="#0D073B"
            color="#FDFFAD"
            fontWeight="900"
            p="40px 0 20px 0"
            mb={6}
          >
            <Box
              width="100%"
              textAlign="center"
              fontSize="1.5rem"
              userSelect={"none"}
            >
              {branchTitle}
            </Box>
            <Box
              width="100%"
              textAlign="center"
              fontSize="1.2rem"
              userSelect={"none"}
            >
              - 학습보고서 -
            </Box>
          </Box>

          <Grid
            width="90%"
            templateColumns={"1fr 3fr 1fr 3fr"}
            templateRows={"1fr 1fr 1fr"}
            alignItems={"center"}
            justifyItems={"center"}
            borderRadius={14}
          >
            <GridItem
              width="100%"
              height="100%"
              bgColor="#ddd"
              borderTop="solid 1px #ccc"
              p={1}
            >
              <Center height="100%">
                <Box userSelect={"none"}>이름</Box>
              </Center>
            </GridItem>
            <GridItem width="100%" height="100%">
              <Center height="100%" borderTop="solid 1px #ccc">
                <Box userSelect={"none"}>{name}</Box>
              </Center>
            </GridItem>
            <GridItem
              width="100%"
              height="100%"
              bgColor="#ddd"
              borderTop="solid 1px #ccc"
            >
              <Center height="100%">
                <Box userSelect={"none"}>반명</Box>
              </Center>
            </GridItem>
            <GridItem width="100%" height="100%" borderTop="solid 1px #ccc">
              <Center height="100%">
                <Box fontSize={"0.9rem"} userSelect={"none"}>
                  {classTitle}
                </Box>
              </Center>
            </GridItem>
            <GridItem
              width="100%"
              height="100%"
              bgColor="#ddd"
              borderTop="solid 1px #ccc"
            >
              <Center height="100%" p={1}>
                <Box userSelect={"none"}>과정</Box>
              </Center>
            </GridItem>
            <GridItem width="100%" height="100%" borderTop="solid 1px #ccc">
              <Center height="100%">
                <Box fontSize={"0.8rem"} userSelect={"none"}>
                  {subject}
                </Box>
              </Center>
            </GridItem>
            <GridItem
              width="100%"
              height="100%"
              bgColor="#ddd"
              borderTop="solid 1px #ccc"
            >
              <Center height="100%">
                <Box userSelect={"none"}>담임</Box>
              </Center>
            </GridItem>
            <GridItem width="100%" height="100%" borderTop="solid 1px #ccc">
              <Center height="100%">
                <Box userSelect={"none"}>{teacher}</Box>
              </Center>
            </GridItem>
            <GridItem
              width="100%"
              height="100%"
              bgColor="#ddd"
              borderTop="solid 1px #ccc"
              borderBottom="solid 1px #ccc"
            >
              <Center height="100%" p={1}>
                <Box userSelect={"none"}>기간</Box>
              </Center>
            </GridItem>
            <GridItem
              width="100%"
              height="100%"
              borderTop="solid 1px #ccc"
              borderBottom="solid 1px #ccc"
            >
              <Center height="100%">
                <Box textAlign="right" userSelect={"none"}>
                  {format(startDate, "yyyy/MM/dd")}
                </Box>
              </Center>
            </GridItem>
            <GridItem
              width="100%"
              height="100%"
              borderTop="solid 1px #ccc"
              borderBottom="solid 1px #ccc"
            >
              <Center height="100%">
                <Box userSelect={"none"}>~</Box>
              </Center>
            </GridItem>
            <GridItem
              width="100%"
              height="100%"
              borderTop="solid 1px #ccc"
              borderBottom="solid 1px #ccc"
            >
              <Center height="100%">
                <Box textAlign="left" userSelect={"none"}>
                  {format(endDate, "yyyy/MM/dd")}
                </Box>
              </Center>
            </GridItem>
          </Grid>
          <Center mt={1}>
            {/* <Button
              size="xs"
              variant={"outline"}
              fontWeight={400}
              borderRadius={10}
            >
              업데이트
            </Button> */}
            <Button
              size="xs"
              variant={"outline"}
              fontWeight={400}
              // ml={2}
              borderRadius={10}
              onClick={() => {
                route.push("/branch/" + branchId + "/student/class")
              }}
            >
              수강목록
            </Button>
          </Center>

          <Grid
            templateColumns={"1fr 5fr 1fr"}
            width="90%"
            p={1}
            mt={6}
            mb={1}
            bgColor="#3c5a91"
            alignItems={"center"}
          >
            <GridItem width="100%"></GridItem>
            <GridItem width="100%">
              <Center
                width="100%"
                textAlign="center"
                color="white"
                fontWeight={700}
              >
                <Box
                  // fontSize="0.8rem"
                  color="white"
                  border="solid 1px white"
                  borderRadius={4}
                  p={"1px 3px 1px 3px"}
                  userSelect={"none"}
                >
                  출결
                </Box>
                <Box userSelect={"none"}>&nbsp;·&nbsp;</Box>
                <Box
                  // fontSize="0.8rem"
                  bgColor="white"
                  color="#3c5a91"
                  border="solid 1px #3c5a91"
                  borderRadius={4}
                  p={"1px 3px 1px 3px"}
                  userSelect={"none"}
                >
                  과제
                </Box>
              </Center>
            </GridItem>
            <GridItem width="100%" textAlign="right">
              {calendarDates?.length > 14 && (
                <Box
                  border="solid 1px #ccc"
                  borderRadius={20}
                  fontSize="0.7rem"
                  color="white"
                  textAlign={"center"}
                  p={0}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => setIsMoreCalendar(!isMoreCalendar)}
                  userSelect={"none"}
                >
                  {isMoreCalendar ? "최근" : "모두"}
                </Box>
              )}
            </GridItem>
          </Grid>
          <Grid templateColumns="repeat(7, 1fr)" gap="1" width="90%">
            {["일", "월", "화", "수", "목", "금", "토"].map((theDay) => (
              <GridItem
                key={theDay}
                textAlign={"center"}
                bgColor="#eee"
                borderRadius={4}
                fontSize="0.9rem"
                userSelect={"none"}
              >
                {theDay}
              </GridItem>
            ))}

            {logs &&
              isMoreCalendar &&
              calendarDates?.map((theDate: any, index: number) => (
                <GridItem
                  key={index}
                  textAlign={"center"}
                  color={
                    theDate < startDate || theDate > endDate ? "#ddd" : "#000"
                  }
                  fontWeight={isSameDay(theDate, today.current) ? 700 : 400}
                >
                  <Box fontSize="0.9rem" userSelect={"none"}>
                    {format(
                      theDate,
                      // theDate === calendarStart
                      getDay(theDate) === 0
                        ? "M/d"
                        : getDate(theDate) === 1
                        ? "M/d"
                        : "d"
                    )}
                  </Box>
                  <Center>
                    <Box
                      borderBottom="solid 1px #ccc"
                      width="70%"
                      height="1px"
                    ></Box>
                  </Center>
                  {logs.map((log: any) =>
                    isSameDay(theDate, log.classDate) ? (
                      <>
                        <Box
                          fontSize="0.8rem"
                          bgColor={
                            log.attendance === "출석"
                              ? "green"
                              : log.attendance === "결석"
                              ? log.supplementDate
                                ? "blue"
                                : "red"
                              : "gray"
                          }
                          color="white"
                          borderRadius={4}
                          p={"1px 3px 1px 3px"}
                          mb={"1px"}
                          userSelect={"none"}
                        >
                          {log.attendance === "결석" &&
                          log.supplementDate !== null
                            ? format(log.supplementDate, "M/d")
                            : log.attendance}
                        </Box>
                        <Box
                          fontSize="0.8rem"
                          color={
                            log.homework === "완료"
                              ? "green"
                              : log.homework === "부족"
                              ? "orange"
                              : log.homework === "미제출"
                              ? "red"
                              : "gray"
                          }
                          border={
                            log.homework === "완료"
                              ? "solid 1px green"
                              : log.homework === "부족"
                              ? "solid 1px orange"
                              : log.homework === "미제출"
                              ? "solid 1px red"
                              : "solid 1px gray"
                          }
                          borderRadius={4}
                          p={"1px 3px 1px 3px"}
                          userSelect={"none"}
                        >
                          {log.homework ? log.homework : "-"}
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box></Box>
                      </>
                    )
                  )}
                </GridItem>
              ))}
            {logs &&
              isMoreCalendar === false &&
              calendarDatesDefault?.map((theDate: any, index: number) => (
                <GridItem
                  key={index}
                  textAlign={"center"}
                  color={
                    theDate < startDate || theDate > endDate ? "#ddd" : "#000"
                  }
                  fontWeight={isSameDay(theDate, today.current) ? 700 : 400}
                >
                  <Box fontSize="0.9rem" userSelect={"none"}>
                    {format(
                      theDate,
                      // theDate === calendarStart
                      getDay(theDate) === 0
                        ? "M/d"
                        : getDate(theDate) === 1
                        ? "M/d"
                        : "d"
                    )}
                  </Box>
                  <Center>
                    <Box
                      borderBottom="solid 1px #ccc"
                      width="70%"
                      height="1px"
                    ></Box>
                  </Center>
                  {logs.map((log: any) =>
                    isSameDay(theDate, log.classDate) ? (
                      <>
                        <Box
                          fontSize="0.8rem"
                          bgColor={
                            log.attendance === "출석"
                              ? "green"
                              : log.attendance === "결석"
                              ? log.supplementDate
                                ? "blue"
                                : "red"
                              : "gray"
                          }
                          color="white"
                          borderRadius={4}
                          p={"1px 3px 1px 3px"}
                          mb={"1px"}
                          userSelect={"none"}
                        >
                          {log.attendance === "결석" &&
                          log.supplementDate !== null
                            ? format(log.supplementDate, "M/d")
                            : log.attendance}
                        </Box>
                        <Box
                          fontSize="0.8rem"
                          color={
                            log.homework === "완료"
                              ? "green"
                              : log.homework === "부족"
                              ? "orange"
                              : log.homework === "미제출"
                              ? "red"
                              : "gray"
                          }
                          border={
                            log.homework === "완료"
                              ? "solid 1px green"
                              : log.homework === "부족"
                              ? "solid 1px orange"
                              : log.homework === "미제출"
                              ? "solid 1px red"
                              : "solid 1px gray"
                          }
                          borderRadius={4}
                          p={"1px 3px 1px 3px"}
                          userSelect={"none"}
                        >
                          {log.homework ? log.homework : "-"}
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box></Box>
                      </>
                    )
                  )}
                </GridItem>
              ))}
          </Grid>
          <Grid
            templateColumns={"1fr 5fr 1fr"}
            width="90%"
            p={1}
            mt={6}
            mb={1}
            bgColor="#3c5a91"
            alignItems={"center"}
          >
            <GridItem width="100%"></GridItem>
            <GridItem width="100%">
              <Box
                width="100%"
                textAlign="center"
                color="white"
                fontWeight={700}
                userSelect={"none"}
              >
                학습 코멘트
              </Box>
            </GridItem>
            <GridItem width="100%" textAlign="right">
              {comments?.length > 2 && (
                <Box
                  border="solid 1px #ccc"
                  borderRadius={20}
                  fontSize="0.7rem"
                  color="white"
                  textAlign={"center"}
                  p={0}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => setIsMoreComments(!isMoreComments)}
                  userSelect={"none"}
                >
                  {isMoreComments ? "최근" : "모두"}
                </Box>
              )}
            </GridItem>
          </Grid>
          {((comments && comments.length === 0) || comments === null) && (
            <Box userSelect={"none"}>아직 학습 코멘트가 없습니다</Box>
          )}
          {comments && comments.length > 0 && isMoreComments === true && (
            <>
              {comments.map((comment: any, index: number) => (
                <Grid
                  key={index}
                  templateColumns={"1fr 9fr"}
                  width="90%"
                  pb={2}
                >
                  <GridItem>
                    <Box
                      textAlign={"center"}
                      fontSize="0.7rem"
                      mt={1}
                      border="solid 1px #3c5a91"
                      borderRadius={2}
                      color="#3c5a91"
                      userSelect={"none"}
                    >
                      {format(comment.classDate, "MM/dd")}
                    </Box>
                  </GridItem>
                  <GridItem>
                    <Box pl={2} pr={2} userSelect={"none"}>
                      {comment.comment}
                    </Box>
                  </GridItem>
                </Grid>
              ))}
            </>
          )}
          {comments && comments.length > 0 && isMoreComments === false && (
            <>
              {commentsDefault.map((comment: any, index: number) => (
                <Grid
                  key={index}
                  templateColumns={"1fr 9fr"}
                  width="90%"
                  pb={2}
                >
                  <GridItem>
                    <Box
                      textAlign={"center"}
                      fontSize="0.7rem"
                      mt={1}
                      border="solid 1px #3c5a91"
                      borderRadius={2}
                      color="#3c5a91"
                      userSelect={"none"}
                    >
                      {format(comment.classDate, "MM/dd")}
                    </Box>
                  </GridItem>
                  <GridItem>
                    <Box pl={2} pr={2} userSelect={"none"}>
                      {comment.comment}
                    </Box>
                  </GridItem>
                </Grid>
              ))}
            </>
          )}

          <Grid
            templateColumns={"1fr 5fr 1fr"}
            width="90%"
            p={1}
            mt={6}
            mb={1}
            bgColor="#3c5a91"
            alignItems={"center"}
          >
            <GridItem width="100%"></GridItem>
            <GridItem width="100%">
              <Box
                width="100%"
                textAlign="center"
                color="white"
                fontWeight={700}
                userSelect={"none"}
              >
                주간평가 점수 변동 추이
              </Box>
            </GridItem>
            <GridItem width="100%" textAlign="right">
              {calendarDates?.length > 14 && (
                <Box
                  border="solid 1px #ccc"
                  borderRadius={20}
                  fontSize="0.7rem"
                  color="white"
                  textAlign={"center"}
                  p={0}
                  _hover={{ cursor: "pointer" }}
                  onClick={() => setIsChartDetail(!isChartDetail)}
                  userSelect={"none"}
                >
                  {isChartDetail ? "차트만" : "자세히"}
                </Box>
              )}
            </GridItem>
          </Grid>
          {chartData && chartData.length > 0 && (
            <Box width="90%">
              <ResponsiveContainer minWidth={"100%"} minHeight={300}>
                <ComposedChart
                  data={chartData}
                  margin={{ top: 30, right: -10, left: -10, bottom: 0 }}
                >
                  {/* <Line type="monotone" dataKey="uv" stroke="#8884d8" /> */}
                  <CartesianGrid
                    stroke="#eee"
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="idx"
                    // angle={300}
                    style={{
                      fontSize:
                        chartData?.length > 15
                          ? "0.6rem"
                          : chartData?.length > 9
                          ? "0.7rem"
                          : "0.8rem",
                    }}
                    // height={150}
                    // tick={<CustomizedXAxisTick />}
                  />
                  <YAxis
                    width={50}
                    yAxisId={1}
                    domain={[0, 100]}
                    tick={{ fontSize: "0.7rem" }}
                  />
                  <YAxis
                    width={50}
                    yAxisId={2}
                    orientation="right"
                    domain={[0, 100]}
                    tick={{ fontSize: "0.7rem" }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId={1}
                    barSize="5%"
                    fill="#ddd"
                    type="monotone"
                    name="평균"
                    dataKey="avr"
                    stroke="#ccc"
                    label={{
                      position: "insideBottom",
                      fill: "#777",
                      fontSize:
                        chartData?.length > 15
                          ? "0.5rem"
                          : chartData?.length > 9
                          ? "0.6rem"
                          : "0.7rem",
                      // offset: -200,
                    }}
                  />
                  <Line
                    yAxisId={2}
                    type="monotone"
                    name="점수"
                    dataKey="score"
                    stroke="#46bdc6"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    label={{
                      position: "top",
                      fill: "#46bdc6",
                      fontSize:
                        chartData?.length > 15
                          ? "0.6rem"
                          : chartData?.length > 9
                          ? "0.7rem"
                          : "0.8rem",
                      fontWeight: 700,
                    }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </Box>
          )}
          {chartData &&
            chartData.length > 0 &&
            isChartDetail &&
            chartData?.map((chart: any, index: number) => (
              <Grid
                key={index}
                templateColumns={"5fr 15fr 6fr"}
                width="80%"
                bgColor={index % 2 ? "" : "#f5f5f5"}
                // alignItems={"center"}
              >
                <GridItem>
                  <Flex alignItems={"center"} mt="3px">
                    <Box fontSize="0.8rem" userSelect={"none"}>
                      &nbsp;{chart.idx}
                    </Box>
                    <Box fontSize="0.65rem" userSelect={"none"}>
                      ({format(chart.testDate, "MM/dd")})
                    </Box>
                  </Flex>
                </GridItem>
                <GridItem>
                  <Flex alignItems={"center"} mt="2px">
                    <Box fontSize="0.9rem" userSelect={"none"}>
                      {chart.name}
                    </Box>
                  </Flex>
                </GridItem>
                <GridItem>
                  <Flex alignItems={"center"}>
                    <Box color="#46bdc6" userSelect={"none"}>
                      {chart.score}{" "}
                    </Box>
                    <Box color="#888" fontSize="0.7rem" userSelect={"none"}>
                      &nbsp;({chart.avr})
                    </Box>
                  </Flex>
                </GridItem>
              </Grid>
            ))}
          {(chartData === null || chartData.length === 0) && (
            <Box userSelect={"none"}>아직 평가 기록이 없습니다</Box>
          )}

          {finalScore && (
            <>
              <Box
                width="90%"
                p={1}
                mt={6}
                mb={1}
                textAlign="center"
                bgColor="#e54761"
                color="white"
                fontWeight={700}
                userSelect={"none"}
              >
                정기 평가 성적
              </Box>
              <Box width="90%">
                <Grid
                  templateColumns={"4fr 1fr 1fr"}
                  width="100%"
                  alignItems={"center"}
                  borderBottom="solid 1px #ccc"
                >
                  <GridItem>
                    <Box textAlign={"center"} userSelect={"none"}>
                      {subject}
                    </Box>
                  </GridItem>
                  <GridItem>
                    <Box textAlign={"center"} userSelect={"none"}>
                      {finalScore}
                    </Box>
                  </GridItem>
                  <GridItem>
                    <Box
                      textAlign={"center"}
                      color="#aaa"
                      fontSize="0.8rem"
                      userSelect={"none"}
                    >
                      평균
                      <br />
                      <span style={{ fontSize: "0.9rem" }}>{finalAvr}</span>
                    </Box>
                  </GridItem>
                </Grid>
              </Box>
            </>
          )}

          <Divider mt={6} />
          <Flex
            width="90%"
            mt={2}
            justifyContent={"space-between"}
            mb={6}
            userSelect={"none"}
          >
            <Image src="/assets/logos/gnpolya_t.png" height="20px" />
            <Image src="/assets/logos/gnss_t.png" height="20px" />
          </Flex>
        </Center>
      </Center>
    </>
  )
}
