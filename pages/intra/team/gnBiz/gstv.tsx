import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/router"
import type { NextPage } from "next"
import axios, { AxiosResponse } from "axios"

// import getTeam from "@/lib/getTeam"
// import getBranch from "@/lib/getBranch"
import getGstv from "@/lib/getGstv"

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
  Grid,
  GridItem,
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

// type SignUpData =
//   | {
//       email: string
//       name: string
//       phone: string
//       intraPhone: string
//       provider: string
//       id_token: string
//       naUserObjectId: string
//       isConfirmed: boolean
//       teams: { teamId: string; confirmed: boolean; roll: string | null }[]
//     }
//   | null
//   | undefined

function youtubeId(src: string) {
  if (src.includes("https://youtu.be/"))
    // console.log("embed", src.substring(30, 41))
    return src.substring(17, 28)

  if (src.includes("https://www.youtube.com/embed/"))
    // console.log("embed", src.substring(30, 41))
    return src.substring(30, 41)

  if (src.includes("https://www.youtube.com/watch?")) {
    const indexOfV = src.indexOf("v=")
    // console.log("watch", src.substring(indexOfV + 2, indexOfV + 13))
    return src.substring(indexOfV + 2, indexOfV + 13)
  }
}

const GsTv: NextPage = () => {
  const router = useRouter()
  const {
    query: { teamId, branchId },
  } = router
  const { data: session, status } = useSession()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [gstvData, setGstvData] = useState<any>(null)
  // const [teamData, setTeamData] = useState<any>(null)
  // const [branchData, setBranchData] = useState<any>(null)
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
    // console.log(formData)
    // const tempFormData = { ...formData }
    const values: any = {
      ...formData,
      timezoneOffset: new Date().getTimezoneOffset() * 60 * 1000,
    }

    // console.log(values)

    const res = await fetch(`/api/gstv/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    if (res.status) {
      alert("개상TV 리스트가 수정되었습니다. 지금 확인하시기 바랍니다.")
      // router.push(`/intra/team/${teamId}`)
    } else {
      alert("!")
    }
  }

  // useEffect(() => {
  //   if (status !== "authenticated") router.push("/intra")
  // }, [status])

  const _ = async () => {
    await setValue("gstv1", gstvData && gstvData[0] ? gstvData[0].link : "")
    await setValue("gstv2", gstvData && gstvData[1] ? gstvData[1].link : "")
    await setValue("gstv3", gstvData && gstvData[2] ? gstvData[2].link : "")
    await setValue("gstv4", gstvData && gstvData[3] ? gstvData[3].link : "")
    await setValue("gstv5", gstvData && gstvData[4] ? gstvData[4].link : "")
    await setValue("gstv6", gstvData && gstvData[5] ? gstvData[5].link : "")
  }

  const __ = async () => {
    await setGstvData(await getGstv())
    await _()
  }

  useEffect(() => {
    __()
  }, [])

  useEffect(() => {
    _()
  }, [gstvData])

  // Callback version of watch.  It's your responsibility to unsubscribe when done.
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setPreviewData(value)
      // console.log(value, name, type)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  if (status == "authenticated") {
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
              개상TV on GNSS.co.kr
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

          {/* <Stack direction={"row"} spacing={4}>
            <Stack spacing={4} w="350px"> */}
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 464px)" }}
            gap={6}
            w="100%"
            padding={2}
          >
            <GridItem>
              <FormControl
                isInvalid={Boolean(errors.gstv1)}
                // isReadOnly={true}
              >
                <InputGroup>
                  <InputLeftAddon color="#888">no. 1</InputLeftAddon>
                  <Input
                    id="gstv1"
                    placeholder="no. 1"
                    defaultValue={
                      gstvData && (gstvData[0] ? gstvData[0].link : "")
                    }
                    {...register("gstv1")}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.gstv1 && errors.gstv1.message?.toString()}
                </FormErrorMessage>
                {previewData && previewData.gstv1 && (
                  <iframe
                    width="464"
                    height="261"
                    src={`https://www.youtube.com/embed/${youtubeId(
                      previewData.gstv1
                    )}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl
                isInvalid={Boolean(errors.gstv2)}
                // isReadOnly={true}
              >
                <InputGroup>
                  <InputLeftAddon color="#888">no. 2</InputLeftAddon>
                  <Input
                    id="gstv2"
                    placeholder="no. 2"
                    defaultValue={
                      gstvData && (gstvData[1] ? gstvData[1].link : "")
                    }
                    {...register("gstv2")}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.gstv2 && errors.gstv2.message?.toString()}
                </FormErrorMessage>
                {previewData && previewData.gstv2 && (
                  <iframe
                    width="464"
                    height="261"
                    src={`https://www.youtube.com/embed/${youtubeId(
                      previewData.gstv2
                    )}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl
                isInvalid={Boolean(errors.gstv3)}
                // isReadOnly={true}
              >
                <InputGroup>
                  <InputLeftAddon color="#888">no. 3</InputLeftAddon>
                  <Input
                    id="gstv3"
                    placeholder="no. 3"
                    defaultValue={
                      gstvData && (gstvData[2] ? gstvData[2].link : "")
                    }
                    {...register("gstv3")}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.gstv3 && errors.gstv3.message?.toString()}
                </FormErrorMessage>
                {previewData && previewData.gstv3 && (
                  <iframe
                    width="464"
                    height="261"
                    src={`https://www.youtube.com/embed/${youtubeId(
                      previewData.gstv3
                    )}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl
                isInvalid={Boolean(errors.gstv4)}
                // isReadOnly={true}
              >
                <InputGroup>
                  <InputLeftAddon color="#888">no. 4</InputLeftAddon>
                  <Input
                    id="gstv4"
                    placeholder="no. 4"
                    defaultValue={
                      gstvData && (gstvData[3] ? gstvData[3].link : "")
                    }
                    {...register("gstv4")}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.gstv4 && errors.gstv4.message?.toString()}
                </FormErrorMessage>
                {previewData && previewData.gstv4 && (
                  <iframe
                    width="464"
                    height="261"
                    src={`https://www.youtube.com/embed/${youtubeId(
                      previewData.gstv4
                    )}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl
                isInvalid={Boolean(errors.gstv5)}
                // isReadOnly={true}
              >
                <InputGroup>
                  <InputLeftAddon color="#888">no. 5</InputLeftAddon>
                  <Input
                    id="gstv5"
                    placeholder="no. 5"
                    defaultValue={
                      gstvData && (gstvData[4] ? gstvData[4].link : "")
                    }
                    {...register("gstv5")}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.gstv5 && errors.gstv5.message?.toString()}
                </FormErrorMessage>
                {previewData && previewData.gstv5 && (
                  <iframe
                    width="464"
                    height="261"
                    src={`https://www.youtube.com/embed/${youtubeId(
                      previewData.gstv5
                    )}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                )}
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl
                isInvalid={Boolean(errors.gstv6)}
                // isReadOnly={true}
              >
                <InputGroup>
                  <InputLeftAddon color="#888">no. 6</InputLeftAddon>
                  <Input
                    id="gstv6"
                    placeholder="no. 6"
                    defaultValue={
                      gstvData && (gstvData[5] ? gstvData[5].link : "")
                    }
                    {...register("gstv6")}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.gstv6 && errors.gstv6.message?.toString()}
                </FormErrorMessage>
                {previewData && previewData.gstv6 && (
                  <iframe
                    width="464"
                    height="261"
                    src={`https://www.youtube.com/embed/${youtubeId(
                      previewData.gstv6
                    )}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                )}
              </FormControl>
            </GridItem>
          </Grid>
        </form>
      </>
    )
  }
}

export default GsTv
