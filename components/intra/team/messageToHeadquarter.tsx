import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { useSession } from "next-auth/react"
import { useForm, SubmitHandler } from "react-hook-form"
import moment from "moment-timezone"

import usersEmailName from "@/lib/usersEmailName"

import colors from "@/theme/colors"
import { Box, Image, Badge, Flex, Grid, GridItem } from "@chakra-ui/react"
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
  Textarea,
} from "@chakra-ui/react"
import {
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react"
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"

const joins: string[] = ["PlBb", "PlSd", "PlSj", "PlDt", "PlDs"]

export default function MessageToHeadquarter() {
  const router = useRouter()
  const {
    query: { teamId },
  } = router
  // const teamId: string= router.query.teamId
  const { data: session, status } = useSession()
  const { isOpen, onToggle } = useDisclosure()
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOpen,
    onClose: drawerClose,
  } = useDisclosure()
  const [messageTo, setMessageTo] = useState("")
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState<any>(null)

  async function onSubmit(formData: any) {
    if (formData.message === "") {
      onToggle()
      return
    }

    const values = {
      createdBy: session?.user?.email,
      createdFrom: teamId,
      toTeamId: messageTo,
      message: formData.message,
      timezoneOffset: new Date().getTimezoneOffset() * 60 * 1000,
    }

    const res = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    if (res.status) {
      alert(`${messageTo}에 \"${values.message}\" 메세지를 보냈습니다`)
      setMessageTo("")
      reset()
      onToggle()
    }
  }

  useEffect(() => {
    const getMessages = async () => {
      if (teamId) {
        const res =
          teamId === "gnBiz"
            ? await fetch("/api/message/all")
            : await fetch(`/api/message/${teamId}/from`)
        const resData = await res.json()
        setMessages(resData.data)
      }
      // console.log(messages)
    }

    getMessages()
  }, [onToggle, drawerIsOpen, teamId])

  useEffect(() => {
    const _ = async () => {
      setUsers(await usersEmailName())
    }
    _()
  }, [])

  return (
    <>
      <Grid
        alignItems={"center"}
        templateColumns={"134px 106px 106px"}
        gap="1px"
      >
        <GridItem>
          <Button
            w="100%"
            // colorScheme="green"
            fontSize="13px"
            fontWeight={700}
            textAlign={"center"}
            color="white"
            bgColor={colors.blue2}
            border={`solid 1px ${colors.blue1}`}
            borderRadius={"4px 0 0 4px"}
            _hover={{ bgColor: colors.blue21 }}
            onClick={drawerOpen}
          >
            메시지(to본부)
          </Button>
        </GridItem>
        <GridItem
          gridColumnStart={2}
          gridColumnEnd={
            joins.includes(typeof teamId === "string" ? teamId : "") ? 4 : 3
          }
        >
          <Button
            borderRadius={
              joins.includes(typeof teamId === "string" ? teamId : "")
                ? "0 4px 4px 0"
                : "0"
            }
            onClick={() => {
              if (isOpen) {
                if (messageTo === "gnBiz") {
                  setMessageTo("")
                  onToggle()
                } else {
                  setMessageTo("gnBiz")
                }
              } else {
                setMessageTo("gnBiz")
                onToggle()
              }
            }}
            w="100%"
            // colorScheme="green"
            fontSize="13px"
            fontWeight={messageTo === "gnBiz" ? 700 : 400}
            textAlign={"center"}
            color={messageTo === "gnBiz" ? "white" : "black"}
            bgColor={messageTo === "gnBiz" ? colors.blue2 : "white"}
            border={`solid 1px ${colors.blue1}`}
            _hover={{
              bgColor: messageTo === "gnBiz" ? colors.blue21 : "lightgrey",
            }}
            // variant={messageTo === "gnBiz" ? "solid" : "outline"}
          >
            학원사업부
          </Button>
        </GridItem>
        {joins.includes(typeof teamId === "string" ? teamId : "") || (
          <GridItem>
            <Button
              borderRadius={"0 4px 4px 0"}
              onClick={() => {
                if (isOpen) {
                  if (messageTo === "gnGa") {
                    setMessageTo("")
                    onToggle()
                  } else {
                    setMessageTo("gnGa")
                  }
                } else {
                  setMessageTo("gnGa")
                  onToggle()
                }
              }}
              w="100%"
              // colorScheme="green"
              fontSize="13px"
              fontWeight={messageTo === "gnGa" ? 700 : 400}
              textAlign={"center"}
              color={messageTo === "gnGa" ? "white" : "black"}
              bgColor={messageTo === "gnGa" ? colors.blue2 : "white"}
              border={`solid 1px ${colors.blue1}`}
              _hover={{
                bgColor: messageTo === "gnGa" ? colors.blue21 : "lightgrey",
              }}
            >
              경영지원부
            </Button>
          </GridItem>
        )}
      </Grid>
      <Collapse in={isOpen} animateOpacity>
        <Box h={2} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={Boolean(errors.name)}>
            <Textarea
              borderRadius={"10px 10px 0 0"}
              h={120}
              placeholder={`${
                messageTo === "gnBiz"
                  ? "제목(20자이내)\n내용...\n---\n학원사업부       gnedu.biz@gmail.com\n김민수 7001 배정민 7002 이은수 7003"
                  : "제목(20자이내)\n내용...\n---\n경영지원부\n박미효 6015 황창용 6014 박세화 6016"
              }`}
              size="sm"
              resize="none"
              maxLength={2000}
              {...register("message")}
            />
            <FormErrorMessage>
              {errors.message && errors.message.message?.toString()}
            </FormErrorMessage>
          </FormControl>
          <Button
            borderRadius={"0 0 10px 10px"}
            w="100%"
            // colorScheme="teal"
            bgColor={colors.blue2}
            color="white"
            isLoading={isSubmitting}
            type="submit"
          >
            <Box>
              <Box fontSize="0.5rem">
                보낸 메세지는 <b>삭제/수정</b>이 안됩니다
              </Box>
              {messageTo === "gnBiz" ? "학원사업부에" : "경영지원부에"} 보내기
            </Box>
          </Button>
        </form>
      </Collapse>

      <Drawer
        isOpen={drawerIsOpen}
        placement="right"
        onClose={drawerClose}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader> 메시지 목록</DrawerHeader>

          <DrawerBody>
            {messages.map((messageObj: any, index: number) => (
              <>
                <Box
                  border={`solid 1px ${colors.primary}`}
                  p={3}
                  borderRadius={10}
                  mb={2}
                >
                  <Box>
                    {messageObj.message.split("\n").map((line: string) => (
                      <>
                        {line}
                        <br />
                      </>
                    ))}
                  </Box>
                  <Box>
                    <Badge>
                      {users && users[messageObj.createdBy]}
                      {/* {messageObj.createdBy.split("@")[0]} */}
                    </Badge>
                    →
                    <Badge>
                      {messageObj.toTeamId === "gnBiz"
                        ? "학원사업부"
                        : "경영지원부"}
                    </Badge>
                    <span style={{ fontSize: "0.7rem" }}>
                      {moment(messageObj.createdAt)
                        .tz("Asia/Seoul")
                        .format("YYYY-MM-DD HH:mm")}
                    </span>
                  </Box>
                </Box>
              </>
            ))}
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant="outline" mr={3} onClick={drawerClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  )
}
