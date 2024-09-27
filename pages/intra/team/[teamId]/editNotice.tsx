import { useState, useEffect, useRef, useCallback } from "react"
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
  Badge,
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

export default function EditNotice() {
  const router = useRouter()
  const {
    query: { teamId },
  } = router
  const { data: session, status } = useSession()
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [isAdd, setIsAdd] = useState(true)
  const [today, setToday] = useState(new Date())
  const [notices, setNotices] = useState<any[]>([])
  const [teams, setTeams] = useState<any>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)
  const [deleteNotice, setDeleteNotice] = useState<any>({})

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
      values.noticeObjectId = null
      values.createdBy = session?.user?.email
      values.createdFrom = teamId
      values.timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000
      if (values.startDate > values.endDate) {
        alert("공지종료일이 공지시작일보다 빠릅니다")
        return
      }

      // console.log(values.teamsId)
      if (!values.teamsId) {
        values.teamsId = [teamId]
      }
      // console.log(values.teamsId)
      values.teamsId.forEach(async (teamId: string) => {
        if (teamId !== "gnBiz" && teamId !== "gnGa") values.teamId = teamId

        const res = await fetch("/api/notice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
      })
    } else {
      values.timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000
      if (values.startDate > values.endDate) {
        alert("공지종료일이 공지시작일보다 빠릅니다")
        return
      }

      const res = await fetch("/api/notice", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      setIsAdd(true)
    }

    getNotices()
    reset()
  }

  const getNotices = async () => {
    if (teamId) {
      const res =
        teamId === "gnBiz" || teamId === "gnGa"
          ? await fetch("/api/notice/all")
          : await fetch(`/api/notice/${teamId}`)
      const resData = await res.json()
      setNotices((prev) => resData.data)
    }
  }
  useEffect(() => {
    getNotices()
  }, [teamId, notices])

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
          <Box>공지사항 목록</Box>
          <Flex
            justifyContent={"space-between"}
            bgColor={colors.secondary}
            color={colors.primary}
            fontSize="0.7rem"
            fontWeight="700"
            p={1}
            mb={3}
          >
            <Box>공지종료일로부터 10일이 지난 공지는 자동 삭제됩니다</Box>
            <Box>
              [삭제],[수정]을 클릭하면 오른쪽에 입력된 기존 내용은 삭제됩니다
            </Box>
          </Flex>

          {notices.length > 0 &&
            notices!.map((notice, index) => {
              if (
                notice.createdFrom === teamId
                // teamId === "gnBiz" ||
                // (teamId !== "gnBiz" && notice.createdFrom === teamId)
              )
                return (
                  <>
                    <Grid
                      templateColumns={"repeat(1, 7fr 2fr 2fr 1fr )"}
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
                          colorScheme={notice.teamId === "All" ? "red" : "blue"}
                          mr={1}
                        >
                          {teams && teams[notice.teamId]}
                        </Badge>
                        {notice.title}
                      </GridItem>
                      <GridItem>
                        {moment(notice.startDate)
                          .tz("Asia/Seoul")
                          .format("YYYY-MM-DD")}
                      </GridItem>
                      <GridItem>
                        {moment(notice.endDate)
                          .tz("Asia/Seoul")
                          .format("YYYY-MM-DD")}
                      </GridItem>
                      <GridItem>
                        <Button
                          colorScheme="red"
                          h="1.4rem"
                          w="3rem"
                          onClick={() => {
                            setDeleteNotice(notice)
                            onOpen()
                          }}
                        >
                          삭제
                        </Button>
                      </GridItem>
                      <GridItem colSpan={3}>
                        {notice.description?.split("\n").map((line: string) => (
                          <>
                            {line}
                            <br />
                          </>
                        ))}
                      </GridItem>
                      <GridItem>
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
                            setValue("noticeObjectId", notice._id)
                            setValue("title", notice.title)
                            setValue(
                              "startDate",
                              moment(notice.startDate).format("YYYY-MM-DD")
                            )
                            setValue(
                              "endDate",
                              moment(notice.endDate).format("YYYY-MM-DD")
                            )
                            setValue("description", notice.description)
                            // console.log(getValues())
                          }}
                        >
                          수정
                        </Button>
                      </GridItem>
                    </Grid>
                  </>
                )
            })}
        </GridItem>

        <GridItem>
          <Box>공지사항 추가/편집</Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2}>
              <FormControl hidden>
                <InputGroup>
                  <InputLeftAddon>createdByWhom</InputLeftAddon>
                  <Input id="noticeObjectId" {...register("noticeObjectId")} />
                </InputGroup>
              </FormControl>

              <FormControl
                hidden={(teamId !== "gnBiz" && teamId !== "gnGa") || !isAdd}
              >
                <CheckboxGroup defaultValue={[]}>
                  <Checkbox
                    value="SsDc"
                    {...register("teamsId")}
                    m={3}
                    isDisabled={!isAdd}
                  >
                    상상 대치관
                  </Checkbox>
                  <Checkbox
                    value="PlDc"
                    {...register("teamsId")}
                    m={3}
                    isDisabled={!isAdd}
                  >
                    개폴 대치관
                  </Checkbox>
                  <Checkbox
                    value="PlPc"
                    {...register("teamsId")}
                    m={3}
                    isDisabled={!isAdd}
                  >
                    평촌관
                  </Checkbox>
                  <Checkbox
                    value="SsMd"
                    {...register("teamsId")}
                    m={3}
                    isDisabled={!isAdd}
                  >
                    상상 의대관
                  </Checkbox>
                  <Checkbox
                    value="SPAk"
                    {...register("teamsId")}
                    m={3}
                    isDisabled={!isAdd}
                  >
                    압구정관
                  </Checkbox>
                  <Checkbox
                    value="PlCd"
                    {...register("teamsId")}
                    m={3}
                    isDisabled={!isAdd}
                  >
                    삼청관
                  </Checkbox>

                  <Checkbox
                    value="SPSc"
                    {...register("teamsId")}
                    m={3}
                    isDisabled={!isAdd}
                  >
                    서초관
                  </Checkbox>
                  <Checkbox
                    value="PlBb"
                    {...register("teamsId")}
                    m={3}
                    isDisabled={!isAdd}
                  >
                    방배관
                  </Checkbox>

                  <Checkbox
                    value="SPJs"
                    {...register("teamsId")}
                    m={3}
                    isDisabled={!isAdd}
                  >
                    잠실관
                  </Checkbox>

                  <Checkbox
                    value="PlSj"
                    {...register("teamsId")}
                    m={3}
                    isDisabled={!isAdd}
                  >
                    수지관
                  </Checkbox>

                  <Checkbox
                    value="PlDt"
                    {...register("teamsId")}
                    m={3}
                    isDisabled={!isAdd}
                  >
                    동탄관
                  </Checkbox>

                  <Checkbox
                    value="PlDs"
                    {...register("teamsId")}
                    m={3}
                    isDisabled={!isAdd}
                  >
                    다산관
                  </Checkbox>

                  <Checkbox
                    value="PlSd"
                    {...register("teamsId")}
                    m={3}
                    isDisabled={!isAdd}
                  >
                    송도관
                  </Checkbox>

                  {/* <Checkbox
                    value="LbJs"
                    {...register("teamsId")}
                    m={3}
                    isDisabled={!isAdd}
                  >
                    독한공부
                  </Checkbox> */}
                </CheckboxGroup>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.title)}>
                <InputGroup>
                  <InputLeftAddon>제목</InputLeftAddon>
                  <Input
                    id="title"
                    placeholder="제목(필수, 5~20자)"
                    {...register("title", {
                      required: "필수 입력 항목입니다",
                      minLength: {
                        value: 5,
                        message: "최소 5자이상입니다",
                      },
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

              <FormControl isInvalid={Boolean(errors.startDate)}>
                <InputGroup zIndex={10}>
                  <InputLeftAddon>공지시작일</InputLeftAddon>
                  <Input
                    type="date"
                    id="startDate"
                    defaultValue={moment(today).format("YYYY-MM-DD")}
                    {...register("startDate", {
                      required: "필수 입력 항목입니다",
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.startDate && errors.startDate.message?.toString()}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.endDate)}>
                <InputGroup zIndex={10}>
                  <InputLeftAddon>공지종료일</InputLeftAddon>
                  <Input
                    type="date"
                    id="endDate"
                    defaultValue={moment(today).format("YYYY-MM-DD")}
                    {...register("endDate", {
                      required: "필수 입력 항목입니다",
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.endDate && errors.endDate.message?.toString()}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.description)}>
                <InputGroup>
                  <InputLeftAddon h={100}>
                    내<br />용
                  </InputLeftAddon>{" "}
                  <Textarea
                    h={100}
                    placeholder="내용(~3000자)"
                    size="sm"
                    resize="none"
                    maxLength={3000}
                    {...register("description")}
                  />
                  {/* <Input
                    id="description"
                    placeholder="내용(~3000자)"
                  /> */}
                </InputGroup>
                <FormErrorMessage>
                  {errors.email && errors.email.message?.toString()}
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
              공지사항을 삭제하시겠습니까?
            </AlertDialogHeader>

            <AlertDialogBody>
              <Box fontWeight={700}>
                <Badge>{teams && teams[deleteNotice.teamId]}</Badge>
                {deleteNotice.title}{" "}
              </Box>
              (
              {moment(deleteNotice.startDate)
                .tz("Asia/Seoul")
                .format("YYYY-MM-DD")}
              &nbsp; &nbsp;-&nbsp;&nbsp;
              {moment(deleteNotice.endDate)
                .tz("Asia/Seoul")
                .format("YYYY-MM-DD")}
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
                  await fetch("/api/notice", {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      noticeObjectId: deleteNotice._id,
                      deletedBy: session?.user?.email,
                    }),
                  })
                  getNotices()
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
