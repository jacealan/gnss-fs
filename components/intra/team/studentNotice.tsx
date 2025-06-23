import React, { useEffect, useState, useRef } from "react"
import { useRouter } from "next/router"

import { useSession } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form"
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
import { TZDate } from "@date-fns/tz"

import getBranch from "@/lib/getBranch"

import { Box, Button, ButtonGroup, Image } from "@chakra-ui/react"
import colors from "@/theme/colors"

import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
} from "@chakra-ui/react"

type Inputs = {
  title: string
  description: string
}

export default function StudentNotice({
  teamId,
  branchId,
}: // branchTitle,
// title,
// description,
{
  teamId: string | string[]
  branchId: string
  // branchTitle: string
  // title: string
  // description: string
}) {
  const [branchTitle, setBranchTitle] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [noticeDate, setNoticeDate] = useState(new Date())
  const { data: session, status } = useSession()
  const textareaRef = useRef<HTMLButtonElement>(null)
  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const {
    isOpen: studentNoticeIsOpen,
    onOpen: studentNoticeOnOpen,
    onClose: studentNoticeOnClose,
  } = useDisclosure()
  const studentNoticeBtnRef = useRef(null)

  const onSubmit: SubmitHandler<any> = async (data) => {
    // console.log(branchId)
    // console.log(data)
    const res = await fetch("/api/branch/notice/put", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updatedBy: session?.user?.email,
        updatedFrom: teamId,
        branchId: branchId,
        branchTitle: branchTitle,
        timezoneOffset: new Date().getTimezoneOffset() * 60 * 1000,
        studentNoticeTitle: data.title,
        studentNotice: data.description,
        studentNoticeDate: new Date(),
      }),
    })
  }

  // textareaAutosize 코드
  const textareaAutosize: React.FormEventHandler<HTMLTextAreaElement> = (e) => {
    const element = e.target as HTMLTextAreaElement
    element.style.height = "auto"
    element.style.height = `${element.scrollHeight}px`
  }

  console.log(title)

  useEffect(() => {
    const __ = async () => {
      console.log(branchId)
      const branchData = await getBranch(branchId)
      setBranchTitle(() => branchData?.branchTitle)
      setTitle(() => branchData?.studentNoticeTitle)
      setDescription(() => branchData?.studentNotice)
      setNoticeDate(() => branchData?.studentNoticeDate)
      // }

      console.log(branchData)
    }

    __()
  }, [branchId, studentNoticeIsOpen])

  useEffect(() => {
    if (watch("title") !== title) setValue("title", title)
    if (watch("description") !== description)
      setValue("description", description)
  }, [title, description])

  return (
    <>
      <Button
        ref={studentNoticeBtnRef}
        // colorScheme="teal"
        onClick={studentNoticeOnOpen}
        w="26px"
        bgColor="white"
        border={`dashed 1px ${colors.blue1}`}
        borderRadius={"4px"}
        fontSize="0.6rem"
        fontWeight={400}
        _hover={{ fontWeight: 700 }}
      >
        공지
        <br />
        사항
      </Button>
      <Drawer
        isOpen={studentNoticeIsOpen}
        placement="right"
        onClose={studentNoticeOnClose}
        finalFocusRef={studentNoticeBtnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerCloseButton />
            <DrawerHeader>
              <Box fontSize="0.9rem">{branchTitle}</Box>
              <Box>학습보고서 공지사항</Box>
              <Box fontSize="0.7rem" fontWeight={400}>
                수정일:{" "}
                {format(
                  new TZDate(noticeDate).withTimeZone("Asia/Seoul"),
                  "M/d"
                )}
              </Box>
            </DrawerHeader>
            <DrawerBody>
              {/* <StudentNotice
              teamId={teamId}
              branchId={studentNotice[0]?.branchId}
              title={studentNotice[0]?.title}
              description={studentNotice[0]?.description}
            /> */}

              {/* register your input into the hook by invoking the "register" function */}
              <Box color="#aaa" fontSize="0.7rem">
                제목
              </Box>
              <Box>
                <input
                  style={{
                    border: `solid 1px ${colors.blue1}`,
                    borderRadius: "6px",
                    padding: "10px",
                    margin: 0,
                    width: "100%",
                  }}
                  defaultValue={title}
                  {...register("title", {
                    // required: true
                  })}
                />
              </Box>
              {/* include validation with required or other standard HTML validation rules */}
              <Box color="#aaa" fontSize="0.7rem" mt={4}>
                내용
              </Box>
              <Box>
                <textarea
                  // ref={textareaRef}
                  rows={1}
                  style={{
                    border: `solid 1px ${colors.blue1}`,
                    borderRadius: "6px",
                    padding: "10px",
                    fontSize: "0.9rem",
                    width: "100%",
                    height: "calc(100vh - 350px)",
                    overflow: "auto",
                  }}
                  defaultValue={description}
                  {...register("description", {
                    // required: true,
                    // onChange: textareaAutosize,
                  })}
                />
              </Box>
              {/* errors will return when field validation fails  */}
              {/* {errors.exampleRequired && <span>This field is required</span>} */}
            </DrawerBody>
            <DrawerFooter flexDirection={"column"}>
              <Box
                width="100%"
                fontSize="0.7rem"
                textAlign={"center"}
                color="red"
              >
                공지사항 업데이트일이 오늘로 변경되며,
                <br />
                변경된 내용은 바로 적용됩니다.
              </Box>
              <Button
                type="submit"
                width="100%"
                colorScheme="blue"
                onClick={studentNoticeOnClose}
              >
                수정
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  )
}
