import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import { useRealViewport } from "next-real-viewport"
import { Flex, HStack, Box, Divider } from "@chakra-ui/react"
import { PhoneIcon, CalendarIcon, ChatIcon } from "@chakra-ui/icons"
import { PiStudentFill } from "react-icons/pi"

import theme from "@/components/outer/theme.json"
import locations from "@/components/outer/locations.json"
import branches from "@/components/outer/branches.json"
import getBranch from "@/lib/getBranch"

export default function BranchBox({
  branchId,
  branchColor,
}: {
  branchId: string
  branchColor: string
}) {
  const router = useRouter()

  // const branch = branches[branchId as keyof typeof branches]
  const [branch, setBranch] = useState<any>(null)

  const [target0Topics, setTarget0Topics] = useState<any[]>([])
  const [target1Topics, setTarget1Topics] = useState<any[]>([])
  const [contents0, setContents0] = useState("")
  const [contents1, setContents1] = useState("")
  let count0: number = 0
  let count1: number = 0
  const flipHeight = 16.5
  const flipSecond = 4

  // useEffect(() => {
  //   setInterval(() => {
  //     count0 += 5
  //     // count0 += Math.random() >= 0.5 ? 1 : 0
  //     count1 += Math.random() >= 0.5 ? 1 : 0

  //     setContents0(
  //       branch.presentationContents0[
  //         count0 % branch.presentationContents0.length
  //       ]
  //     )
  //     ;``
  //     // console.log("presentatonTitle1" in Object.keys(branch));
  //     if (
  //       "presentatonTitle1" in Object.keys(branch) &&
  //       "presentatonContents1" in Object.keys(branch) &&
  //       branch.presentationTitle1 !== "" &&
  //       branch.presentationContents1.length !== 0
  //     ) {
  //       setContents1(
  //         branch.presentationContents1[
  //           count1 % branch.presentationContents1.length
  //         ]
  //       )
  //     }
  //   }, 3000)
  // }, [])

  useEffect(() => {
    // if (teamId !== "" && teamId !== undefined) getTeam(teamId)
    if (branchId) {
      const _ = async () => {
        const branchData = await getBranch(branchId)
        setBranch(branchData)

        let topics0 = []
        let topics1 = []
        for (let i = 0; i < 10; i++) {
          if (branchData[`target0KeynoteTopic${i}`] !== "")
            topics0.push(branchData[`target0KeynoteTopic${i}`])
          if (branchData[`target1KeynoteTopic${i}`] !== "")
            topics1.push(branchData[`target1KeynoteTopic${i}`])
        }
        setTarget0Topics(topics0)
        setTarget1Topics(topics1)
      }
      _()
    }
  }, [branchId])
  // console.log(branch)

  return (
    <>
      <div id={branchId}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Flex alignItems={"center"}>
            <div
              style={{
                display: "flex",
                borderRadius: "10px 10px 0 0",
                width: "250px",
                alignItems: "baseline",
                backgroundColor: `${branchColor}`,
                color: theme.white,
                padding: "8px",
                marginRight: "6px",
              }}
            >
              <Box>&nbsp;{branch?.branchTitle}</Box>
              {/* {branch?.target && (
              <Box fontSize={"13px"}>&nbsp;( {branch.target} )</Box>
            )} */}
            </div>
            {branch?.student && (
              <a href={branch?.student} title="학습보고서" target="_blank">
                <PiStudentFill size="1.5rem" />
              </a>
            )}
          </Flex>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "baseline",
            }}
          >
            <Box fontSize={13}>
              <a href={`tel://${branch?.target0Phone}`}>
                <PhoneIcon color="gray" />
                {branch?.target0}
              </a>
            </Box>
            {branch?.target1Phone !== "" && (
              <>
                <Box>•</Box>
                <Box fontSize={13}>
                  <a href={`tel://${branch?.target1Phone}`}>
                    <PhoneIcon color="gray" />
                    {branch?.target1}
                  </a>
                </Box>
              </>
            )}
          </div>
        </div>
        <Box
          padding={"10px 20px 20px 20px"}
          backgroundColor={theme.white}
          borderRadius={"0 10px 0 0"}
          boxShadow={
            "0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19)"
          }
        >
          {branch?.target0ScheduleTitle && (
            <>
              {branch?.target0ScheduleLink && (
                <a href={`${branch?.target0ScheduleLink}`} target="_blank">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 0",
                    }}
                  >
                    <CalendarIcon />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        marginLeft: "8px",
                      }}
                    >
                      <Box>{branch?.target0ScheduleTitle}</Box>
                      {/* {branch.scheduleOpen0 && (
                        <Box fontSize={11}>({branch.scheduleOpen0})</Box>
                      )} */}
                    </div>
                  </div>
                </a>
              )}
              {!branch.target0ScheduleLink && (
                <Link href={`/branch/${branch?.branchId}/schedule/0`}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 0",
                    }}
                  >
                    <CalendarIcon />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        marginLeft: "8px",
                      }}
                    >
                      <Box>{branch?.target0ScheduleTitle}</Box>
                      {/* {branch.scheduleOpen0 && (
                        <Box fontSize={11}>({branch.scheduleOpen0})</Box>
                      )} */}
                    </div>
                  </div>
                </Link>
              )}

              <hr style={{ borderTop: "dashed 1px black", width: "300px" }} />
            </>
          )}
          {branch?.target1ScheduleTitle !== "" && (
            <>
              {branch?.target1ScheduleLink && (
                <a href={`${branch?.target1ScheduleLink}`} target="_blank">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 0",
                    }}
                  >
                    <CalendarIcon />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        marginLeft: "8px",
                      }}
                    >
                      <Box>{branch?.target1ScheduleTitle}</Box>
                      {/* {branch.scheduleOpen1 && (
                        <Box fontSize={11}>({branch.scheduleOpen1})</Box>
                      )} */}
                    </div>
                  </div>
                </a>
              )}

              {!branch?.target1ScheduleLink && (
                <Link href={`/branch/${branch?.branchId}/schedule/1`}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 0",
                    }}
                  >
                    <CalendarIcon />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        marginLeft: "8px",
                      }}
                    >
                      <Box>{branch?.target1ScheduleTitle}</Box>
                      {/* {branch.scheduleOpen1 && (
                        <Box fontSize={11}>({branch.scheduleOpen1})</Box>
                      )} */}
                    </div>
                  </div>
                </Link>
              )}

              <hr style={{ borderTop: "dashed 1px black", width: "300px" }} />
            </>
          )}
          {branch?.target0KeynoteTitle && (
            <>
              {branch?.target0KeynoteLink && (
                <a href={`${branch?.target0KeynoteLink}`} target="_blank">
                  {" "}
                  <HStack pt={2} pb={2} alignItems={"flex-start"}>
                    <ChatIcon mt={1} />
                    <Flex
                      flexDirection={"column"}
                      justifyContent={"start"}
                      alignItems={"baseline"}
                    >
                      <Box>{branch?.target0KeynoteTitle}</Box>
                    </Flex>
                  </HStack>
                </a>
              )}
              {!branch.target0KeynoteLink && (
                <Link href={`/branch/${branch.branchId}/presentation/0`}>
                  <HStack pt={2} pb={2} alignItems={"flex-start"}>
                    <ChatIcon mt={1} />
                    <Flex
                      flexDirection={"column"}
                      justifyContent={"start"}
                      alignItems={"baseline"}
                    >
                      <Box>{branch.target0KeynoteTitle}</Box>
                      {target0Topics.length > 0 && (
                        <div className="flip">
                          {target0Topics.length > 1
                            ? target0Topics.map((topic, index) => (
                                <Box
                                  key={index}
                                  className="flipContent"
                                  style={
                                    index === 0
                                      ? {
                                          animation: `show${
                                            target0Topics.length
                                          } ${
                                            flipSecond * target0Topics.length
                                          }s linear infinite`,
                                        }
                                      : {}
                                  }
                                  textAlign="left"
                                >
                                  {topic}
                                </Box>
                              ))
                            : target0Topics[0]}
                        </div>
                      )}
                    </Flex>
                  </HStack>
                </Link>
              )}
              <hr style={{ borderTop: "dashed 1px black", width: "300px" }} />
            </>
          )}
          {branch?.target1KeynoteTitle && (
            <>
              {branch?.target1KeynoteLink && (
                <a href={`${branch?.target1KeynoteLink}`} target="_blank">
                  <HStack pt={2} pb={2} alignItems={"flex-start"}>
                    <ChatIcon mt={1} />
                    <Flex
                      flexDirection={"column"}
                      justifyContent={"start"}
                      alignItems={"baseline"}
                    >
                      <Box>{branch?.target1KeynoteTitle}</Box>
                    </Flex>
                  </HStack>
                </a>
              )}
              {!branch?.target1KeynoteLink && (
                <Link href={`/branch/${branch.branchId}/presentation/1`}>
                  <HStack pt={2} pb={2} alignItems={"flex-start"}>
                    <ChatIcon mt={1} />
                    <Flex
                      flexDirection={"column"}
                      justifyContent={"start"}
                      alignItems={"baseline"}
                    >
                      <Box>{branch?.target1KeynoteTitle}</Box>
                      {target1Topics.length > 0 && (
                        <div className="flip">
                          {target1Topics.length > 1
                            ? target1Topics.map((topic, index) => (
                                <Box
                                  key={index}
                                  className="flipContent"
                                  style={
                                    index === 0
                                      ? {
                                          animation: `show${
                                            target1Topics.length
                                          } ${
                                            flipSecond * target1Topics.length
                                          }s linear infinite`,
                                        }
                                      : {}
                                  }
                                  textAlign="left"
                                >
                                  {topic}
                                </Box>
                              ))
                            : target1Topics[0]}
                        </div>
                      )}
                      {/* {branch.presentationContents1.length > 0 && (
                        <div className="flip">
                          {branch.presentationContents1.length > 1
                            ? branch.presentationContents1.map(
                                (content, index) => (
                                  <Box
                                    key={index}
                                    className="flipContent"
                                    style={
                                      index === 0
                                        ? {
                                            animation: `show${
                                              branch.presentationContents1
                                                .length
                                            } ${
                                              flipSecond *
                                              branch.presentationContents1
                                                .length
                                            }s linear infinite`,
                                          }
                                        : {}
                                    }
                                    textAlign="left"
                                  >
                                    {content}
                                  </Box>
                                )
                              )
                            : branch.presentationContents1[0]}
                        </div>
                      )} */}
                    </Flex>
                  </HStack>
                </Link>
              )}
              <hr style={{ borderTop: "dashed 1px black", width: "300px" }} />
            </>
          )}
        </Box>
      </div>

      <style jsx>{`
        .flip {
          height: ${flipHeight}px;
          overflow: hidden;
          font-size: 11px;
        }

        // .flip div:first-child {
        //   animation: show 12s linear infinite;
        // }

        .flipContent {
          height: ${flipHeight}px;
        }

        @keyframes show2 {
          0% {
            margin-top: -${flipHeight * 2}px;
          }
          5% {
            margin-top: -${flipHeight}px;
          }
          50% {
            margin-top: -${flipHeight}px;
          }
          55% {
            margin-top: 0px;
          }
          99.99% {
            margin-top: 0px;
          }
          100% {
            margin-top: -${flipHeight * 2}px;
          }
        }

        @keyframes show3 {
          0% {
            margin-top: -${flipHeight * 3}px;
          }
          5% {
            margin-top: -${flipHeight * 2}px;
          }
          33% {
            margin-top: -${flipHeight * 2}px;
          }
          38% {
            margin-top: -${flipHeight}px;
          }
          66% {
            margin-top: -${flipHeight}px;
          }
          71% {
            margin-top: 0px;
          }
          99.99% {
            margin-top: 0px;
          }
          100% {
            margin-top: -${flipHeight * 3}px;
          }
        }

        @keyframes show4 {
          0% {
            margin-top: -${flipHeight * 4}px;
          }
          5% {
            margin-top: -${flipHeight * 3}px;
          }
          25% {
            margin-top: -${flipHeight * 3}px;
          }
          30% {
            margin-top: -${flipHeight * 2}px;
          }
          50% {
            margin-top: -${flipHeight * 2}px;
          }
          55% {
            margin-top: -${flipHeight}px;
          }
          75% {
            margin-top: -${flipHeight}px;
          }
          80% {
            margin-top: 0px;
          }
          99.99% {
            margin-top: 0px;
          }
          100% {
            margin-top: -${flipHeight * 4}px;
          }
        }

        @keyframes show5 {
          0% {
            margin-top: -${flipHeight * 5}px;
          }
          5% {
            margin-top: -${flipHeight * 4}px;
          }
          20% {
            margin-top: -${flipHeight * 4}px;
          }
          25% {
            margin-top: -${flipHeight * 3}px;
          }
          40% {
            margin-top: -${flipHeight * 3}px;
          }
          45% {
            margin-top: -${flipHeight * 2}px;
          }
          60% {
            margin-top: -${flipHeight * 2}px;
          }
          65% {
            margin-top: -${flipHeight}px;
          }
          80% {
            margin-top: -${flipHeight}px;
          }
          85% {
            margin-top: 0px;
          }
          99.99% {
            margin-top: 0px;
          }
          100% {
            margin-top: -${flipHeight * 5}px;
          }
        }

        @keyframes show6 {
          0% {
            margin-top: -${flipHeight * 6}px;
          }
          4% {
            margin-top: -${flipHeight * 5}px;
          }
          16% {
            margin-top: -${flipHeight * 5}px;
          }
          20% {
            margin-top: -${flipHeight * 4}px;
          }
          32% {
            margin-top: -${flipHeight * 4}px;
          }
          36% {
            margin-top: -${flipHeight * 3}px;
          }
          48% {
            margin-top: -${flipHeight * 3}px;
          }
          52% {
            margin-top: -${flipHeight * 2}px;
          }
          62% {
            margin-top: -${flipHeight * 2}px;
          }
          64% {
            margin-top: -${flipHeight}px;
          }
          78% {
            margin-top: -${flipHeight}px;
          }
          82% {
            margin-top: 0px;
          }
          99.99% {
            margin-top: 0px;
          }
          100% {
            margin-top: -${flipHeight * 6}px;
          }
        }
      `}</style>
    </>
  )
}
