import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import moment from "moment-timezone"

import { useSession } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import "react-datepicker/dist/react-datepicker.css"

import teamsIdTitle from "@/lib/teamsIdTitle"

import colors from "@/theme/colors"
import {
  Box,
  Grid,
  GridItem,
  Button,
  Flex,
  Stack,
  Center,
  Badge,
  Link,
  useDisclosure,
} from "@chakra-ui/react"
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputLeftElement,
  InputRightElement,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Textarea,
} from "@chakra-ui/react"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react"
import { describe } from "node:test"

const updatableDays: number = 7

export default function EditEvent() {
  const router = useRouter()
  const {
    query: { teamId, page },
  } = router
  const { data: session, status } = useSession()
  const [onDate, setOnDate] = useState(new Date())
  const [isAdd, setIsAdd] = useState(true)
  const [today, setToday] = useState(new Date())
  const [events, setEvents] = useState<any[]>([])
  const [teams, setTeams] = useState<any>(null)
  const [maxListCount, setMaxListCount] = useState<number>(20)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)
  const [deleteEvent, setDeleteEvent] = useState<any>({})

  const {
    handleSubmit,
    control,
    register,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()
  const { replace } = useFieldArray({ control, name: "teamId" })

  async function onSubmit(formData: any) {
    const values = { ...formData }

    if (isAdd) {
      values.eventObjectId = null
      values.createdBy = session?.user?.email
      values.createdFrom = teamId
      values.timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000
      values.teamId = teamId
      if (!values.category) {
        values.category = ""
      }
      const res = await fetch("/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      setIsAdd(true)
    } else {
      values.timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000

      const res = await fetch("/api/event", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      setIsAdd(true)
    }

    getEvents()
    reset()
  }

  const getEvents = async () => {
    if (teamId) {
      // const res =
      //   teamId === "gnBiz"
      //     ? await fetch("/api/event/all")
      //     : await fetch(`/api/event/${teamId}`)
      const res = await fetch(`/api/event/${teamId}`)
      const resData = await res.json()
      setEvents((prev) => resData.data)
    }
  }
  useEffect(() => {
    getEvents()
  }, [teamId])

  useEffect(() => {
    const _ = async () => {
      setTeams(await teamsIdTitle())
    }
    _()
  }, [])

  // console.log(1, notices)
  return (
    <>
      <Grid templateColumns={"2fr 1fr"} gap={5}>
        <GridItem>
          <Box>일정 목록</Box>
          <Flex
            justifyContent={"space-between"}
            bgColor={colors.secondary}
            color={colors.primary}
            fontSize="0.7rem"
            fontWeight="700"
            p={1}
            mb={3}
          >
            <Box>{updatableDays}일 전까지의 일정만 삭제,수정 가능합니다</Box>
            <Box>
              [삭제],[수정]을 클릭하면 오른쪽에 입력된 기존 내용은 삭제됩니다
            </Box>
          </Flex>

          {events.length > 0 &&
            events!
              .slice(
                Number(page) * maxListCount,
                (Number(page) + 1) * maxListCount
              )
              .map((event, index) => {
                if (
                  teamId === "gnBiz" ||
                  (teamId !== "gnBiz" && event.createdFrom === teamId)
                )
                  return (
                    <>
                      <Grid
                        templateColumns={"repeat(1, 7fr 2fr 1fr 1fr )"}
                        gap={1}
                        key={index}
                        mb={2}
                      >
                        <GridItem h="1px" bgColor="#ccc"></GridItem>
                        <GridItem h="1px" bgColor="#ccc"></GridItem>
                        <GridItem h="1px" bgColor="#ccc"></GridItem>
                        <GridItem h="1px" bgColor="#ccc"></GridItem>

                        <GridItem
                          bgColor={colors.primary}
                          borderRadius={5}
                          p={"0 5px 0 5px"}
                        >
                          <Badge
                            colorScheme={
                              event.teamId === "All" ? "red" : "blue"
                            }
                            mr={1}
                          >
                            {teams && teams[event.teamId]}
                          </Badge>
                          {event.title}
                          <Badge
                            colorScheme={
                              event.category === "holiday" ? "red" : "blue"
                            }
                            mr={1}
                          >
                            {event.category}
                          </Badge>
                        </GridItem>
                        <GridItem>
                          {moment(event.onDate)
                            .tz("Asia/Seoul")
                            .format("YYYY-MM-DD")}
                        </GridItem>
                        <GridItem>
                          {moment(event.onDate).add(updatableDays, "days") >
                          moment() ? (
                            <Button
                              colorScheme="red"
                              h="1.4rem"
                              w="3rem"
                              onClick={() => {
                                setDeleteEvent(event)
                                onOpen()
                              }}
                            >
                              삭제
                            </Button>
                          ) : (
                            <Box>-</Box>
                          )}
                        </GridItem>
                        <GridItem>
                          {moment(event.onDate).add(updatableDays, "days") >
                          moment() ? (
                            <Button
                              colorScheme="green"
                              h="1.4rem"
                              w="3rem"
                              onClick={() => {
                                // console.log(
                                //   moment(notice.startDate)
                                //     .tz("Asis/Seoul")
                                //     .format("YYYY-MM-DD")
                                // )
                                // console.log(getValues())
                                reset()
                                // replace(["PlCd"])
                                setIsAdd(false)
                                setValue("eventObjectId", event._id)
                                setValue("title", event.title)
                                setValue(
                                  "onDate",
                                  moment(event.onDate).format("YYYY-MM-DD")
                                )
                                // console.log(getValues())
                              }}
                            >
                              수정
                            </Button>
                          ) : (
                            <Box>-</Box>
                          )}
                        </GridItem>
                      </Grid>
                    </>
                  )
              })}
          <Center>
            {Number(page) > 0 ? (
              <Link
                href={`${router.asPath.split("/").slice(0, -1).join("/")}/${
                  Number(page) - 1
                }`}
              >
                <Button p={"0px"} h={"1.7rem"}>
                  ◀
                </Button>
              </Link>
            ) : (
              <Button colorScheme={"whiteAlpha"} p={"0px"} h={"1.7rem"}>
                ◀
              </Button>
            )}
            &nbsp;&nbsp;
            {Number(page) + 1}&nbsp;&nbsp;/&nbsp;&nbsp;
            {events.length
              ? Math.ceil(Number(String(events.length / maxListCount)))
              : 1}
            &nbsp;&nbsp;
            {Number(page) <
            Math.ceil(Number(String(events.length / maxListCount))) - 1 ? (
              <Link
                href={`${router.asPath.split("/").slice(0, -1).join("/")}/${
                  Number(page) + 1
                }`}
              >
                <Button p={"0px"} h={"1.7rem"}>
                  ▶
                </Button>
              </Link>
            ) : (
              <Button colorScheme={"whiteAlpha"} p={"0px"} h={"1.7rem"}>
                ▶
              </Button>
            )}
          </Center>
        </GridItem>

        <GridItem>
          <Box>일정 추가/편집</Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2}>
              <FormControl hidden>
                <InputGroup>
                  <InputLeftAddon>createdByWhom</InputLeftAddon>
                  <Input id="eventObjectId" {...register("eventObjectId")} />
                </InputGroup>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.title)}>
                <InputGroup>
                  <InputLeftAddon>제목</InputLeftAddon>
                  <Input
                    id="title"
                    placeholder="제목(~20자)"
                    {...register("title", {
                      required: "필수 입력 항목입니다",
                      maxLength: {
                        value: 20,
                        message: "최대 20자까지 가능합니다",
                      },
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.title && errors.title.message?.toString()}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.onDate)}>
                <InputGroup zIndex={10}>
                  <InputLeftAddon>날짜</InputLeftAddon>
                  <Input
                    type="date"
                    id="onDate"
                    defaultValue={moment(today).format("YYYY-MM-DD")}
                    {...register("onDate", {
                      required: "필수 입력 항목입니다",
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.onDate && errors.onDate.message?.toString()}
                </FormErrorMessage>
              </FormControl>

              {isAdd && (
                <Button
                  // mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  추가
                </Button>
              )}
              {!isAdd && (
                <Grid templateColumns={"5fr 1fr"} gap={3}>
                  <GridItem>
                    <Button
                      w="100%"
                      colorScheme="teal"
                      isLoading={isSubmitting}
                      type="submit"
                    >
                      수정
                    </Button>
                  </GridItem>
                  <GridItem>
                    <Button
                      onClick={() => {
                        reset()
                        setIsAdd(true)
                      }}
                    >
                      취소
                    </Button>
                  </GridItem>
                </Grid>
              )}
            </Stack>
          </form>
        </GridItem>
      </Grid>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              일정을 삭제하시겠습니까?
            </AlertDialogHeader>

            <AlertDialogBody>
              <b>{deleteEvent.title} </b>(
              {moment(deleteEvent.onDate).tz("Asia/Seoul").format("YYYY-MM-DD")}
              )
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                취소
              </Button>
              <Button
                colorScheme="red"
                onClick={async () => {
                  // console.log(event)
                  // console.log(event._id)
                  await fetch("/api/event", {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      eventObjectId: deleteEvent._id,
                      deletedBy: session?.user?.email,
                    }),
                  })
                  getEvents()
                  onClose()
                }}
                ml={3}
              >
                삭제
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
