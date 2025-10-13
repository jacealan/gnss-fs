import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import type { NextPage } from "next"

import { useSession } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form"

import { Box, Image, Stack } from "@chakra-ui/react"
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

const SignUp: NextPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  let sessionModified = session as typeof session & {
    user: {
      provider: string
      id_token: string
      naUserObjectId: string
    }
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  async function onSubmit(formData: any) {
    // console.log(formData)
    if (!formData.teams || formData.teams.length === 0) {
      alert("업무팀을 선택해주세요")
      return
    }
    const tempFormData = { ...formData }
    delete tempFormData.team
    const values: SignUpData = tempFormData
    values!.provider = sessionModified?.user.provider ?? ""
    values!.id_token = sessionModified?.user.id_token ?? ""
    values!.naUserObjectId = sessionModified?.user.naUserObjectId ?? ""
    values!.isConfirmed = false
    values!.teams = []
    if (values!.phone === "") {
      values!.phone = "000-0000-0000"
    }
    console.log(values)
    formData.teams.forEach((team: any) => {
      values?.teams.push({
        teamId: team,
        confirmed: false,
        roll: "",
      })
    })
    // values!.teams = [{ teamId: formData.team, confirmed: false, roll: null }]

    const res = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    if (res.status) {
      alert("근무하시는 곳의 관리자가 확인할 때까지 기다려주십시오")
      router.push("/intra")
    } else {
      alert("!")
    }
  }

  useEffect(() => {
    if (status !== "authenticated") router.push("/intra")
  }, [status])

  return (
    <>
      <Box fontSize={"2rem"} fontWeight={"900"} mb={5}>
        환영합니다
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"row"} spacing={4}>
          {/* <Image
            src={session?.user?.image ?? ""}
            alt={session?.user?.email ?? ""}
            w="48px"
            h="48px"
          /> */}
          <Stack spacing={4}>
            <FormControl isInvalid={Boolean(errors.email)} isReadOnly>
              <InputGroup>
                <InputLeftAddon>Email</InputLeftAddon>
                <Input
                  id="email"
                  placeholder="email"
                  defaultValue={session?.user?.email ?? ""}
                  {...register("email", {
                    required: "필수 입력 항목입니다",
                  })}
                  // disabled
                />
                <InputRightAddon bgColor="white">
                  <Image
                    src={session?.user?.image ?? ""}
                    alt={session?.user?.email ?? ""}
                    // w="48px"
                    h={"2rem"}
                    borderRadius={"24px"}
                  />
                </InputRightAddon>
              </InputGroup>
              <FormErrorMessage>
                {errors.email && errors.email.message?.toString()}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.name)} isRequired>
              <InputGroup>
                <InputLeftAddon>이름</InputLeftAddon>
                <Input
                  id="name"
                  placeholder="이름"
                  defaultValue={session?.user?.name ?? ""}
                  {...register("name", {
                    required: "필수 입력 항목입니다",
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

            <FormControl isInvalid={Boolean(errors.phone)}>
              <InputGroup>
                <InputLeftAddon>핸드폰</InputLeftAddon>
                <Input
                  id="phone"
                  placeholder="010-1234-5678"
                  {...register("phone", {
                    minLength: {
                      value: 13,
                      message: "010-1234-5678 형식으로 입력바랍니다",
                    },
                    maxLength: {
                      value: 13,
                      message: "010-1234-5678 형식으로 입력바랍니다",
                    },
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.phone && errors.phone.message?.toString()}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.intraPhone)}>
              <InputGroup>
                <InputLeftAddon>내선번호</InputLeftAddon>
                <Input
                  id="intraPhone"
                  placeholder="1234"
                  {...register("intraPhone", {
                    required: "내선번호가 없으면 ----를 입력해주세요",
                    minLength: {
                      value: 4,
                      message: "내선번호가 4자리수입니다.",
                    },
                    maxLength: {
                      value: 4,
                      message: "내선번호가 4자리수입니다",
                    },
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.intraPhone && errors.intraPhone.message?.toString()}
              </FormErrorMessage>
            </FormControl>

            <Button
              // mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
          <Box border="solid 1px #eee" borderRadius={4} p={2}>
            <Box>업무팀은 어디신가요?</Box>
            <CheckboxGroup>
              <Checkbox value="SsDc" {...register("teams")} m={3}>
                개념상상 대치관
              </Checkbox>
              <Checkbox value="SPAk" {...register("teams")} m={3}>
                개념폴리아 압구정관
              </Checkbox>
              <Checkbox value="PlCd" {...register("teams")} m={3}>
                개념폴리아 삼성청담관
              </Checkbox>
              <Checkbox value="SsMd" {...register("teams")} m={3}>
                개념상상 의대관
              </Checkbox>
              <Checkbox value="PlDc" {...register("teams")} m={3}>
                개념폴리아 대치관
              </Checkbox>
              <hr />
              <Checkbox value="SPSc" {...register("teams")} m={3}>
                개념폴리아 서초관
              </Checkbox>
              <Checkbox value="SsSc" {...register("teams")} m={3}>
                개념상상 서초관
              </Checkbox>
              <Checkbox value="PlBb" {...register("teams")} m={3}>
                개념폴리아 방배관
              </Checkbox>
              <hr />
              <Checkbox value="SPJs" {...register("teams")} m={3}>
                개념상상/개념폴리아 잠실관
              </Checkbox>
              {/* <Checkbox value="SciJs" {...register("teams")} m={3}>
                개념상상 과학몰(잠실)
              </Checkbox> */}
              {/* <Checkbox value="LbJs" {...register("teams")} m={3}>
                개념상상 독한공부
              </Checkbox> */}
              <hr />
              <Checkbox value="PlPc" {...register("teams")} m={3}>
                개념폴리아 평촌관
              </Checkbox>
              <Checkbox value="PlSj" {...register("teams")} m={3}>
                개념폴리아 수지관
              </Checkbox>
              <Checkbox value="PlDt" {...register("teams")} m={3}>
                개념폴리아 남동탄관
              </Checkbox>
              <Checkbox value="PlDs" {...register("teams")} m={3}>
                개념폴리아 다산관
              </Checkbox>
              <Checkbox value="PlSd" {...register("teams")} m={3}>
                개념폴리아 송도관
              </Checkbox>
              <hr />
              <Checkbox value="gnBiz" {...register("teams")} m={3}>
                학원사업부
              </Checkbox>
              <Checkbox value="gnGa" {...register("teams")} m={3}>
                경영지원부
              </Checkbox>
              {/* <Checkbox value="gnChief" {...register("teams")} m={3}>
                대표단
              </Checkbox> */}
            </CheckboxGroup>

            {/* <RadioGroup>
              <Radio value="SsDc" {...register("team")} m={3}>
                개념상상 대치관
              </Radio>
            </RadioGroup> */}
          </Box>
        </Stack>
      </form>
    </>
  )
}

export default SignUp
