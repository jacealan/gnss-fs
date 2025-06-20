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
  HStack,
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

export default function StudentScore({
  isLog,
  branchId,
  teacher,
  classId,
  subNumber,
  subject,
  name,
  logData,
}: {
  isLog: boolean
  branchId: string
  teacher: string
  classId: string
  subNumber: number
  subject: string
  name: string
  logData: any
}) {
  // const route = useRouter()
  // const [isLog, setIsLog] = useState<boolean>(false)
  // const [student, setStudent] = useState<any>(null)
  // const [logs, setLogs] = useState<any>(logData) //
  // const log = useRef<any>(null)

  const [branchTitle, setBranchTitle] = useState<string>("")
  // const [name, setName] = useState<string>("")
  const [classTitle, setClassTitle] = useState<string>("")
  // const [subject, setSubject] = useState<string>("")
  // const [teacher, setTeacher] = useState<string>("")
  const [startDate, setStartDate] = useState<any>(null)
  const [endDate, setEndDate] = useState<any>(null)
  const [isMoreCalendar, setIsMoreCalendar] = useState<boolean>(false)
  const [calendarStart, setCalendarStart] = useState<any>(null)
  const [calendarDates, setCalendarDates] = useState<any>(null)
  const [calendarDatesDefault, setCalendarDatesDefault] = useState<any>(null)
  const [calendarStartDefault, setCalendarStartDefault] = useState<any>(null)
  const today = useRef<any>(new Date())
  const [isMoreComments, setIsMoreComments] = useState<boolean>(false)
  const [comments, setComments] = useState<any>(null) //
  const [commentsDefault, setCommentsDefault] = useState<any>(null)
  const [chartData, setChartData] = useState<any>(null) //
  const [isChartDetail, setIsChartDetail] = useState<boolean>(false)
  const [finalScore, setFinalScore] = useState<any>(null)
  const [finalAvr, setFinalAvr] = useState<any>(null)

  const googleDate0 = new Date(1899, 11, 30)

  // console.log(
  //   isLog,
  //   branchId,
  //   teacher,
  //   classId,
  //   subNumber,
  //   subject,
  //   name,
  //   logData
  // )
  useEffect(() => {
    console.log(
      isLog,
      branchId,
      teacher,
      classId,
      subNumber,
      subject,
      name,
      logData
    )
    // if (studentData === null) route.push("/branch/" + branchId + "/student/")

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

    // console.log(isLog)
    if (isLog && name) {
      // setIsLog(true)
      // setStudent(JSON.parse(studentData).data)
      // setName(JSON.parse(studentData).data.name)
      setClassTitle(classId?.split("@")[0])
      // console.log(logData)

      // const logData = window.localStorage.getItem("log")
      if (logData) {
        // const logFull = JSON.parse(logData).data
        const logPick = logData
        const logChart = []
        const logComment = []
        // console.log(logFull)

        // logFull.sort((a: any, b: any) => a[1] - a[2])
        for (let log of logData) {
          // if (log[0] === branchId && log[2] == classId) {
          if (log.comment) {
            logComment.push({
              classDate: log.classDate,
              comment: log.comment,
            })
          }
          if (log.testScore && log.testNo !== "999") {
            logChart.push({
              idx: logChart.length + 1,
              testDate: log.classDate,
              name: log.testTitle,
              score: Number(log.testScore),
              avr: Number(log.testAvr).toFixed(1),
            })
          }
          if (log.testScore && log.testNo === "999") {
            setFinalScore(Number(log.testScore))
            setFinalAvr(Number(log.testAvr).toFixed(1))
          }
          // }
        }
        // setLogs(logPick)
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
        console.log(logComment)

        if (logPick.length > 0) {
          // setSubject(logPick[0].subject)
          // setTeacher(logPick[0].teacher)
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
    } else {
      setComments(null)
      setChartData(null)
      setFinalScore(null)
    }
  }, [isLog, name])

  return (
    <>
      <Center width="350px" fontSize="0.9rem">
        <Center flexDirection={"column"} width="100%" maxWidth="460px">
          <Center
            width="100%"
            height="80px"
            bgColor="#2957E2"
            color="#fff"
            p="40px 0 20px 0"
            mb={-5}
          >
            <Flex
              width="80%"
              justifyContent={"space-between"}
              alignItems="center"
              bgColor="#2957E2"
              color="#fff"
              mb={5}
            >
              <Box
                fontSize="1.5rem"
                letterSpacing={"-0.06rem"}
                fontWeight={700}
                userSelect={"none"}
              >
                {name} 학생
              </Box>
              <Box textAlign={"right"}>
                <Button
                  size="2xs"
                  p={"2px 10px 2px 10px"}
                  variant={"outline"}
                  fontSize="0.5rem"
                  fontWeight={400}
                  color="#fff"
                  borderRadius={10}
                  // onClick={() => {
                  //   route.push("/branch/" + branchId + "/student/class")
                  // }}
                >
                  -
                </Button>
                <Box fontSize="0.7rem" textAlign="right" userSelect={"none"}>
                  {format(startDate, "yy/MM/dd")}~{format(endDate, "yy/MM/dd")}
                </Box>
              </Box>
            </Flex>
          </Center>

          <Box
            width={"90%"}
            bgColor="#fff"
            borderRadius={8}
            p={"20px 16px"}
            fontSize="0.9rem"
            border="solid 1px #ddd"
          >
            <HStack>
              <Box
                bgColor="#D9D9D9"
                borderRadius={16}
                p="1px 12px"
                fontWeight={500}
              >
                반명
              </Box>
              <Box fontSize={"0.9rem"} userSelect={"none"}>
                {classTitle}
              </Box>
            </HStack>
            <Flex
              mt={2}
              width="100%"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <HStack>
                <Box
                  bgColor="#D9D9D9"
                  borderRadius={16}
                  p="1px 12px"
                  fontWeight={500}
                >
                  과정
                </Box>
                <Box fontSize={"0.9rem"} userSelect={"none"}>
                  {subject}
                </Box>
              </HStack>
              <HStack>
                <Box
                  bgColor="#D9D9D9"
                  borderRadius={16}
                  p="1px 12px"
                  fontWeight={500}
                >
                  담임
                </Box>
                <Box fontSize={"0.9rem"} userSelect={"none"}>
                  {teacher}
                </Box>
              </HStack>
            </Flex>
          </Box>

          <Grid
            templateColumns={"1fr 5fr 1fr"}
            width="90%"
            p={1}
            mt={6}
            mb={1}
            bgColor="#2957E2"
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
                출결&nbsp;·&nbsp;과제
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
                bgColor="#D9D9D9"
                borderRadius={2}
                fontSize="0.8rem"
                userSelect={"none"}
              >
                {theDay}
              </GridItem>
            ))}
            {logData &&
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
                      mb={1}
                    ></Box>
                  </Center>
                  {logData?.map((log: any) =>
                    isSameDay(theDate, log.classDate) ? (
                      <>
                        <Box
                          fontSize="0.7rem"
                          fontWeight={600}
                          bgColor={
                            log.attendance === "출석"
                              ? "#93BD51"
                              : log.attendance === "결석"
                              ? log.supplementDate
                                ? "#FFA42D"
                                : "#F55F5F"
                              : "gray"
                          }
                          color="white"
                          borderRadius={10}
                          p={"0px 3px 0px 3px"}
                          mb={"1px"}
                          userSelect={"none"}
                        >
                          {log.attendance === "결석" &&
                          log.supplementDate !== null
                            ? format(log.supplementDate, "M/d")
                            : log.attendance}
                        </Box>
                        <Box
                          fontSize={
                            log.homework === "미제출" ? "0.6rem" : "0.7rem"
                          }
                          color={
                            log.homework === "완료"
                              ? "#93BD51"
                              : log.homework === "부족"
                              ? "#FFA42D"
                              : log.homework === "미제출"
                              ? "#F55F5F"
                              : "gray"
                          }
                          border={
                            log.homework === "완료"
                              ? "solid 1px #93BD51"
                              : log.homework === "부족"
                              ? "solid 1px #FFA42D"
                              : log.homework === "미제출"
                              ? "solid 1px #F55F5F"
                              : "solid 1px gray"
                          }
                          borderRadius={10}
                          p={"0px 3px 0px 3px"}
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
            {logData &&
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
                  <Box userSelect={"none"}>
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
                      mb={1}
                    ></Box>
                  </Center>
                  {logData?.map((log: any) =>
                    isSameDay(theDate, log.classDate) ? (
                      <>
                        <Box
                          fontSize="0.7rem"
                          fontWeight={600}
                          bgColor={
                            log.attendance === "출석"
                              ? "#93BD51"
                              : log.attendance === "결석"
                              ? log.supplementDate
                                ? "#FFA42D"
                                : "#F55F5F"
                              : "gray"
                          }
                          color="white"
                          borderRadius={10}
                          p={"0px 3px 0px 3px"}
                          mb={"1px"}
                          userSelect={"none"}
                        >
                          {log.attendance === "결석" &&
                          log.supplementDate !== null
                            ? format(log.supplementDate, "M/d")
                            : log.attendance}
                        </Box>
                        <Box
                          fontSize={
                            log.homework === "미제출" ? "0.6rem" : "0.7rem"
                          }
                          color={
                            log.homework === "완료"
                              ? "#93BD51"
                              : log.homework === "부족"
                              ? "#FFA42D"
                              : log.homework === "미제출"
                              ? "#F55F5F"
                              : "gray"
                          }
                          border={
                            log.homework === "완료"
                              ? "solid 1px #93BD51"
                              : log.homework === "부족"
                              ? "solid 1px #FFA42D"
                              : log.homework === "미제출"
                              ? "solid 1px #F55F5F"
                              : "solid 1px gray"
                          }
                          borderRadius={10}
                          p={"0px 3px 0px 3px"}
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
            bgColor="#2957E2"
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
            <Box userSelect={"none"}>-</Box>
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
                      p="0 4px"
                      textAlign={"center"}
                      fontSize="0.7rem"
                      mt={1}
                      border="solid 1px #2957E2"
                      borderRadius={2}
                      color="#2957E2"
                      userSelect={"none"}
                    >
                      {format(comment.classDate, "MM/dd")}
                    </Box>
                  </GridItem>
                  <GridItem>
                    <Box
                      fontSize="0.9rem"
                      letterSpacing={"-0.04rem"}
                      pl={2}
                      pr={2}
                      userSelect={"none"}
                    >
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
                      p="0 4px"
                      textAlign={"center"}
                      fontSize="0.7rem"
                      mt={1}
                      border="solid 1px #2957E2"
                      borderRadius={2}
                      color="#2957E2"
                      userSelect={"none"}
                    >
                      {format(comment.classDate, "MM/dd")}
                    </Box>
                  </GridItem>
                  <GridItem>
                    <Box
                      fontSize="0.9rem"
                      letterSpacing={"-0.04rem"}
                      pl={2}
                      pr={2}
                      userSelect={"none"}
                    >
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
            bgColor="#2957E2"
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
                평가 점수 변동 추이
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
              >
                <GridItem>
                  <Flex alignItems={"center"} mt="2px">
                    <Box fontSize="0.7rem" userSelect={"none"}>
                      &nbsp;{chart.idx}
                    </Box>
                    <Box fontSize="0.65rem" userSelect={"none"}>
                      ({format(chart?.testDate, "MM/dd")})
                    </Box>
                  </Flex>
                </GridItem>
                <GridItem mt="1px">
                  <Flex alignItems={"center"}>
                    <Box
                      fontSize="0.8rem"
                      letterSpacing={"-0.04rem"}
                      userSelect={"none"}
                    >
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
                borderRadius={20}
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
                      <span style={{ fontSize: "0.85rem" }}>{finalAvr}</span>
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
