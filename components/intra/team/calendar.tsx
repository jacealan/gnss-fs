import { useState, useEffect, useRef } from "react"
import Calendar from "react-calendar"
import moment from "moment"

import colors from "@/theme/colors"
import { Box, Flex, Button, Divider, Link, Badge } from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"
import { BiCalendarEdit } from "react-icons/bi"

const weekKr = "일월화수목금토"

export default function CalendarBox({ teamId }: { teamId: string | string[] }) {
  const calendarRef = useRef<any>(null)
  const [value, onChange] = useState<any>(new Date())
  const [today, setToday] = useState<any>(new Date())
  const [holidays, setHolidays] = useState<any>([])
  const [mocktests, setMocktests] = useState<any>([])
  const [univtests, setUnivtests] = useState<any>([])
  const [events, setEvents] = useState<any>([])
  const [nowTime, setNowTime] = useState<any>(new Date())

  const getEvents = async () => {
    const resHoliday = await fetch("/api/event/holiday")
    const resHolidayData = await resHoliday.json()
    setHolidays(resHolidayData.data)

    const resMocktest = await fetch("/api/event/mocktest")
    const resMocktestData = await resMocktest.json()
    setMocktests(resMocktestData.data)

    const resUnivtest = await fetch("/api/event/univtest")
    const resUnivtestData = await resUnivtest.json()
    setUnivtests(resUnivtestData.data)

    const res = await fetch(`/api/event/${teamId}`)
    const resData = await res.json()
    setEvents(resData.data)
  }

  const toToday = (): any => {
    const calendar = calendarRef.current
    const firstDayOfTodaysMonth = moment().date(1).toDate()
    calendar!.setActiveStartDate(firstDayOfTodaysMonth)
    onChange(today)
  }

  useEffect(() => {
    getEvents()
  }, [teamId])
  console.log(holidays)
  console.log(mocktests)
  console.log(univtests)
  console.log(events)

  //
  // react-calendar refrash
  //
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    // console.log(gantt)
    setTimeout(() => {
      setHydrated(true)
    }, 100)
    setInterval(() => {
      setNowTime(new Date())
    }, 1000)
  }, [today])
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null
  }

  return (
    <>
      <Box width="350px">
        <Calendar
          ref={calendarRef}
          onChange={onChange}
          value={value}
          minDetail="month"
          calendarType="gregory" // 일요일부터
          formatDay={(locale, date) =>
            moment(date)
              // .tz(locale ?? "Asia/Seoul")
              .format("D")
          }
          showNeighboringMonth={true}
          tileContent={({ date, view }) => {
            let holiday: string | null = ""
            let mocktest: string | null = ""
            let univtest: string | null = ""

            let event: number = 0
            let teamEvent: number = events
              ? events?.filter(
                  (event: any) =>
                    moment(event.onDate)
                      .tz("Asia/Seoul")
                      .format("YYYY-MM-DD") ===
                    moment(date).format("YYYY-MM-DD")
                ).length
              : 0

            if (
              view === "month" &&
              holidays.some(
                (event: any) =>
                  moment(event.onDate).tz("Asia/Seoul").format("YYYY-MM-DD") ===
                  moment(date).format("YYYY-MM-DD")
              )
            ) {
              holiday = holidays.find(
                (event: any) =>
                  moment(event.onDate).tz("Asia/Seoul").format("YYYY-MM-DD") ===
                  moment(date).format("YYYY-MM-DD")
              ).title
            }

            if (
              view === "month" &&
              mocktests.some(
                (event: any) =>
                  moment(event.onDate).tz("Asia/Seoul").format("YYYY-MM-DD") ===
                  moment(date).format("YYYY-MM-DD")
              )
            ) {
              mocktest = mocktests.find(
                (event: any) =>
                  moment(event.onDate).tz("Asia/Seoul").format("YYYY-MM-DD") ===
                  moment(date).format("YYYY-MM-DD")
              ).title
            }

            if (
              view === "month" &&
              univtests.some(
                (event: any) =>
                  moment(event.onDate).tz("Asia/Seoul").format("YYYY-MM-DD") ===
                  moment(date).format("YYYY-MM-DD")
              )
            ) {
              univtest = univtests.find(
                (event: any) =>
                  moment(event.onDate).tz("Asia/Seoul").format("YYYY-MM-DD") ===
                  moment(date).format("YYYY-MM-DD")
              ).title
            }

            return (
              <>
                <Box fontSize="0.6rem">
                  {holiday === "" && mocktest === "" && univtest === "" && (
                    <>&nbsp;</>
                  )}
                  {holiday &&
                    (holiday.length > 5 ? (
                      <Box color="red">{`${holiday.substring(0, 4)}…`}</Box>
                    ) : (
                      <Box color="red">{holiday}</Box>
                    ))}
                  {mocktest &&
                    (mocktest.length > 5 ? (
                      <Box color="#4785EC">{`${mocktest.substring(
                        0,
                        4
                      )}…`}</Box>
                    ) : (
                      <Box color="#4785EC">{mocktest}</Box>
                    ))}
                  {univtest &&
                    (univtest.length > 5 ? (
                      <Box color="#4785EC">{`${univtest.substring(
                        0,
                        4
                      )}…`}</Box>
                    ) : (
                      <Box color="#4785EC" fontWeight={900}>
                        {univtest}
                      </Box>
                    ))}
                </Box>
                {/* <span style={{ fontSize: "0.5rem", color: "purple" }}>
                  {event ? "★★★★★★★★★★".slice(0, event) : <>&nbsp;</>}
                </span> */}
                <span style={{ fontSize: "0.5rem", color: "green" }}>
                  {teamEvent ? (
                    teamEvent > 6 ? (
                      "◆◆◆◆◆+"
                    ) : (
                      "◆◆◆◆◆◆".slice(0, teamEvent)
                    )
                  ) : (
                    <>&nbsp;</>
                  )}
                </span>
              </>
            )
          }}
        />
      </Box>
      {(teamId === "gnBiz" || teamId === "gnGa") && (
        <Flex justifyContent={"flex-end"} width="100%" textAlign={"right"}>
          <Link href={`/intra/team/${teamId}/editEvent/0`}>
            <BiCalendarEdit />
          </Link>
        </Flex>
      )}

      <Box borderRadius={"12px"} w="100%" textAlign="center" mt={2}>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          pt={4}
          pb={2}
          bgColor={colors.blue0}
          // color={colors.primary}
          borderRadius={"12px 12px 0 0"}
          border={`solid 1px ${colors.blue1}`}
        >
          <Button
            onClick={toToday}
            w="50px"
            mr={7}
            h={7}
            // colorScheme="blackAlpha"
            bgColor={colors.blue3}
            color="white"
            fontSize="0.8rem"
          >
            오늘로
          </Button>
          <Box>
            {moment(value).format("YYYY년 MM월 DD일")}{" "}
            {weekKr[Number(moment(value).format("d"))]}요일
          </Box>
          <Box w="50px" textAlign={"right"}>
            <Flex justifyContent={"flex-end"} alignItems={"center"}>
              <Box fontSize={"0.8rem"}>
                {moment(nowTime).tz("Asia/Seoul").format("hh:mm")}
              </Box>
              <Box>
                <Box fontSize={"0.4rem"}>
                  {moment(nowTime).tz("Asia/Seoul").format("a")}
                </Box>
                <Box fontSize={"0.5rem"}>
                  {moment(nowTime).tz("Asia/Seoul").format("ss")}
                </Box>
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Divider />
        <Box
          pt={2}
          pb={4}
          // border="#b2d3c2 1px solid"
          borderRadius={"0 0 12px 12px"}
          border={`solid 1px ${colors.blue1}`}
        >
          {holidays &&
            holidays
              .filter(
                (event: any) =>
                  moment(event.onDate).tz("Asia/Seoul").format("YYYY-MM-DD") ===
                  moment(value).format("YYYY-MM-DD")
              )
              .map((holiday: any, index: number) => (
                <Badge colorScheme={"red"} key={index} ml={1} mr={1}>
                  {holiday.title}
                </Badge>
              ))}
          {univtests &&
            univtests
              .filter(
                (event: any) =>
                  moment(event.onDate).tz("Asia/Seoul").format("YYYY-MM-DD") ===
                  moment(value).format("YYYY-MM-DD")
              )
              .map((univtest: any, index: number) => (
                <Badge colorScheme={"blue"} key={index} ml={1} mr={1}>
                  {univtest.title}
                </Badge>
              ))}
          {mocktests &&
            mocktests
              .filter(
                (event: any) =>
                  moment(event.onDate).tz("Asia/Seoul").format("YYYY-MM-DD") ===
                  moment(value).format("YYYY-MM-DD")
              )
              .map((mocktest: any, index: number) => (
                <Badge colorScheme={"blue"} key={index} ml={1} mr={1}>
                  {mocktest.title}
                </Badge>
              ))}
          {events &&
            events
              ?.filter(
                (event: any) =>
                  moment(event.onDate).tz("Asia/Seoul").format("YYYY-MM-DD") ===
                  moment(value).format("YYYY-MM-DD")
              )
              .map((event: any, index: number) => (
                <Box key={index}>{event.title}</Box>
              ))}
          {/* {gantt.events[
            moment(value).format("YYYY-MM-DD") as keyof typeof gantt.events
          ]
            ? gantt.events[
                moment(value).format("YYYY-MM-DD") as keyof typeof gantt.events
              ]!.split("\n").map((event, index) => (
                <Box key={index}>{event}</Box>
              ))
            : ""}
          {gantt.events[
            moment(value).format("YYYY-MM-DD") as keyof typeof gantt.events
          ] &&
          gantt[branchId as keyof typeof gantt][
            moment(value).format("YYYY-MM-DD") as keyof typeof gantt.events
          ] ? (
            <Divider />
          ) : (
            ""
          )} */}
          {/* 
          {gantt[branchId as keyof typeof gantt][
            moment(value).format("YYYY-MM-DD") as keyof typeof gantt.events
          ]
            ? gantt[branchId as keyof typeof gantt]
                [
                  moment(value).format(
                    "YYYY-MM-DD"
                  ) as keyof typeof gantt.events
                ]!.split("\n")
                .map((event, index) => <Box key={index}>{event}</Box>)
            : ""}
          {gantt.events[
            moment(value).format("YYYY-MM-DD") as keyof typeof gantt.events
          ] ||
          gantt[branchId as keyof typeof gantt][
            moment(value).format("YYYY-MM-DD") as keyof typeof gantt.events
          ]
            ? ""
            : "-"} */}
        </Box>
      </Box>
    </>
  )
}
