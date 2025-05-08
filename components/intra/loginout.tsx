import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form"

import colors from "@/theme/colors"
import { Box, Flex, Image, Button, useDisclosure } from "@chakra-ui/react"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

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
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react"

/**
 * LogInOut component
 * @returns React.ReactNode
 */
export default function LogInOut() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [name, setName] = useState("")
  const [intraPhone, setIntraPhone] = useState("")

  const { onOpen, onClose, isOpen } = useDisclosure()
  const firstFieldRef = useRef(null)

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm()

  const isUser = async () => {
    try {
      const res = await fetch("/api/user/ismember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session?.user?.email }),
      })
      const resData = await res.json()

      if (resData.success) {
        await setName(resData.data.name)
        await setIntraPhone(resData.data.intraPhone)
        // router.push("/intra/team/gnBiz")
        await setValue("name", resData.data.name)
        await setValue("intraPhone", resData.data.intraPhone)
        await setValue("phone", resData.data.phone)
      } else {
        router.push("/intra/user/signup")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  useEffect(() => {
    if (status === "loading") return
    if (status === "authenticated") {
      setName(session?.user?.name ?? "")
      isUser()
    } else {
      // signOut()
      router.push("/intra")
    }
  }, [status])

  async function onSubmit(formData: any) {
    const values = { ...formData }
    console.log(values)

    const res = await fetch("/api/user/changeNameIntraPhone", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    if (res.status) {
      isUser()
      onClose()
    } else {
      alert("오류 발생")
    }
  }

  return (
    <>
      <Flex w="100%" justifyContent={"flex-end"}>
        {!session && (
          <Link
            href="/api/auth/signin"
            onClick={(e) => {
              e.preventDefault()
              signIn()
            }}
          >
            <Box
              color={colors.accents}
              border={`solid 1px ${colors.accents}`}
              p="0 10px 0 10px"
              borderRadius={10}
              ml="auto"
              bgColor={colors.primary}
            >
              로그인
            </Box>
          </Link>
        )}
        {session && (
          <Flex alignItems={"center"} gap={2}>
            {/* <Image src={session.user?.image ?? ""} h="2rem" borderRadius={10} /> */}
            <Box bgColor={colors.primary}>
              <Popover
                isOpen={isOpen}
                initialFocusRef={firstFieldRef}
                onOpen={onOpen}
                onClose={onClose}
                placement="top"
                closeOnBlur={false}
              >
                <PopoverTrigger>
                  <Flex justifyContent={"flex-end"} alignItems={"center"}>
                    <Image
                      src={session.user?.image ?? ""}
                      alt="user"
                      h="34px"
                      borderRadius={20}
                    />
                    <Box>&nbsp;{name ?? session.user?.email} |</Box>
                  </Flex>
                </PopoverTrigger>
                <PopoverContent p={5}>
                  <PopoverArrow />
                  {/* <PopoverCloseButton /> */}

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isReadOnly>
                      <InputGroup>
                        <InputLeftAddon>Email</InputLeftAddon>
                        <Input
                          id="email"
                          defaultValue={session.user?.email ?? ""}
                          {...register("email")}
                        />
                      </InputGroup>
                    </FormControl>
                    <Box h={2} />
                    <FormControl isInvalid={Boolean(errors.name)} isRequired>
                      <InputGroup>
                        <InputLeftAddon>이름</InputLeftAddon>
                        <Input
                          id="name"
                          placeholder="이름"
                          // defaultValue={name ?? ""}
                          {...register("name", {
                            // required: "필수 입력 항목입니다",
                            minLength: {
                              value: 2,
                              message: "이름의 길이는 2자 이상입니다",
                            },
                            maxLength: {
                              value: 20,
                              message: "이름의 최대 길이는 20자입니다.",
                            },
                          })}
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {errors.name && errors.name.message?.toString()}
                      </FormErrorMessage>
                    </FormControl>
                    <Box h={2} />
                    <FormControl isInvalid={Boolean(errors.intraPhone)}>
                      <InputGroup>
                        <InputLeftAddon>내선번호</InputLeftAddon>
                        <Input
                          id="intraPhone"
                          // placeholder="1234"
                          // defaultValue={intraPhone}
                          {...register("intraPhone", {
                            // required: "내선번호가 없으면 ----를 입력해주세요",
                            minLength: {
                              value: 4,
                              message: "내선번호가 4자리수입니다",
                            },
                            maxLength: {
                              value: 4,
                              message: "내선번호가 4자리수입니다",
                            },
                          })}
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {errors.intraPhone &&
                          errors.intraPhone.message?.toString()}
                      </FormErrorMessage>
                    </FormControl>
                    <Box h={2} />
                    <FormControl isInvalid={Boolean(errors.phone)}>
                      <InputGroup>
                        <InputLeftAddon>핸드폰번호</InputLeftAddon>
                        <Input
                          id="phone"
                          // placeholder="1234"
                          // defaultValue={phone}
                          {...register("phone", {
                            // required: "내선번호가 없으면 ----를 입력해주세요",
                            minLength: {
                              value: 13,
                              message: "핸드폰번호는 010-0000-0000 형식입니다",
                            },
                            maxLength: {
                              value: 13,
                              message: "핸드폰번호는 010-0000-0000 형식입니다",
                            },
                          })}
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {errors.phone && errors.phone.message?.toString()}
                      </FormErrorMessage>
                    </FormControl>

                    <Flex justifyContent={"flex-end"} gap={2} mt={2}>
                      <Button
                        onClick={() => {
                          isUser()
                          onClose()
                        }}
                      >
                        취소
                      </Button>
                      <Button
                        // mt={4}
                        colorScheme="teal"
                        isLoading={isSubmitting}
                        type="submit"
                      >
                        수정
                      </Button>
                    </Flex>
                  </form>
                </PopoverContent>
              </Popover>
            </Box>
            <Link
              href="/api/auth/signout"
              onClick={(e) => {
                e.preventDefault()
                signOut()
                // router.push("/intra")
              }}
            >
              <Box bgColor={colors.primary}>로그아웃</Box>
            </Link>
          </Flex>
        )}
      </Flex>
    </>
  )
}
