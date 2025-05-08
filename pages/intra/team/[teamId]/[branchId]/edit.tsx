import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/router"
import type { NextPage } from "next"
import axios, { AxiosResponse } from "axios"

import getTeam from "@/lib/getTeam"
import getBranch from "@/lib/getBranch"

import { useSession } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form"

import colors from "@/theme/colors"
import {
  Box,
  Image,
  Stack,
  Flex,
  Center,
  IconButton,
  Link,
} from "@chakra-ui/react"
import {
  PhoneIcon,
  CalendarIcon,
  ChatIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons"
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
} from "@chakra-ui/react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { FaCloudUploadAlt } from "react-icons/fa"
import { BsDatabaseFillUp } from "react-icons/bs"

type SignUpData =
  | {
      email: string
      name: string
      phone: string
      intraPhone: string
      provider: string
      id_token: string
      naUserObjectId: string
      isConfirmed: boolean
      teams: { teamId: string; confirmed: boolean; roll: string | null }[]
    }
  | null
  | undefined

const EditBranch: NextPage = () => {
  const router = useRouter()
  const {
    query: { teamId, branchId },
  } = router
  const { data: session, status } = useSession()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [teamData, setTeamData] = useState<any>(null)
  const [branchData, setBranchData] = useState<any>(null)
  const [previewData, setPreviewData] = useState<any>(null)
  const uploadKey = useRef("")

  const {
    handleSubmit,
    register,
    watch,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm()

  async function onSubmit(formData: any) {
    console.log(formData)
    // const tempFormData = { ...formData }
    const values: any = {
      ...formData,
      updatedBy: session?.user?.email,
      updatedFrom: teamId,
      branchId: branchId,
      timezoneOffset: new Date().getTimezoneOffset() * 60 * 1000,
    }

    console.log(values)

    const res = await fetch(`/api/branch/${branchId}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    if (res.status) {
      alert("시간표,설명회 데이터가 수정되었습니다. 지금 확인하시기 바랍니다.")
      // router.push(`/intra/team/${teamId}`)
    } else {
      alert("!")
    }
  }

  // useEffect(() => {
  //   if (status !== "authenticated") router.push("/intra")
  // }, [status])

  useEffect(() => {
    // if (teamId !== "" && teamId !== undefined) getTeam(teamId)
    if (teamId && branchId) {
      const _ = async () => {
        setTeamData(await getTeam(teamId))
        setBranchData(await getBranch(branchId))
      }
      _()
    }
  }, [teamId])

  useEffect(() => {
    const _ = async () => {
      for (const key in branchData) {
        // console.log(key, branchData[key])
        await setValue(key, branchData[key])
      }
    }
    _()
  }, [branchData])

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setPreviewData(value)
      // console.log(value, name, type)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  // console.log(getValues())
  // console.log(teamData)
  // console.log(branchData)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          w="100%"
          mb={5}
        >
          <Box fontSize={"2rem"} fontWeight={"900"}>
            {branchData?.branchTitle || branchId} : 시간표,설명회 관리
          </Box>

          <Button
            w="30%"
            // mt={4}
            colorScheme="red"
            isLoading={isSubmitting}
            type="submit"
            leftIcon={<BsDatabaseFillUp />}
          >
            저장
          </Button>
        </Flex>

        <Stack direction={"row"} spacing={4}>
          <Stack spacing={4} w="350px">
            <FormControl
              isInvalid={Boolean(errors.branchTitle)}
              isReadOnly={true}
            >
              <InputGroup>
                <InputLeftAddon color="#888">관명</InputLeftAddon>
                <Input
                  id="branchTitle"
                  placeholder="관명"
                  // defaultValue={branchData?.branchTitle}
                  {...register("branchTitle")}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.branchTitle && errors.branchTitle.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.brand)} isReadOnly={true}>
              <InputGroup>
                <InputLeftAddon color="#888">브랜드</InputLeftAddon>
                <Input
                  id="brand"
                  placeholder="브랜드"
                  // defaultValue={branchData?.brand}
                  {...register("brand")}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.brand && errors.brand.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.location)} isReadOnly={true}>
              <InputGroup>
                <InputLeftAddon color="#888">위치</InputLeftAddon>
                <Input
                  id="location"
                  placeholder="위치"
                  // defaultValue={branchData?.location}
                  {...register("location")}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.location && errors.location.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.area)} isReadOnly={true}>
              <InputGroup>
                <InputLeftAddon color="#888">지역</InputLeftAddon>
                <Input
                  id="area"
                  placeholder="지역"
                  // defaultValue={branchData?.area}
                  {...register("area")}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.area && errors.area.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.target)} isReadOnly={true}>
              <InputGroup>
                <InputLeftAddon color="#888">대상학년</InputLeftAddon>
                <Input
                  id="target"
                  placeholder="대상학년"
                  // defaultValue={branchData?.target}
                  {...register("target")}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.target && errors.target.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.blog)} isReadOnly={true}>
              <InputGroup>
                <InputLeftAddon color="#888">블로그</InputLeftAddon>
                <Input
                  id="blog"
                  placeholder="블로그"
                  // defaultValue={branchData?.blog}
                  {...register("blog")}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.blog && errors.blog.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <Box borderRadius={5} border={`dashed 2px red`} p={4} mt={10}>
              홈페이지 시간표, 설명회 관련 입력은
              <br />
              오른쪽을 이용해주시기 바랍니다
              <br />
              기존{" "}
              <span style={{ color: "red" }}>
                구글시트를 수정해도 적용되지 않습니다
              </span>
              <br />
              <br />
              각각의 항목 입력하고
              <br />
              오른편 <b>미리보기</b>를 통해
              <br />
              변경 내용을 미리 확인하시기 바랍니다
              <br />
              <span
                style={{
                  fontSize: "0.8rem",
                  // fontWeight: 700,
                  fontStyle: "oblique",
                }}
              >
                최대 글자수 : 제목(18), 월/월학기(5), 주제(30)
              </span>
              <br />
              <br />
              <Stack direction={"row"} alignItems={"center"}>
                <Box>이미지 업로드는</Box> <FaCloudUploadAlt />
                <Box>를 이용합니다</Box>
              </Stack>
              업로드된 이미지의 주소는 자동 입력됩니다
              <br />
              파일종류:{" "}
              <code style={{ fontSize: "0.8rem" }}>
                png, jpg, jpeg, gif, svg, webp
              </code>
              <br />
              <span
                style={{
                  fontSize: "0.8rem",
                  // fontWeight: 700,
                  fontStyle: "oblique",
                }}
              >
                업로드된 이미지는 5개월 후 자동 삭제됩니다
              </span>
              <br />
              <span
                style={{
                  color: "#555",
                  fontSize: "0.7rem",
                }}
              >
                <Link href="https://imgbb.com/" target="_blank">
                  ImgBB(https://imgbb.com/)
                </Link>
                에 이미지 파일을 업로드 후<br />
                다이렉트 링크 주소를 이미지칸에 직접 입력하셔도 됩니다
              </span>
              <br />
              <br />
              <span style={{ color: "red", fontWeight: 700 }}>
                [!!! 주의 !!!]
              </span>
              <br />
              <span
                style={{
                  backgroundColor: "red",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                &nbsp;저장&nbsp;
              </span>
              을 하지 않으면 <b>수정내용은 사라집니다</b>
              <br />
              <span
                style={{
                  backgroundColor: "red",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                &nbsp;저장&nbsp;
              </span>{" "}
              후 실제 페이지에서
              <br />
              한번더 확인하시기 바랍니다
              <Box h="2rem"></Box>
              <Link href="/" target="_blank">
                <Button colorScheme="blue" leftIcon={<ExternalLinkIcon />}>
                  GNSS.co.kr
                </Button>
              </Link>
            </Box>
          </Stack>

          <Stack>
            <Box border="solid 1px darkblue" borderRadius={5} p={1}>
              <Box w="100%" mb={5} fontSize="1.2rem" fontWeight={700}>
                대상학년 1
              </Box>
              <Stack direction={"row"} spacing={4}>
                <Stack w="350px">
                  <FormControl
                    isInvalid={Boolean(errors.target0)}
                    isReadOnly={true}
                  >
                    <InputGroup>
                      <InputLeftAddon color="#888">대상학년</InputLeftAddon>
                      <Input
                        id="target0"
                        placeholder="대상학년"
                        // defaultValue={branchData?.target0}
                        {...register("target0")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0 && errors.target0.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target0Phone)}
                    isReadOnly={true}
                  >
                    <InputGroup>
                      <InputLeftAddon color="#888">전화번호</InputLeftAddon>
                      <Input
                        id="target0Phone"
                        placeholder="전화번호"
                        // defaultValue={branchData?.target0Phone}
                        {...register("target0Phone")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0Phone &&
                        errors.target0Phone.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target0Address)}
                    isReadOnly={true}
                  >
                    <InputGroup>
                      <InputLeftAddon color="#888">주소</InputLeftAddon>
                      <Input
                        id="target0Address"
                        placeholder="주소"
                        // defaultValue={branchData?.target0Address}
                        {...register("target0Address")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0Address &&
                        errors.target0Address.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
                <Box w="350px" bgColor="lightblue" h="136px"></Box>
              </Stack>

              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                w="100%"
                bgColor="darkblue"
                color="white"
                mt={5}
                mb={2}
                // pt={5}
                // pb={2}
                padding="24px 8px 8px 4px"
              >
                <Box fontSize="1.5rem">대상학년 1 - 시간표</Box>
                {/* <Box fontWeight={700}>수정 후 저장이 필요합니다</Box> */}
                <Button
                  w="350px"
                  // mt={4}
                  colorScheme="red"
                  isLoading={isSubmitting}
                  type="submit"
                  leftIcon={<BsDatabaseFillUp />}
                >
                  저장
                </Button>
              </Flex>
              <Stack direction={"row"} spacing={4}>
                <Stack w="350px">
                  <FormControl isInvalid={Boolean(errors.target0ScheduleTitle)}>
                    <InputGroup>
                      <InputLeftAddon>제목</InputLeftAddon>
                      <Input
                        id="target0ScheduleTitle"
                        placeholder="제목"
                        // defaultValue={branchData?.target0ScheduleTitle}
                        {...register("target0ScheduleTitle", {
                          maxLength: {
                            value: 18,
                            message: "최대 길이는 18자입니다.",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleTitle &&
                        errors.target0ScheduleTitle.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0ScheduleLink)}>
                    <InputGroup>
                      <InputLeftAddon>외부링크</InputLeftAddon>
                      <Input
                        id="target0ScheduleLink"
                        placeholder="외부링크"
                        // defaultValue={branchData?.target0ScheduleLink}
                        {...register("target0ScheduleLink")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleLink &&
                        errors.target0ScheduleLink.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <Box fontSize="0.7rem" mt={-2} w="100%" textAlign={"right"}>
                    *외부잉크 입력시 링크된 페이지로 연결됩니다
                  </Box>
                  <FormControl isInvalid={Boolean(errors.target0ScheduleMonth)}>
                    <InputGroup>
                      <InputLeftAddon>월학기</InputLeftAddon>
                      <Input
                        id="target0ScheduleMonth"
                        placeholder="월학기"
                        // defaultValue={branchData?.target0ScheduleMonth}
                        {...register("target0ScheduleMonth", {
                          maxLength: {
                            value: 5,
                            message: "최대 길이는 5자입니다.",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleMonth &&
                        errors.target0ScheduleMonth.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target0CounselBooking)}
                  >
                    <InputGroup>
                      <InputLeftAddon>상담예약링크</InputLeftAddon>
                      <Input
                        id="target0CounselBooking"
                        placeholder="상담예약링크"
                        // defaultValue={branchData?.target0CounselBooking}
                        {...register("target0CounselBooking")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0CounselBooking &&
                        errors.target0CounselBooking.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={Boolean(errors.target0ScheduleHead0)}>
                    <InputGroup>
                      <InputLeftAddon>소제목1</InputLeftAddon>
                      <Input
                        id="target0ScheduleHead0"
                        placeholder="소제목1"
                        // defaultValue={branchData?.target0ScheduleHead0}
                        {...register("target0ScheduleHead0")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleHead0 &&
                        errors.target0ScheduleHead0.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target0ScheduleImage0)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지1</InputLeftAddon>
                      <Input
                        id="target0ScheduleImage0"
                        placeholder="이미지1"
                        // defaultValue={branchData?.target0ScheduleImage0}
                        {...register("target0ScheduleImage0")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0ScheduleImage0"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleImage0 &&
                        errors.target0ScheduleImage0.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0ScheduleHead1)}>
                    <InputGroup>
                      <InputLeftAddon>소제목2</InputLeftAddon>
                      <Input
                        id="target0ScheduleHead1"
                        placeholder="소제목2"
                        // defaultValue={branchData?.target0ScheduleHead1}
                        {...register("target0ScheduleHead1")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleHead1 &&
                        errors.target0ScheduleHead1.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target0ScheduleImage1)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지2</InputLeftAddon>
                      <Input
                        id="target0ScheduleImage01"
                        placeholder="이미지2"
                        // defaultValue={branchData?.target0ScheduleImage1}
                        {...register("target0ScheduleImage1")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0ScheduleImage1"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleImage1 &&
                        errors.target0ScheduleImage1.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0ScheduleHead2)}>
                    <InputGroup>
                      <InputLeftAddon>소제목3</InputLeftAddon>
                      <Input
                        id="target0ScheduleHead2"
                        placeholder="소제목3"
                        // defaultValue={branchData?.target0ScheduleHead2}
                        {...register("target0ScheduleHead2")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleHead2 &&
                        errors.target0ScheduleHead2.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target0ScheduleImage2)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지3</InputLeftAddon>
                      <Input
                        id="target0ScheduleImage2"
                        placeholder="이미지3"
                        // defaultValue={branchData?.target0ScheduleImage2}
                        {...register("target0ScheduleImage2")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0ScheduleImage2"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleImage2 &&
                        errors.target0ScheduleImage2.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0ScheduleHead3)}>
                    <InputGroup>
                      <InputLeftAddon>소제목4</InputLeftAddon>
                      <Input
                        id="target0ScheduleHead3"
                        placeholder="소제목4"
                        // defaultValue={branchData?.target0ScheduleHead3}
                        {...register("target0ScheduleHead3")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleHead3 &&
                        errors.target0ScheduleHead3.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target0ScheduleImage3)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지4</InputLeftAddon>
                      <Input
                        id="target0ScheduleImage3"
                        placeholder="이미지4"
                        // defaultValue={branchData?.target0ScheduleImage3}
                        {...register("target0ScheduleImage3")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0ScheduleImage3"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleImage3 &&
                        errors.target0ScheduleImage3.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0ScheduleHead4)}>
                    <InputGroup>
                      <InputLeftAddon>소제목5</InputLeftAddon>
                      <Input
                        id="target0ScheduleHead4"
                        placeholder="소제목5"
                        // defaultValue={branchData?.target0ScheduleHead4}
                        {...register("target0ScheduleHead4")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleHead4 &&
                        errors.target0ScheduleHead4.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target0ScheduleImage4)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지5</InputLeftAddon>
                      <Input
                        id="target0ScheduleImage4"
                        placeholder="이미지5"
                        // defaultValue={branchData?.target0ScheduleImage4}
                        {...register("target0ScheduleImage4")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0ScheduleImage4"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleImage4 &&
                        errors.target0ScheduleImage4.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0ScheduleHead5)}>
                    <InputGroup>
                      <InputLeftAddon>소제목6</InputLeftAddon>
                      <Input
                        id="target0ScheduleHead5"
                        placeholder="소제목6"
                        // defaultValue={branchData?.target0ScheduleHead5}
                        {...register("target0ScheduleHead5")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleHead5 &&
                        errors.target0ScheduleHead5.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target0ScheduleImage5)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지6</InputLeftAddon>
                      <Input
                        id="target0ScheduleImage5"
                        placeholder="이미지6"
                        // defaultValue={branchData?.target0ScheduleImage5}
                        {...register("target0ScheduleImage5")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0ScheduleImage5"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleImage5 &&
                        errors.target0ScheduleImage5.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0ScheduleHead6)}>
                    <InputGroup>
                      <InputLeftAddon>소제목7</InputLeftAddon>
                      <Input
                        id="target0ScheduleHead6"
                        placeholder="소제목7"
                        // defaultValue={branchData?.target0ScheduleHead6}
                        {...register("target0ScheduleHead6")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleHead6 &&
                        errors.target0ScheduleHead6.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target0ScheduleImage6)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지7</InputLeftAddon>
                      <Input
                        id="target0ScheduleImage6"
                        placeholder="이미지7"
                        // defaultValue={branchData?.target0ScheduleImage6}
                        {...register("target0ScheduleImage6")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0ScheduleImage6"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleImage6 &&
                        errors.target0ScheduleImage6.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0ScheduleHead7)}>
                    <InputGroup>
                      <InputLeftAddon>소제목8</InputLeftAddon>
                      <Input
                        id="target0ScheduleHead7"
                        placeholder="소제목8"
                        // defaultValue={branchData?.target0ScheduleHead7}
                        {...register("target0ScheduleHead7")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleHead7 &&
                        errors.target0ScheduleHead7.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target0ScheduleImage7)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지8</InputLeftAddon>
                      <Input
                        id="target0ScheduleImage7"
                        placeholder="이미지8"
                        // defaultValue={branchData?.target0ScheduleImage7}
                        {...register("target0ScheduleImage7")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0ScheduleImage7"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleImage7 &&
                        errors.target0ScheduleImage7.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0ScheduleHead8)}>
                    <InputGroup>
                      <InputLeftAddon>소제목9</InputLeftAddon>
                      <Input
                        id="target0ScheduleHead8"
                        placeholder="소제목9"
                        // defaultValue={branchData?.target0ScheduleHea8}
                        {...register("target0ScheduleHead8")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleHead8 &&
                        errors.target0ScheduleHead8.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target0ScheduleImage8)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지9</InputLeftAddon>
                      <Input
                        id="target0ScheduleImage8"
                        placeholder="이미지9"
                        // defaultValue={branchData?.target0ScheduleImage8}
                        {...register("target0ScheduleImage8")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0ScheduleImage8"
                            onOpen()
                          }}
                        />
                        <InputRightElement>
                          <IconButton
                            icon={<FaCloudUploadAlt />}
                            aria-label="upload"
                            onClick={() => {
                              uploadKey.current = "target0ScheduleImage8"
                              onOpen()
                            }}
                          />
                        </InputRightElement>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleImage8 &&
                        errors.target0ScheduleImage8.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0ScheduleHead9)}>
                    <InputGroup>
                      <InputLeftAddon>소제목10</InputLeftAddon>
                      <Input
                        id="target0ScheduleHead9"
                        placeholder="소제목10"
                        // defaultValue={branchData?.target0ScheduleHea9}
                        {...register("target0ScheduleHead9")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleHead9 &&
                        errors.target0ScheduleHead9.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target0ScheduleImage9)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지10</InputLeftAddon>
                      <Input
                        id="target0ScheduleImage9"
                        placeholder="이미지10"
                        // defaultValue={branchData?.target0ScheduleImage9}
                        {...register("target0ScheduleImage9")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0ScheduleImage9"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0ScheduleImage9 &&
                        errors.target0ScheduleImage9.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
                <Box
                  w="350px"
                  bgColor="lightblue"
                  h="1160px"
                  overflowY={"scroll"}
                >
                  <Box m={1}>
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Box
                        borderRadius={"10px 10px 0 0"}
                        borderTop="solid 1px black"
                        borderLeft="solid 1px black"
                        borderRight="solid 1px black"
                        p={1}
                        w="230px"
                      >
                        {previewData?.branchTitle}
                        {/* ({previewData?.target}) */}
                      </Box>
                      <Box>
                        {previewData?.target0}
                        {previewData?.target1 && `•${previewData?.target1}`}
                      </Box>
                    </Flex>
                    <Box
                      borderRadius={"0 10px 10px 10px"}
                      border="solid 1px black"
                      p={1}
                    >
                      {previewData?.target0ScheduleTitle ? (
                        <Box>
                          <CalendarIcon />
                          &nbsp;{previewData?.target0ScheduleTitle}
                        </Box>
                      ) : (
                        <Box
                          fontStyle={"oblique"}
                          fontSize="0.8rem"
                          color="grey"
                        >
                          해당 링크,페이지는 표시되지 않습니다
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Flex
                    justifyContent={"space-between"}
                    mt={4}
                    mb={4}
                    fontSize="2rem"
                    fontWeight={700}
                  >
                    <Box>{previewData?.location}관</Box>
                    <Box>{previewData?.target0ScheduleMonth}</Box>
                  </Flex>
                  <Box>{previewData?.target0ScheduleLink}</Box>
                  {/* <Box>{previewData?.target0CounselBooking}</Box> */}
                  <Box>{previewData?.target0ScheduleHead0}</Box>
                  <Image src={previewData?.target0ScheduleImage0} alt="" />
                  <Box>{previewData?.target0ScheduleHead1}</Box>
                  <Image src={previewData?.target0ScheduleImage1} alt="" />
                  <Box>{previewData?.target0ScheduleHead2}</Box>
                  <Image src={previewData?.target0ScheduleImage2} alt="" />
                  <Box>{previewData?.target0ScheduleHead3}</Box>
                  <Image src={previewData?.target0ScheduleImage3} alt="" />
                  <Box>{previewData?.target0ScheduleHead4}</Box>
                  <Image src={previewData?.target0ScheduleImage4} alt="" />
                  <Box>{previewData?.target0ScheduleHead5}</Box>
                  <Image src={previewData?.target0ScheduleImage5} alt="" />
                  <Box>{previewData?.target0ScheduleHead6}</Box>
                  <Image src={previewData?.target0ScheduleImage6} alt="" />
                  <Box>{previewData?.target0ScheduleHead7}</Box>
                  <Image src={previewData?.target0ScheduleImage7} alt="" />
                  <Box>{previewData?.target0ScheduleHead8}</Box>
                  <Image src={previewData?.target0ScheduleImage8} alt="" />
                  <Box>{previewData?.target0ScheduleHead9}</Box>
                  <Image src={previewData?.target0ScheduleImage9} alt="" />
                  {previewData?.target0CounselBooking && (
                    <Link
                      href={previewData?.target0CounselBooking}
                      target="_blank"
                    >
                      <Center w="100%" mt={4}>
                        <Button variant={"outline"}>입반테스트 예약</Button>
                      </Center>
                    </Link>
                  )}
                  <Center mt={10}>
                    <Link href={previewData?.blog} target="_blank">
                      <Button variant={"outline"}>블로그</Button>
                    </Link>
                  </Center>
                  <Flex
                    justifyContent={"space-between"}
                    fontWeight={700}
                    mt={2}
                  >
                    <Box>{previewData?.branchTitle}</Box>
                    <Box>{previewData?.target0Phone}</Box>
                  </Flex>
                </Box>
              </Stack>

              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                w="100%"
                bgColor="darkblue"
                color="white"
                mt={5}
                mb={2}
                // pt={5}
                // pb={2}
                padding="24px 8px 8px 4px"
              >
                <Box fontSize="1.5rem">대상학년 1 - 설명회</Box>
                {/* <Box fontWeight={700}>수정 후 저장이 필요합니다</Box> */}
                <Button
                  w="350px"
                  // mt={4}
                  colorScheme="red"
                  isLoading={isSubmitting}
                  type="submit"
                  leftIcon={<BsDatabaseFillUp />}
                >
                  저장
                </Button>
              </Flex>
              <Stack direction={"row"} spacing={4}>
                <Stack w="350px">
                  <FormControl isInvalid={Boolean(errors.target0KeynoteTitle)}>
                    <InputGroup>
                      <InputLeftAddon>제목</InputLeftAddon>
                      <Input
                        id="target0KeynoteTitle"
                        placeholder="제목"
                        // defaultValue={branchData?.target0KeynoteTitle}
                        {...register("target0KeynoteTitle", {
                          maxLength: {
                            value: 18,
                            message: "최대 길이는 18자입니다.",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteTitle &&
                        errors.target0KeynoteTitle.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteTopic0)}>
                    <InputGroup>
                      <InputLeftAddon>주제1</InputLeftAddon>
                      <Input
                        id="target0KeynoteTopic0"
                        placeholder="주제1"
                        {...register("target0KeynoteTopic0", {
                          maxLength: {
                            value: 30,
                            message: "최대 길이는 30자입니다.",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteTopic0 &&
                        errors.target0KeynoteTopic0.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteTopic1)}>
                    <InputGroup>
                      <InputLeftAddon>주제2</InputLeftAddon>
                      <Input
                        id="target0KeynoteTopic1"
                        placeholder="주제2"
                        {...register("target0KeynoteTopic1", {
                          maxLength: {
                            value: 30,
                            message: "최대 길이는 30자입니다.",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteTopic1 &&
                        errors.target0KeynoteTopic1.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteTopic2)}>
                    <InputGroup>
                      <InputLeftAddon>주제3</InputLeftAddon>
                      <Input
                        id="target0KeynoteTopic2"
                        placeholder="주제3"
                        {...register("target0KeynoteTopic2", {
                          maxLength: {
                            value: 30,
                            message: "최대 길이는 30자입니다.",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteTopic2 &&
                        errors.target0KeynoteTopic2.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteTopic3)}>
                    <InputGroup>
                      <InputLeftAddon>주제4</InputLeftAddon>
                      <Input
                        id="target0KeynoteTopic3"
                        placeholder="주제4"
                        {...register("target0KeynoteTopic3", {
                          maxLength: {
                            value: 30,
                            message: "최대 길이는 30자입니다.",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteTopic3 &&
                        errors.target0KeynoteTopic3.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteTopic4)}>
                    <InputGroup>
                      <InputLeftAddon>주제5</InputLeftAddon>
                      <Input
                        id="target0KeynoteTopic4"
                        placeholder="주제5"
                        {...register("target0KeynoteTopic4", {
                          maxLength: {
                            value: 30,
                            message: "최대 길이는 30자입니다.",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteTopic4 &&
                        errors.target0KeynoteTopic4.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteLink)}>
                    <InputGroup>
                      <InputLeftAddon>외부링크</InputLeftAddon>
                      <Input
                        id="target0KeynoteLink"
                        placeholder="외부링크"
                        // defaultValue={branchData?.target0KeynoteLink}
                        {...register("target0KeynoteLink")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteLink &&
                        errors.target0KeynoteLink.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <Box fontSize="0.7rem" mt={-2} w="100%" textAlign={"right"}>
                    *외부잉크 입력시 링크된 페이지로 연결됩니다
                  </Box>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteMonth)}>
                    <InputGroup>
                      <InputLeftAddon>월</InputLeftAddon>
                      <Input
                        id="target0KeynoteMonth"
                        placeholder="월"
                        // defaultValue={branchData?.target0KeynoteMonth}
                        {...register("target0KeynoteMonth")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteMonth &&
                        errors.target0KeynoteMonth.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target0KeynoteBooking)}
                  >
                    <InputGroup>
                      <InputLeftAddon>설명회예약링크</InputLeftAddon>
                      <Input
                        id="target0KeynoteBooking"
                        placeholder="설명회예약링크"
                        // defaultValue={branchData?.target0KeynoteBooking}
                        {...register("target0KeynoteBooking")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteBooking &&
                        errors.target0KeynoteBooking.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={Boolean(errors.target0KeynoteHead0)}>
                    <InputGroup>
                      <InputLeftAddon>소제목1</InputLeftAddon>
                      <Input
                        id="target0KeynoteHead0"
                        placeholder="소제목1"
                        // defaultValue={branchData?.target0KeynoteHead0}
                        {...register("target0KeynoteHead0")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteHead0 &&
                        errors.target0KeynoteHead0.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteImage0)}>
                    <InputGroup>
                      <InputLeftAddon>이미지1</InputLeftAddon>
                      <Input
                        id="target0KeynoteImage0"
                        placeholder="이미지1"
                        // defaultValue={branchData?.target0KeynoteImage0}
                        {...register("target0KeynoteImage0")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0KeynoteImage0"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteImage0 &&
                        errors.target0KeynoteImage0.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteHead1)}>
                    <InputGroup>
                      <InputLeftAddon>소제목2</InputLeftAddon>
                      <Input
                        id="target0KeynoteHead1"
                        placeholder="소제목2"
                        // defaultValue={branchData?.target0KeynoteHead1}
                        {...register("target0KeynoteHead1")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteHead1 &&
                        errors.target0KeynoteHead1.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteImage1)}>
                    <InputGroup>
                      <InputLeftAddon>이미지2</InputLeftAddon>
                      <Input
                        id="target0KeynoteImage01"
                        placeholder="이미지2"
                        // defaultValue={branchData?.target0KeynoteImage1}
                        {...register("target0KeynoteImage1")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0KeynoteImage1"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteImage1 &&
                        errors.target0KeynoteImage1.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteHead2)}>
                    <InputGroup>
                      <InputLeftAddon>소제목3</InputLeftAddon>
                      <Input
                        id="target0KeynoteHead2"
                        placeholder="소제목3"
                        // defaultValue={branchData?.target0KeynoteHead2}
                        {...register("target0KeynoteHead2")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteHead2 &&
                        errors.target0KeynoteHead2.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteImage2)}>
                    <InputGroup>
                      <InputLeftAddon>이미지3</InputLeftAddon>
                      <Input
                        id="target0KeynoteImage2"
                        placeholder="이미지3"
                        // defaultValue={branchData?.target0KeynoteImage2}
                        {...register("target0KeynoteImage2")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0KeynoteImage2"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteImage2 &&
                        errors.target0KeynoteImage2.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteHead3)}>
                    <InputGroup>
                      <InputLeftAddon>소제목4</InputLeftAddon>
                      <Input
                        id="target0KeynoteHead3"
                        placeholder="소제목4"
                        // defaultValue={branchData?.target0KeynoteHead3}
                        {...register("target0KeynoteHead3")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteHead3 &&
                        errors.target0KeynoteHead3.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteImage3)}>
                    <InputGroup>
                      <InputLeftAddon>이미지4</InputLeftAddon>
                      <Input
                        id="target0KeynoteImage3"
                        placeholder="이미지4"
                        // defaultValue={branchData?.target0KeynoteImage3}
                        {...register("target0KeynoteImage3")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0KeynoteImage3"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteImage3 &&
                        errors.target0KeynoteImage3.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteHead4)}>
                    <InputGroup>
                      <InputLeftAddon>소제목5</InputLeftAddon>
                      <Input
                        id="target0KeynoteHead4"
                        placeholder="소제목5"
                        // defaultValue={branchData?.target0KeynoteHead4}
                        {...register("target0KeynoteHead4")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteHead4 &&
                        errors.target0KeynoteHead4.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteImage4)}>
                    <InputGroup>
                      <InputLeftAddon>이미지5</InputLeftAddon>
                      <Input
                        id="target0KeynoteImage4"
                        placeholder="이미지5"
                        // defaultValue={branchData?.target0KeynoteImage4}
                        {...register("target0KeynoteImage4")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0KeynoteImage4"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteImage4 &&
                        errors.target0KeynoteImage4.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteHead5)}>
                    <InputGroup>
                      <InputLeftAddon>소제목6</InputLeftAddon>
                      <Input
                        id="target0KeynoteHead5"
                        placeholder="소제목6"
                        // defaultValue={branchData?.target0KeynoteHead5}
                        {...register("target0KeynoteHead5")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteHead5 &&
                        errors.target0KeynoteHead5.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteImage5)}>
                    <InputGroup>
                      <InputLeftAddon>이미지6</InputLeftAddon>
                      <Input
                        id="target0KeynoteImage5"
                        placeholder="이미지6"
                        // defaultValue={branchData?.target0KeynoteImage5}
                        {...register("target0KeynoteImage5")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0KeynoteImage5"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteImage5 &&
                        errors.target0KeynoteImage5.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteHead6)}>
                    <InputGroup>
                      <InputLeftAddon>소제목7</InputLeftAddon>
                      <Input
                        id="target0KeynoteHead6"
                        placeholder="소제목7"
                        // defaultValue={branchData?.target0KeynoteHead6}
                        {...register("target0KeynoteHead6")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteHead6 &&
                        errors.target0KeynoteHead6.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteImage6)}>
                    <InputGroup>
                      <InputLeftAddon>이미지7</InputLeftAddon>
                      <Input
                        id="target0KeynoteImage6"
                        placeholder="이미지7"
                        // defaultValue={branchData?.target0KeynoteImage6}
                        {...register("target0KeynoteImage6")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0KeynoteImage6"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteImage6 &&
                        errors.target0KeynoteImage6.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteHead7)}>
                    <InputGroup>
                      <InputLeftAddon>소제목8</InputLeftAddon>
                      <Input
                        id="target0KeynoteHead7"
                        placeholder="소제목8"
                        // defaultValue={branchData?.target0KeynoteHead7}
                        {...register("target0KeynoteHead7")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteHead7 &&
                        errors.target0KeynoteHead7.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteImage7)}>
                    <InputGroup>
                      <InputLeftAddon>이미지8</InputLeftAddon>
                      <Input
                        id="target0KeynoteImage7"
                        placeholder="이미지8"
                        // defaultValue={branchData?.target0KeynoteImage7}
                        {...register("target0KeynoteImage7")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0KeynoteImage7"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteImage7 &&
                        errors.target0KeynoteImage7.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteHead8)}>
                    <InputGroup>
                      <InputLeftAddon>소제목9</InputLeftAddon>
                      <Input
                        id="target0KeynoteHead8"
                        placeholder="소제목9"
                        // defaultValue={branchData?.target0KeynoteHea8}
                        {...register("target0KeynoteHead8")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteHead8 &&
                        errors.target0KeynoteHead8.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteImage8)}>
                    <InputGroup>
                      <InputLeftAddon>이미지9</InputLeftAddon>
                      <Input
                        id="target0KeynoteImage8"
                        placeholder="이미지9"
                        // defaultValue={branchData?.target0KeynoteImage8}
                        {...register("target0KeynoteImage8")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0KeynoteImage8"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteImage8 &&
                        errors.target0KeynoteImage8.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteHead9)}>
                    <InputGroup>
                      <InputLeftAddon>소제목10</InputLeftAddon>
                      <Input
                        id="target0KeynoteHead9"
                        placeholder="소제목10"
                        // defaultValue={branchData?.target0KeynoteHea9}
                        {...register("target0KeynoteHead9")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteHead9 &&
                        errors.target0KeynoteHead9.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target0KeynoteImage9)}>
                    <InputGroup>
                      <InputLeftAddon>이미지10</InputLeftAddon>
                      <Input
                        id="target0KeynoteImage9"
                        placeholder="이미지10"
                        // defaultValue={branchData?.target0KeynoteImage9}
                        {...register("target0KeynoteImage9")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target0KeynoteImage9"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target0KeynoteImage9 &&
                        errors.target0KeynoteImage9.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
                <Box
                  w="350px"
                  bgColor="lightblue"
                  h="1400px"
                  overflowY={"scroll"}
                >
                  <Box m={1}>
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Box
                        borderRadius={"10px 10px 0 0"}
                        borderTop="solid 1px black"
                        borderLeft="solid 1px black"
                        borderRight="solid 1px black"
                        p={1}
                        w="230px"
                      >
                        {previewData?.branchTitle}
                        {/* ({previewData?.target}) */}
                      </Box>
                      <Box>
                        {previewData?.target0}
                        {previewData?.target1 && `•${previewData?.target1}`}
                      </Box>
                    </Flex>
                    <Box
                      borderRadius={"0 10px 10px 10px"}
                      border="solid 1px black"
                      p={1}
                      minHeight="2rem"
                    >
                      {previewData?.target0KeynoteTitle ? (
                        <>
                          <Box>
                            <ChatIcon />
                            &nbsp;
                            {previewData?.target0KeynoteTitle}
                          </Box>
                          <Box fontSize="0.7rem">
                            <Box>{previewData?.target0KeynoteTopic0}</Box>
                            <Box>{previewData?.target0KeynoteTopic1}</Box>
                            <Box>{previewData?.target0KeynoteTopic2}</Box>
                            <Box>{previewData?.target0KeynoteTopic3}</Box>
                            <Box>{previewData?.target0KeynoteTopic4}</Box>
                          </Box>
                        </>
                      ) : (
                        <Box
                          fontStyle={"oblique"}
                          fontSize="0.8rem"
                          color="grey"
                        >
                          해당 링크,페이지는 표시되지 않습니다
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Flex
                    justifyContent={"space-between"}
                    mt={4}
                    mb={4}
                    fontSize="2rem"
                    fontWeight={700}
                  >
                    <Box>{previewData?.location}관</Box>
                    <Box>{previewData?.target0KeynoteMonth}</Box>
                  </Flex>
                  <Box>{previewData?.target0KeynoteLink}</Box>
                  <Box>{previewData?.target0KeynoteHead0}</Box>
                  <Image src={previewData?.target0KeynoteImage0} alt="" />
                  <Box>{previewData?.target0KeynoteHead1}</Box>
                  <Image src={previewData?.target0KeynoteImage1} alt="" />
                  <Box>{previewData?.target0KeynoteHead2}</Box>
                  <Image src={previewData?.target0KeynoteImage2} alt="" />
                  <Box>{previewData?.target0KeynoteHead3}</Box>
                  <Image src={previewData?.target0KeynoteImage3} alt="" />
                  <Box>{previewData?.target0KeynoteHead4}</Box>
                  <Image src={previewData?.target0KeynoteImage4} alt="" />
                  <Box>{previewData?.target0KeynoteHead5}</Box>
                  <Image src={previewData?.target0KeynoteImage5} alt="" />
                  <Box>{previewData?.target0KeynoteHead6}</Box>
                  <Image src={previewData?.target0KeynoteImage6} alt="" />
                  <Box>{previewData?.target0KeynoteHead7}</Box>
                  <Image src={previewData?.target0KeynoteImage7} alt="" />
                  <Box>{previewData?.target0KeynoteHead8}</Box>
                  <Image src={previewData?.target0KeynoteImage8} alt="" />
                  <Box>{previewData?.target0KeynoteHead9}</Box>
                  <Image src={previewData?.target0KeynoteImage9} alt="" />
                  {previewData?.target0KeynoteBooking && (
                    <Link
                      href={previewData?.target0KeynoteBooking}
                      target="_blank"
                    >
                      <Center w="100%" mt={4}>
                        <Button variant={"outline"}>설명회 예약</Button>
                      </Center>
                    </Link>
                  )}
                  <Center mt={10}>
                    <Link href={previewData?.blog} target="_blank">
                      <Button variant={"outline"}>블로그</Button>
                    </Link>
                  </Center>
                  <Flex
                    justifyContent={"space-between"}
                    fontWeight={700}
                    mt={5}
                  >
                    <Box>{previewData?.branchTitle}</Box>
                    <Box>{previewData?.target0Phone}</Box>
                  </Flex>
                </Box>
              </Stack>
            </Box>

            <Box border="solid 1px darkgreen" borderRadius={5} p={1}>
              <Box w="100%">대상학년 2</Box>
              <Stack direction={"row"} spacing={4}>
                <Stack w="350px">
                  <FormControl
                    isInvalid={Boolean(errors.target1)}
                    isReadOnly={true}
                  >
                    <InputGroup>
                      <InputLeftAddon color="#888">대상학년</InputLeftAddon>
                      <Input
                        id="target1"
                        placeholder="대상학년"
                        // defaultValue={branchData?.target1}
                        {...register("target1")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1 && errors.target1.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target1Phone)}
                    isReadOnly={true}
                  >
                    <InputGroup>
                      <InputLeftAddon color="#888">전화번호</InputLeftAddon>
                      <Input
                        id="target1Phone"
                        placeholder="전화번호"
                        // defaultValue={branchData?.target1Phone}
                        {...register("target1Phone")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1Phone &&
                        errors.target1Phone.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target1Address)}
                    isReadOnly={true}
                  >
                    <InputGroup>
                      <InputLeftAddon color="#888">주소</InputLeftAddon>
                      <Input
                        id="target1Address"
                        placeholder="주소"
                        // defaultValue={branchData?.target1Address}
                        {...register("target1Address")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1Address &&
                        errors.target1Address.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
                <Box w="350px" bgColor="lightgreen" h="136px"></Box>
              </Stack>

              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                w="100%"
                bgColor="darkgreen"
                color="white"
                mt={5}
                mb={2}
                // pt={5}
                // pb={2}
                padding="24px 8px 8px 4px"
              >
                <Box fontSize="1.5rem">대상학년 2 - 시간표</Box>
                {/* <Box fontWeight={700}>수정 후 저장이 필요합니다</Box> */}
                <Button
                  w="350px"
                  // mt={4}
                  colorScheme="red"
                  isLoading={isSubmitting}
                  type="submit"
                  leftIcon={<BsDatabaseFillUp />}
                >
                  저장
                </Button>
              </Flex>
              <Stack direction={"row"} spacing={4}>
                <Stack w="350px">
                  <FormControl isInvalid={Boolean(errors.target1ScheduleTitle)}>
                    <InputGroup>
                      <InputLeftAddon>제목</InputLeftAddon>
                      <Input
                        id="target1ScheduleTitle"
                        placeholder="제목"
                        // defaultValue={branchData?.target1ScheduleTitle}
                        {...register("target1ScheduleTitle", {
                          maxLength: {
                            value: 18,
                            message: "최대 길이는 18자입니다.",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleTitle &&
                        errors.target1ScheduleTitle.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1ScheduleLink)}>
                    <InputGroup>
                      <InputLeftAddon>외부링크</InputLeftAddon>
                      <Input
                        id="target1ScheduleLink"
                        placeholder="외부링크"
                        // defaultValue={branchData?.target1ScheduleLink}
                        {...register("target1ScheduleLink")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleLink &&
                        errors.target1ScheduleLink.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <Box fontSize="0.7rem" mt={-2} w="100%" textAlign={"right"}>
                    *외부잉크 입력시 링크된 페이지로 연결됩니다
                  </Box>
                  <FormControl isInvalid={Boolean(errors.target1ScheduleMonth)}>
                    <InputGroup>
                      <InputLeftAddon>월학기</InputLeftAddon>
                      <Input
                        id="target1ScheduleMonth"
                        placeholder="월학기"
                        // defaultValue={branchData?.target1ScheduleMonth}
                        {...register("target1ScheduleMonth", {
                          maxLength: {
                            value: 5,
                            message: "최대 길이는 5자입니다.",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleMonth &&
                        errors.target1ScheduleMonth.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target1CounselBooking)}
                  >
                    <InputGroup>
                      <InputLeftAddon>상담예약링크</InputLeftAddon>
                      <Input
                        id="target1CounselBooking"
                        placeholder="상담예약링크"
                        // defaultValue={branchData?.target1CounselBooking}
                        {...register("target1CounselBooking")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1CounselBooking &&
                        errors.target1CounselBooking.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={Boolean(errors.target1ScheduleHead0)}>
                    <InputGroup>
                      <InputLeftAddon>소제목1</InputLeftAddon>
                      <Input
                        id="target1ScheduleHead0"
                        placeholder="소제목1"
                        // defaultValue={branchData?.target1ScheduleHead0}
                        {...register("target1ScheduleHead0")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleHead0 &&
                        errors.target1ScheduleHead0.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target1ScheduleImage0)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지1</InputLeftAddon>
                      <Input
                        id="target1ScheduleImage0"
                        placeholder="이미지1"
                        // defaultValue={branchData?.target1ScheduleImage0}
                        {...register("target1ScheduleImage0")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1ScheduleImage0"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleImage0 &&
                        errors.target1ScheduleImage0.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1ScheduleHead1)}>
                    <InputGroup>
                      <InputLeftAddon>소제목2</InputLeftAddon>
                      <Input
                        id="target1ScheduleHead1"
                        placeholder="소제목2"
                        // defaultValue={branchData?.target1ScheduleHead1}
                        {...register("target1ScheduleHead1")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleHead1 &&
                        errors.target1ScheduleHead1.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target1ScheduleImage1)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지2</InputLeftAddon>
                      <Input
                        id="target1ScheduleImage01"
                        placeholder="이미지2"
                        // defaultValue={branchData?.target1ScheduleImage1}
                        {...register("target1ScheduleImage1")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1ScheduleImage1"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleImage1 &&
                        errors.target1ScheduleImage1.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1ScheduleHead2)}>
                    <InputGroup>
                      <InputLeftAddon>소제목3</InputLeftAddon>
                      <Input
                        id="target1ScheduleHead2"
                        placeholder="소제목3"
                        // defaultValue={branchData?.target1ScheduleHead2}
                        {...register("target1ScheduleHead2")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleHead2 &&
                        errors.target1ScheduleHead2.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target1ScheduleImage2)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지3</InputLeftAddon>
                      <Input
                        id="target1ScheduleImage2"
                        placeholder="이미지3"
                        // defaultValue={branchData?.target1ScheduleImage2}
                        {...register("target1ScheduleImage2")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1ScheduleImage2"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleImage2 &&
                        errors.target1ScheduleImage2.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1ScheduleHead3)}>
                    <InputGroup>
                      <InputLeftAddon>소제목4</InputLeftAddon>
                      <Input
                        id="target1ScheduleHead3"
                        placeholder="소제목4"
                        // defaultValue={branchData?.target1ScheduleHead3}
                        {...register("target1ScheduleHead3")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleHead3 &&
                        errors.target1ScheduleHead3.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target1ScheduleImage3)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지4</InputLeftAddon>
                      <Input
                        id="target1ScheduleImage3"
                        placeholder="이미지4"
                        // defaultValue={branchData?.target1ScheduleImage3}
                        {...register("target1ScheduleImage3")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1ScheduleImage3"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleImage3 &&
                        errors.target1ScheduleImage3.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1ScheduleHead4)}>
                    <InputGroup>
                      <InputLeftAddon>소제목5</InputLeftAddon>
                      <Input
                        id="target1ScheduleHead4"
                        placeholder="소제목5"
                        // defaultValue={branchData?.target1ScheduleHead4}
                        {...register("target1ScheduleHead4")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleHead4 &&
                        errors.target1ScheduleHead4.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target1ScheduleImage4)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지5</InputLeftAddon>
                      <Input
                        id="target1ScheduleImage4"
                        placeholder="이미지5"
                        // defaultValue={branchData?.target1ScheduleImage4}
                        {...register("target1ScheduleImage4")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1ScheduleImage4"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleImage4 &&
                        errors.target1ScheduleImage4.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1ScheduleHead5)}>
                    <InputGroup>
                      <InputLeftAddon>소제목6</InputLeftAddon>
                      <Input
                        id="target1ScheduleHead5"
                        placeholder="소제목6"
                        // defaultValue={branchData?.target1ScheduleHead5}
                        {...register("target1ScheduleHead5")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleHead5 &&
                        errors.target1ScheduleHead5.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target1ScheduleImage5)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지6</InputLeftAddon>
                      <Input
                        id="target1ScheduleImage5"
                        placeholder="이미지6"
                        // defaultValue={branchData?.target1ScheduleImage5}
                        {...register("target1ScheduleImage5")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1ScheduleImage5"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleImage5 &&
                        errors.target1ScheduleImage5.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1ScheduleHead6)}>
                    <InputGroup>
                      <InputLeftAddon>소제목7</InputLeftAddon>
                      <Input
                        id="target1ScheduleHead6"
                        placeholder="소제목7"
                        // defaultValue={branchData?.target1ScheduleHead6}
                        {...register("target1ScheduleHead6")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleHead6 &&
                        errors.target1ScheduleHead6.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target1ScheduleImage6)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지7</InputLeftAddon>
                      <Input
                        id="target1ScheduleImage6"
                        placeholder="이미지7"
                        // defaultValue={branchData?.target1ScheduleImage6}
                        {...register("target1ScheduleImage6")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1ScheduleImage6"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleImage6 &&
                        errors.target1ScheduleImage6.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1ScheduleHead7)}>
                    <InputGroup>
                      <InputLeftAddon>소제목8</InputLeftAddon>
                      <Input
                        id="target1ScheduleHead7"
                        placeholder="소제목8"
                        // defaultValue={branchData?.target1ScheduleHead7}
                        {...register("target1ScheduleHead7")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleHead7 &&
                        errors.target1ScheduleHead7.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target1ScheduleImage7)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지8</InputLeftAddon>
                      <Input
                        id="target1ScheduleImage7"
                        placeholder="이미지8"
                        // defaultValue={branchData?.target1ScheduleImage7}
                        {...register("target1ScheduleImage7")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1ScheduleImage7"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleImage7 &&
                        errors.target1ScheduleImage7.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1ScheduleHead8)}>
                    <InputGroup>
                      <InputLeftAddon>소제목9</InputLeftAddon>
                      <Input
                        id="target1ScheduleHead8"
                        placeholder="소제목9"
                        // defaultValue={branchData?.target1ScheduleHea8}
                        {...register("target1ScheduleHead8")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleHead8 &&
                        errors.target1ScheduleHead8.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target1ScheduleImage8)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지9</InputLeftAddon>
                      <Input
                        id="target1ScheduleImage8"
                        placeholder="이미지9"
                        // defaultValue={branchData?.target1ScheduleImage8}
                        {...register("target1ScheduleImage8")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1ScheduleImage8"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleImage8 &&
                        errors.target1ScheduleImage8.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1ScheduleHead9)}>
                    <InputGroup>
                      <InputLeftAddon>소제목10</InputLeftAddon>
                      <Input
                        id="target1ScheduleHead9"
                        placeholder="소제목10"
                        // defaultValue={branchData?.target1ScheduleHea9}
                        {...register("target1ScheduleHead9")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleHead9 &&
                        errors.target1ScheduleHead9.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target1ScheduleImage9)}
                  >
                    <InputGroup>
                      <InputLeftAddon>이미지10</InputLeftAddon>
                      <Input
                        id="target1ScheduleImage9"
                        placeholder="이미지10"
                        // defaultValue={branchData?.target1ScheduleImage9}
                        {...register("target1ScheduleImage9")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1ScheduleImage9"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1ScheduleImage9 &&
                        errors.target1ScheduleImage9.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
                <Box
                  w="350px"
                  bgColor="lightgreen"
                  h="1160px"
                  overflowY={"scroll"}
                >
                  <Box m={1}>
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Box
                        borderRadius={"10px 10px 0 0"}
                        borderTop="solid 1px black"
                        borderLeft="solid 1px black"
                        borderRight="solid 1px black"
                        p={1}
                        w="230px"
                      >
                        {previewData?.branchTitle}
                        {/* ({previewData?.target}) */}
                      </Box>
                      <Box>
                        {previewData?.target0}
                        {previewData?.target1 && `•${previewData?.target1}`}
                      </Box>
                    </Flex>
                    <Box
                      borderRadius={"0 10px 10px 10px"}
                      border="solid 1px black"
                      p={1}
                    >
                      {previewData?.target1ScheduleTitle ? (
                        <Box>
                          <CalendarIcon />
                          &nbsp;{previewData?.target1ScheduleTitle}
                        </Box>
                      ) : (
                        <Box
                          fontStyle={"oblique"}
                          fontSize="0.8rem"
                          color="grey"
                        >
                          해당 링크,페이지는 표시되지 않습니다
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Flex
                    justifyContent={"space-between"}
                    mt={4}
                    mb={4}
                    fontSize="2rem"
                    fontWeight={700}
                  >
                    <Box>{previewData?.location}관</Box>
                    <Box>{previewData?.target1ScheduleMonth}</Box>
                  </Flex>
                  <Box>{previewData?.target1ScheduleLink}</Box>
                  {/* <Box>{previewData?.target1CounselBooking}</Box> */}
                  <Box>{previewData?.target1ScheduleHead0}</Box>
                  <Image src={previewData?.target1ScheduleImage0} alt="" />
                  <Box>{previewData?.target1ScheduleHead1}</Box>
                  <Image src={previewData?.target1ScheduleImage1} alt="" />
                  <Box>{previewData?.target1ScheduleHead2}</Box>
                  <Image src={previewData?.target1ScheduleImage2} alt="" />
                  <Box>{previewData?.target1ScheduleHead3}</Box>
                  <Image src={previewData?.target1ScheduleImage3} alt="" />
                  <Box>{previewData?.target1ScheduleHead4}</Box>
                  <Image src={previewData?.target1ScheduleImage4} alt="" />
                  <Box>{previewData?.target1ScheduleHead5}</Box>
                  <Image src={previewData?.target1ScheduleImage5} alt="" />
                  <Box>{previewData?.target1ScheduleHead6}</Box>
                  <Image src={previewData?.target1ScheduleImage6} alt="" />
                  <Box>{previewData?.target1ScheduleHead7}</Box>
                  <Image src={previewData?.target1ScheduleImage7} alt="" />
                  <Box>{previewData?.target1ScheduleHead8}</Box>
                  <Image src={previewData?.target1ScheduleImage8} alt="" />
                  <Box>{previewData?.target1ScheduleHead9}</Box>
                  <Image src={previewData?.target1ScheduleImage9} alt="" />
                  {previewData?.target1CounselBooking && (
                    <Link
                      href={previewData?.target1CounselBooking}
                      target="_blank"
                    >
                      <Center w="100%" mt={4}>
                        <Button variant={"outline"}>입반테스트 예약</Button>
                      </Center>
                    </Link>
                  )}
                  <Center mt={10}>
                    <Link href={previewData?.blog} target="_blank">
                      <Button variant={"outline"}>블로그</Button>
                    </Link>
                  </Center>
                  <Flex
                    justifyContent={"space-between"}
                    fontWeight={700}
                    mt={5}
                  >
                    <Box>{previewData?.branchTitle}</Box>
                    <Box>{previewData?.target1Phone}</Box>
                  </Flex>
                </Box>
              </Stack>

              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                w="100%"
                bgColor="darkgreen"
                color="white"
                mt={5}
                mb={2}
                // pt={5}
                // pb={2}
                padding="24px 8px 8px 4px"
              >
                <Box fontSize="1.5rem">대상학년 2 - 설명회</Box>
                {/* <Box fontWeight={700}>수정 후 저장이 필요합니다</Box> */}
                <Button
                  w="350px"
                  // mt={4}
                  colorScheme="red"
                  isLoading={isSubmitting}
                  type="submit"
                  leftIcon={<BsDatabaseFillUp />}
                >
                  저장
                </Button>
              </Flex>
              <Stack direction={"row"} spacing={4}>
                <Stack w="350px">
                  <FormControl isInvalid={Boolean(errors.target1KeynoteTitle)}>
                    <InputGroup>
                      <InputLeftAddon>제목</InputLeftAddon>
                      <Input
                        id="target1KeynoteTitle"
                        placeholder="제목"
                        // defaultValue={branchData?.target1KeynoteTitle}
                        {...register("target1KeynoteTitle", {
                          maxLength: {
                            value: 18,
                            message: "최대 길이는 18자입니다.",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteTitle &&
                        errors.target1KeynoteTitle.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteTopic0)}>
                    <InputGroup>
                      <InputLeftAddon>주제1</InputLeftAddon>
                      <Input
                        id="target1KeynoteTopic0"
                        placeholder="주제1"
                        {...register("target1KeynoteTopic0", {
                          maxLength: {
                            value: 30,
                            message: "최대 길이는 30자입니다.",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteTopic0 &&
                        errors.target1KeynoteTopic0.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteTopic1)}>
                    <InputGroup>
                      <InputLeftAddon>주제2</InputLeftAddon>
                      <Input
                        id="target1KeynoteTopic1"
                        placeholder="주제2"
                        {...register("target1KeynoteTopic1", {
                          maxLength: {
                            value: 30,
                            message: "최대 길이는 30자입니다.",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteTopic1 &&
                        errors.target1KeynoteTopic1.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteTopic2)}>
                    <InputGroup>
                      <InputLeftAddon>주제3</InputLeftAddon>
                      <Input
                        id="target1KeynoteTopic2"
                        placeholder="주제3"
                        {...register("target1KeynoteTopic2", {
                          maxLength: {
                            value: 30,
                            message: "최대 길이는 30자입니다.",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteTopic2 &&
                        errors.target1KeynoteTopic2.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteTopic3)}>
                    <InputGroup>
                      <InputLeftAddon>주제4</InputLeftAddon>
                      <Input
                        id="target1KeynoteTopic3"
                        placeholder="주제4"
                        {...register("target1KeynoteTopic3", {
                          maxLength: {
                            value: 30,
                            message: "최대 길이는 30자입니다.",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteTopic3 &&
                        errors.target1KeynoteTopic3.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteTopic4)}>
                    <InputGroup>
                      <InputLeftAddon>주제5</InputLeftAddon>
                      <Input
                        id="target1KeynoteTopic4"
                        placeholder="주제5"
                        {...register("target1KeynoteTopic4", {
                          maxLength: {
                            value: 30,
                            message: "최대 길이는 30자입니다.",
                          },
                        })}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteTopic4 &&
                        errors.target1KeynoteTopic4.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteLink)}>
                    <InputGroup>
                      <InputLeftAddon>외부링크</InputLeftAddon>
                      <Input
                        id="target1KeynoteLink"
                        placeholder="외부링크"
                        // defaultValue={branchData?.target1KeynoteLink}
                        {...register("target1KeynoteLink")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteLink &&
                        errors.target1KeynoteLink.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <Box fontSize="0.7rem" mt={-2} w="100%" textAlign={"right"}>
                    *외부잉크 입력시 링크된 페이지로 연결됩니다
                  </Box>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteMonth)}>
                    <InputGroup>
                      <InputLeftAddon>월</InputLeftAddon>
                      <Input
                        id="target1KeynoteMonth"
                        placeholder="월"
                        // defaultValue={branchData?.target1KeynoteMonth}
                        {...register("target1KeynoteMonth")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteMonth &&
                        errors.target1KeynoteMonth.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={Boolean(errors.target1KeynoteBooking)}
                  >
                    <InputGroup>
                      <InputLeftAddon>설명회예약링크</InputLeftAddon>
                      <Input
                        id="target1KeynoteBooking"
                        placeholder="설명회예약링크"
                        // defaultValue={branchData?.target1KeynoteBooking}
                        {...register("target1KeynoteBooking")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteBooking &&
                        errors.target1KeynoteBooking.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={Boolean(errors.target1KeynoteHead0)}>
                    <InputGroup>
                      <InputLeftAddon>소제목1</InputLeftAddon>
                      <Input
                        id="target1KeynoteHead0"
                        placeholder="소제목1"
                        // defaultValue={branchData?.target1KeynoteHead0}
                        {...register("target1KeynoteHead0")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteHead0 &&
                        errors.target1KeynoteHead0.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteImage0)}>
                    <InputGroup>
                      <InputLeftAddon>이미지1</InputLeftAddon>
                      <Input
                        id="target1KeynoteImage0"
                        placeholder="이미지1"
                        // defaultValue={branchData?.target1KeynoteImage0}
                        {...register("target1KeynoteImage0")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1KeynoteImage0"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteImage0 &&
                        errors.target1KeynoteImage0.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteHead1)}>
                    <InputGroup>
                      <InputLeftAddon>소제목2</InputLeftAddon>
                      <Input
                        id="target1KeynoteHead1"
                        placeholder="소제목2"
                        // defaultValue={branchData?.target1KeynoteHead1}
                        {...register("target1KeynoteHead1")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteHead1 &&
                        errors.target1KeynoteHead1.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteImage1)}>
                    <InputGroup>
                      <InputLeftAddon>이미지2</InputLeftAddon>
                      <Input
                        id="target1KeynoteImage01"
                        placeholder="이미지2"
                        // defaultValue={branchData?.target1KeynoteImage1}
                        {...register("target1KeynoteImage1")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1KeynoteImage1"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteImage1 &&
                        errors.target1KeynoteImage1.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteHead2)}>
                    <InputGroup>
                      <InputLeftAddon>소제목3</InputLeftAddon>
                      <Input
                        id="target1KeynoteHead2"
                        placeholder="소제목3"
                        // defaultValue={branchData?.target1KeynoteHead2}
                        {...register("target1KeynoteHead2")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteHead2 &&
                        errors.target1KeynoteHead2.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteImage2)}>
                    <InputGroup>
                      <InputLeftAddon>이미지3</InputLeftAddon>
                      <Input
                        id="target1KeynoteImage2"
                        placeholder="이미지3"
                        // defaultValue={branchData?.target1KeynoteImage2}
                        {...register("target1KeynoteImage2")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1KeynoteImage2"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteImage2 &&
                        errors.target1KeynoteImage2.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteHead3)}>
                    <InputGroup>
                      <InputLeftAddon>소제목4</InputLeftAddon>
                      <Input
                        id="target1KeynoteHead3"
                        placeholder="소제목4"
                        // defaultValue={branchData?.target1KeynoteHead3}
                        {...register("target1KeynoteHead3")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteHead3 &&
                        errors.target1KeynoteHead3.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteImage3)}>
                    <InputGroup>
                      <InputLeftAddon>이미지4</InputLeftAddon>
                      <Input
                        id="target1KeynoteImage3"
                        placeholder="이미지4"
                        // defaultValue={branchData?.target1KeynoteImage3}
                        {...register("target1KeynoteImage3")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1KeynoteImage3"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteImage3 &&
                        errors.target1KeynoteImage3.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteHead4)}>
                    <InputGroup>
                      <InputLeftAddon>소제목5</InputLeftAddon>
                      <Input
                        id="target1KeynoteHead4"
                        placeholder="소제목5"
                        // defaultValue={branchData?.target1KeynoteHead4}
                        {...register("target1KeynoteHead4")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteHead4 &&
                        errors.target1KeynoteHead4.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteImage4)}>
                    <InputGroup>
                      <InputLeftAddon>이미지5</InputLeftAddon>
                      <Input
                        id="target1KeynoteImage4"
                        placeholder="이미지5"
                        // defaultValue={branchData?.target1KeynoteImage4}
                        {...register("target1KeynoteImage4")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1KeynoteImage4"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteImage4 &&
                        errors.target1KeynoteImage4.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteHead5)}>
                    <InputGroup>
                      <InputLeftAddon>소제목6</InputLeftAddon>
                      <Input
                        id="target1KeynoteHead5"
                        placeholder="소제목6"
                        // defaultValue={branchData?.target1KeynoteHead5}
                        {...register("target1KeynoteHead5")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteHead5 &&
                        errors.target1KeynoteHead5.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteImage5)}>
                    <InputGroup>
                      <InputLeftAddon>이미지6</InputLeftAddon>
                      <Input
                        id="target1KeynoteImage5"
                        placeholder="이미지6"
                        // defaultValue={branchData?.target1KeynoteImage5}
                        {...register("target1KeynoteImage5")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1KeynoteImage5"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteImage5 &&
                        errors.target1KeynoteImage5.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteHead6)}>
                    <InputGroup>
                      <InputLeftAddon>소제목7</InputLeftAddon>
                      <Input
                        id="target1KeynoteHead6"
                        placeholder="소제목7"
                        // defaultValue={branchData?.target1KeynoteHead6}
                        {...register("target1KeynoteHead6")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteHead6 &&
                        errors.target1KeynoteHead6.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteImage6)}>
                    <InputGroup>
                      <InputLeftAddon>이미지7</InputLeftAddon>
                      <Input
                        id="target1KeynoteImage6"
                        placeholder="이미지7"
                        // defaultValue={branchData?.target1KeynoteImage6}
                        {...register("target1KeynoteImage6")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1KeynoteImage6"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteImage6 &&
                        errors.target1KeynoteImage6.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteHead7)}>
                    <InputGroup>
                      <InputLeftAddon>소제목8</InputLeftAddon>
                      <Input
                        id="target1KeynoteHead7"
                        placeholder="소제목8"
                        // defaultValue={branchData?.target1KeynoteHead7}
                        {...register("target1KeynoteHead7")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteHead7 &&
                        errors.target1KeynoteHead7.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteImage7)}>
                    <InputGroup>
                      <InputLeftAddon>이미지8</InputLeftAddon>
                      <Input
                        id="target1KeynoteImage7"
                        placeholder="이미지8"
                        // defaultValue={branchData?.target1KeynoteImage7}
                        {...register("target1KeynoteImage7")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1KeynoteImage7"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteImage7 &&
                        errors.target1KeynoteImage7.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteHead8)}>
                    <InputGroup>
                      <InputLeftAddon>소제목9</InputLeftAddon>
                      <Input
                        id="target1KeynoteHead8"
                        placeholder="소제목9"
                        // defaultValue={branchData?.target1KeynoteHea8}
                        {...register("target1KeynoteHead8")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteHead8 &&
                        errors.target1KeynoteHead8.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteImage8)}>
                    <InputGroup>
                      <InputLeftAddon>이미지9</InputLeftAddon>
                      <Input
                        id="target1KeynoteImage8"
                        placeholder="이미지9"
                        // defaultValue={branchData?.target1KeynoteImage8}
                        {...register("target1KeynoteImage8")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1KeynoteImage8"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteImage8 &&
                        errors.target1KeynoteImage8.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteHead9)}>
                    <InputGroup>
                      <InputLeftAddon>소제목10</InputLeftAddon>
                      <Input
                        id="target1KeynoteHead9"
                        placeholder="소제목10"
                        // defaultValue={branchData?.target1KeynoteHea9}
                        {...register("target1KeynoteHead9")}
                      />
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteHead9 &&
                        errors.target1KeynoteHead9.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={Boolean(errors.target1KeynoteImage9)}>
                    <InputGroup>
                      <InputLeftAddon>이미지10</InputLeftAddon>
                      <Input
                        id="target1KeynoteImage9"
                        placeholder="이미지10"
                        // defaultValue={branchData?.target1KeynoteImage9}
                        {...register("target1KeynoteImage9")}
                      />
                      <InputRightElement>
                        <IconButton
                          icon={<FaCloudUploadAlt />}
                          aria-label="upload"
                          onClick={() => {
                            uploadKey.current = "target1KeynoteImage9"
                            onOpen()
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      {errors.target1KeynoteImage9 &&
                        errors.target1KeynoteImage9.message?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
                <Box
                  w="350px"
                  bgColor="lightgreen"
                  h="1400px"
                  overflowY={"scroll"}
                >
                  <Box m={1}>
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Box
                        borderRadius={"10px 10px 0 0"}
                        borderTop="solid 1px black"
                        borderLeft="solid 1px black"
                        borderRight="solid 1px black"
                        p={1}
                        w="230px"
                      >
                        {previewData?.branchTitle}
                        {/* ({previewData?.target}) */}
                      </Box>
                      <Box>
                        {previewData?.target0}
                        {previewData?.target1 && `•${previewData?.target1}`}
                      </Box>
                    </Flex>
                    <Box
                      borderRadius={"0 10px 10px 10px"}
                      border="solid 1px black"
                      p={1}
                      minHeight="2rem"
                    >
                      {previewData?.target1KeynoteTitle ? (
                        <>
                          <Box>
                            <ChatIcon />
                            &nbsp;
                            {previewData?.target1KeynoteTitle}
                          </Box>
                          <Box fontSize="0.7rem">
                            <Box>{previewData?.target1KeynoteTopic0}</Box>
                            <Box>{previewData?.target1KeynoteTopic1}</Box>
                            <Box>{previewData?.target1KeynoteTopic2}</Box>
                            <Box>{previewData?.target1KeynoteTopic3}</Box>
                            <Box>{previewData?.target1KeynoteTopic4}</Box>
                          </Box>
                        </>
                      ) : (
                        <Box
                          fontStyle={"oblique"}
                          fontSize="0.8rem"
                          color="grey"
                        >
                          해당 링크,페이지는 표시되지 않습니다
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Flex
                    justifyContent={"space-between"}
                    mt={4}
                    mb={4}
                    fontSize="2rem"
                    fontWeight={700}
                  >
                    <Box>{previewData?.location}관</Box>
                    <Box>{previewData?.target1KeynoteMonth}</Box>
                  </Flex>
                  {/* <Box>{previewData?.target1KeynoteTitle}</Box> */}
                  {/* <Box>{previewData?.target1KeynoteMonth}</Box> */}
                  <Box>{previewData?.target1KeynoteLink}</Box>
                  {/* <Box>{previewData?.target1KeynoteBooking}</Box> */}
                  <Box>{previewData?.target1KeynoteHead0}</Box>
                  <Image src={previewData?.target1KeynoteImage0} alt="" />
                  <Box>{previewData?.target1KeynoteHead1}</Box>
                  <Image src={previewData?.target1KeynoteImage1} alt="" />
                  <Box>{previewData?.target1KeynoteHead2}</Box>
                  <Image src={previewData?.target1KeynoteImage2} alt="" />
                  <Box>{previewData?.target1KeynoteHead3}</Box>
                  <Image src={previewData?.target1KeynoteImage3} alt="" />
                  <Box>{previewData?.target1KeynoteHead4}</Box>
                  <Image src={previewData?.target1KeynoteImage4} alt="" />
                  <Box>{previewData?.target1KeynoteHead5}</Box>
                  <Image src={previewData?.target1KeynoteImage5} alt="" />
                  <Box>{previewData?.target1KeynoteHead6}</Box>
                  <Image src={previewData?.target1KeynoteImage6} alt="" />
                  <Box>{previewData?.target1KeynoteHead7}</Box>
                  <Image src={previewData?.target1KeynoteImage7} alt="" />
                  <Box>{previewData?.target1KeynoteHead8}</Box>
                  <Image src={previewData?.target1KeynoteImage8} alt="" />
                  <Box>{previewData?.target1KeynoteHead9}</Box>
                  <Image src={previewData?.target1KeynoteImage9} alt="" />
                  {previewData?.target1KeynoteBooking && (
                    <Link
                      href={previewData?.target1KeynoteBooking}
                      target="_blank"
                    >
                      <Center w="100%" mt={4}>
                        <Button variant={"outline"}>설명회 예약</Button>
                      </Center>
                    </Link>
                  )}
                  <Center mt={10}>
                    <Link href={previewData?.blog} target="_blank">
                      <Button variant={"outline"}>블로그</Button>
                    </Link>
                  </Center>
                  <Flex
                    justifyContent={"space-between"}
                    fontWeight={700}
                    mt={5}
                  >
                    <Box>{previewData?.branchTitle}</Box>
                    <Box>{previewData?.target1Phone}</Box>
                  </Flex>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </form>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>업로드할 파일 선택</ModalHeader>
          <ModalCloseButton />
          <form>
            <ModalBody>
              {/* {uploadKey.current} */}
              <input
                type="file"
                name="cardImg"
                id="card-img--input"
                accept=".jpg, .jpeg, .png, .gif, .svg, .webp"
                // ref={imgRef}
                onChange={async (
                  e: React.ChangeEvent<{ files: FileList | null }>
                ) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const file = e.target.files[0]

                    const formData = new FormData()
                    formData.append("img", e.target.files[0])
                    formData.append("title", "title")
                    const result: AxiosResponse<{ savedFileName: string }> =
                      await axios.post("/api/upload", formData, {
                        headers: {
                          "Contest-Type": "multipart/form-data",
                        },
                      })
                    if (result) {
                      setValue(
                        uploadKey.current,
                        `/uploads/${result.data?.savedFileName}`
                      )
                      // alert("업로드 완료")

                      setTimeout(onClose, 500)
                    }
                    // console.log(result.data?.savedFileName)
                    // setImg((_pre) => file)
                  }
                }}
              ></input>
            </ModalBody>

            {/* <ModalFooter>
              <Button
                variant="outline"
                colorScheme="blue"
                mr={3}
                onClick={onClose}
              >
                취소
              </Button>
              <Button
                colorScheme="blue"
                // onClick={send}
              >
                업로드
              </Button>
            </ModalFooter> */}
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditBranch
