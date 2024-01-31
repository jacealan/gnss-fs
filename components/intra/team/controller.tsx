import React, { useState, useEffect } from "react"
import branchesIdTitle from "@/lib/branchesIdTitle"

import colors from "@/theme/colors"
import { Box, Grid, GridItem, Flex } from "@chakra-ui/react"
import { Button, ButtonGroup, Image } from "@chakra-ui/react"

import {
  EditIcon,
  CheckCircleIcon,
  ChatIcon,
  CalendarIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons"
import { BsPerson, BsFileEarmarkSpreadsheet } from "react-icons/bs"
import { FaBlogger, FaGoogleDrive } from "react-icons/fa"
import { IoIosImages } from "react-icons/io"
import { SiNaver, SiNotion } from "react-icons/si"
import {
  TbSquareRoundedNumber1Filled,
  TbSquareRoundedNumber2Filled,
  TbSquareRoundedNumber3Filled,
  TbSquareRoundedNumber4Filled,
} from "react-icons/tb"

const joins: string[] = ["PlBb", "PlSd", "PlSj"]

export default function Controller({
  teamData,
  teamId,
}: {
  teamData: any
  teamId: string | string[]
}) {
  const [branches, setBranches] = useState<any>(null)

  useEffect(() => {
    const _ = async () => {
      // setTeams(await teamsIdTitle())
      // setUsers(await usersEmailName())
      setBranches(await branchesIdTitle())
    }
    _()
  }, [])

  return (
    <>
      <Box
        width="350px"
        p={"8px"}
        mt={4}
        // bgColor={colors.primary}
        borderRadius={5}
      >
        <Grid templateColumns={"1fr"} gap={2}>
          <GridItem>
            <Box
              justifyContent={"space-between"}
              alignItems={"center"}
              w="100%"
              color={colors.grey}
              fontWeight={700}
              borderBottom={`solid 1px ${colors.grey}`}
              // mb={4}
            >
              입학테스트 성적 분석
            </Box>
          </GridItem>
          <GridItem>
            <Flex
              justifyContent={"space-between"}
              flexGrow={"1"}
              w="100%"
              gap={1}
              bgColor={colors.blue0}
            >
              {teamData?.applyElementSheet && (
                <Box w="100%">
                  <a href={`${teamData?.applyElementSheet}`} target="_blank">
                    <Button
                      w="100%"
                      bgColor="white"
                      border={`solid 1px ${colors.blue1}`}
                      borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                      leftIcon={<EditIcon />}
                    >
                      초등학생
                    </Button>
                  </a>
                </Box>
              )}
              {teamData?.applyMiddleSheet && (
                <Box w="100%">
                  <a href={`${teamData?.applyMiddleSheet}`} target="_blank">
                    <Button
                      w="100%"
                      bgColor="white"
                      border={`solid 1px ${colors.blue1}`}
                      borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                      leftIcon={<EditIcon />}
                    >
                      중학생
                    </Button>
                  </a>
                </Box>
              )}
              {teamData?.applyHighSheet && (
                <Box w="100%">
                  <a href={`${teamData?.applyHighSheet}`} target="_blank">
                    <Button
                      w="100%"
                      bgColor="white"
                      border={`solid 1px ${colors.blue1}`}
                      borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                      leftIcon={<EditIcon />}
                    >
                      고등학생
                    </Button>
                  </a>
                </Box>
              )}
            </Flex>
          </GridItem>
          {/* {teamData?.applyMiddleSheet && (
            <GridItem>
              <a href={`${teamData?.applyElementSheet}`} target="_blank">
                <Button w="100%" colorScheme="orange" leftIcon={<EditIcon />}>
                  입반테스트(초등) 분석
                </Button>
              </a>
            </GridItem>
          )}
          {teamData?.applyMiddleSheet && (
            <GridItem>
              <a href={`${teamData?.applyMiddleSheet}`} target="_blank">
                <Button w="100%" colorScheme="blue" leftIcon={<EditIcon />}>
                  입반테스트(중등) 분석
                </Button>
              </a>
            </GridItem>
          )} */}
          {/* {teamData?.applyReserveSheet && (
            <GridItem>
              <ButtonGroup w="100%">
                <Box w="40%">
                  <a href={`${teamData?.applyReserveSheet}`} target="_blank">
                    <Button
                      w="100%"
                      colorScheme="purple"
                      leftIcon={<CalendarIcon />}
                    >
                      입반테스트
                    </Button>
                  </a>
                </Box>
                <Box w="30%">
                  <a href={`${teamData?.applyReserve}`} target="_blank">
                    <Button
                      w="100%"
                      colorScheme="purple"
                      variant={"outline"}
                      leftIcon={<CheckCircleIcon />}
                    >
                      입력
                    </Button>
                  </a>
                </Box>
                <Box w="30%">
                  <a href={`${teamData?.applyReserveForm}`} target="_blank">
                    <Button
                      w="100%"
                      colorScheme="purple"
                      leftIcon={<EditIcon />}
                    >
                      폼수정
                    </Button>
                  </a>
                </Box>
              </ButtonGroup>
            </GridItem>
          )} */}
          <GridItem>
            <Box
              justifyContent={"space-between"}
              alignItems={"center"}
              w="100%"
              color={colors.grey}
              fontWeight={700}
              borderBottom={`solid 1px ${colors.grey}`}
              mt={2}
            >
              설명회 예약관리
            </Box>
          </GridItem>
          {teamData?.keynoteReserveSheet && (
            <GridItem>
              <ButtonGroup
                w="100%"
                bgColor={colors.blue0}
                border={`solid 1px ${colors.blue1}`}
                borderRadius={"4px"}
              >
                <Box w="60%">
                  <a href={`${teamData?.keynoteReserveSheet}`} target="_blank">
                    <Button
                      w="100%"
                      bgColor="white"
                      // border={`solid 1px ${colors.blue1}`}
                      // borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/listCheck.svg" w="16px" />
                        <Box ml={2}>설명회 예약 현황</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
                <Box w="20%">
                  <a href={`${teamData?.keynoteReserve}`} target="_blank">
                    <Button
                      // w="100%"
                      bgColor={colors.blue0}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/write.svg" w="16px" />
                        <Box>입력</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
                <Box w="20%">
                  <a href={`${teamData?.keynoteReserveForm}`} target="_blank">
                    <Button
                      // w="100%"
                      bgColor={colors.blue0}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/settings.svg" w="16px" />
                        <Box>수정</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
              </ButtonGroup>
            </GridItem>
          )}
          {teamData?.keynoteElementReserveSheet && (
            <GridItem>
              <ButtonGroup
                w="100%"
                bgColor={colors.blue0}
                border={`solid 1px ${colors.blue1}`}
                borderRadius={"4px"}
              >
                <Box w="60%">
                  <a
                    href={`${teamData?.keynoteElementReserveSheet}`}
                    target="_blank"
                  >
                    <Button
                      w="100%"
                      bgColor="white"
                      // border={`solid 1px ${colors.blue1}`}
                      // borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/listCheck.svg" w="16px" />
                        <Box ml={2}>초등부 설명회 예약 현황</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
                <Box w="20%">
                  <a
                    href={`${teamData?.keynoteElementReserve}`}
                    target="_blank"
                  >
                    <Button
                      // w="100%"
                      bgColor={colors.blue0}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/write.svg" w="16px" />
                        <Box>입력</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
                <Box w="20%">
                  <a
                    href={`${teamData?.keynoteElementReserveForm}`}
                    target="_blank"
                  >
                    <Button
                      // w="100%"
                      bgColor={colors.blue0}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/settings.svg" w="16px" />
                        <Box>수정</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
              </ButtonGroup>
            </GridItem>
          )}
          {teamData?.keynoteMiddleReserveSheet && (
            <GridItem>
              <ButtonGroup
                w="100%"
                bgColor={colors.blue0}
                border={`solid 1px ${colors.blue1}`}
                borderRadius={"4px"}
              >
                <Box w="60%">
                  <a
                    href={`${teamData?.keynoteMiddleReserveSheet}`}
                    target="_blank"
                  >
                    <Button
                      w="100%"
                      bgColor="white"
                      // border={`solid 1px ${colors.blue1}`}
                      // borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/listCheck.svg" w="16px" />
                        <Box ml={2}>중등부 설명회 예약 현황</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
                <Box w="20%">
                  <a href={`${teamData?.keynoteMiddleReserve}`} target="_blank">
                    <Button
                      // w="100%"
                      bgColor={colors.blue0}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/write.svg" w="16px" />
                        <Box>입력</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
                <Box w="20%">
                  <a
                    href={`${teamData?.keynoteMiddleReserveForm}`}
                    target="_blank"
                  >
                    <Button
                      // w="100%"
                      bgColor={colors.blue0}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/settings.svg" w="16px" />
                        <Box>수정</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
              </ButtonGroup>
            </GridItem>
          )}
          {teamData?.keynoteHighReserveSheet && (
            <GridItem>
              <ButtonGroup
                w="100%"
                bgColor={colors.blue0}
                border={`solid 1px ${colors.blue1}`}
                borderRadius={"4px"}
              >
                <Box w="60%">
                  <a
                    href={`${teamData?.keynoteHighReserveSheet}`}
                    target="_blank"
                  >
                    <Button
                      w="100%"
                      bgColor="white"
                      // border={`solid 1px ${colors.blue1}`}
                      // borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/listCheck.svg" w="16px" />
                        <Box ml={2}>고등부 설명회 예약 현황</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
                <Box w="20%">
                  <a href={`${teamData?.keynoteHighReserve}`} target="_blank">
                    <Button
                      // w="100%"
                      bgColor={colors.blue0}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/write.svg" w="16px" />
                        <Box>입력</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
                <Box w="20%">
                  <a
                    href={`${teamData?.keynoteHighReserveForm}`}
                    target="_blank"
                  >
                    <Button
                      // w="100%"
                      bgColor={colors.blue0}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/settings.svg" w="16px" />
                        <Box>수정</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
              </ButtonGroup>
            </GridItem>
          )}
          {teamData?.keynoteScienceReserveSheet && (
            <GridItem>
              <ButtonGroup
                w="100%"
                bgColor={colors.blue0}
                border={`solid 1px ${colors.blue1}`}
                borderRadius={"4px"}
              >
                <Box w="60%">
                  <a
                    href={`${teamData?.keynoteScienceReserveSheet}`}
                    target="_blank"
                  >
                    <Button
                      w="100%"
                      bgColor="white"
                      // border={`solid 1px ${colors.blue1}`}
                      // borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/listCheck.svg" w="16px" />
                        <Box ml={2}>과학부 설명회 예약 현황</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
                <Box w="20%">
                  <a
                    href={`${teamData?.keynoteScienceReserve}`}
                    target="_blank"
                  >
                    <Button
                      // w="100%"
                      bgColor={colors.blue0}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/write.svg" w="16px" />
                        <Box>입력</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
                <Box w="20%">
                  <a
                    href={`${teamData?.keynoteScienceReserveForm}`}
                    target="_blank"
                  >
                    <Button
                      // w="100%"
                      bgColor={colors.blue0}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/settings.svg" w="16px" />
                        <Box>수정</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
              </ButtonGroup>
            </GridItem>
          )}
          {/* <GridItem>
            {teamData?.branches.map(
              (branch: any, index: number) => branch.branchId
            )}
          </GridItem> */}
          <GridItem>
            <Box
              justifyContent={"space-between"}
              alignItems={"center"}
              w="100%"
              color={colors.grey}
              fontWeight={700}
              borderBottom={`solid 1px ${colors.grey}`}
              mt={2}
            >
              온라인 홍보 관리
            </Box>
          </GridItem>
          {teamData?.branches.length !== 0 && (
            <GridItem>
              <ButtonGroup w="100%">
                {teamData?.branches.map((branch: any, index: number) => (
                  <Box w="100%" key={index}>
                    <a
                      href={`/intra/team/${teamId}/${branch.branchId}/edit`}
                      target="_blank"
                    >
                      <Button
                        // leftIcon={<BsFileEarmarkSpreadsheet />}
                        // colorScheme="pink"
                        w="100%"
                        bgColor="white"
                        border={`solid 1px ${colors.blue1}`}
                        borderRadius={"4px"}
                        // fontSize="14px"
                        fontWeight={400}
                        _hover={{ fontWeight: 700 }}
                        fontSize={
                          teamData?.branches.length > 2 ? "0.7rem" : "1rem"
                        }
                      >
                        <Flex
                          justifyContent={"center"}
                          alignItems={"center"}
                          // w="100%"
                        >
                          <Image src="/assets/icons/board.png" w="20px" />
                          <Box ml={1}>
                            {branches &&
                              branches[branch.branchId].split(" ")[0]}
                          </Box>
                        </Flex>
                        {/* {branches && branches[branch.branchId].split(" ")[0]} */}
                      </Button>
                    </a>
                  </Box>
                ))}
              </ButtonGroup>
            </GridItem>
          )}

          <GridItem>
            {teamData?.blog ? (
              <a href={`${teamData?.blog}`} target="_blank">
                <Button
                  w="100%"
                  bgColor="white"
                  border={`solid 1px ${colors.blue1}`}
                  borderRadius={"4px"}
                  fontSize="14px"
                  fontWeight={400}
                  _hover={{ fontWeight: 700 }}
                >
                  <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    w="100%"
                  >
                    <Image
                      src="/assets/icons/blog.png"
                      alignItems={"center"}
                      w="20px"
                    />
                    <Box ml={2}>블로그</Box>
                  </Flex>
                </Button>
              </a>
            ) : (
              <>
                <Grid templateColumns={"1fr 1fr 1fr"} gap={2}>
                  <GridItem>
                    <a href={`${teamData?.blogElement}`} target="_blank">
                      <Button
                        w="100%"
                        bgColor="white"
                        border={`solid 1px ${colors.blue1}`}
                        borderRadius={"4px"}
                        fontSize="14px"
                        fontWeight={400}
                        _hover={{ fontWeight: 700 }}
                      >
                        <Flex
                          justifyContent={"center"}
                          alignItems={"center"}
                          w="100%"
                        >
                          <Image src="/assets/icons/blog.png" w="20px" />
                          <Box ml={2}>초•중등</Box>
                        </Flex>
                      </Button>
                    </a>
                  </GridItem>
                  <GridItem>
                    <a href={`${teamData?.blogHigh}`} target="_blank">
                      <Button
                        w="100%"
                        bgColor="white"
                        border={`solid 1px ${colors.blue1}`}
                        borderRadius={"4px"}
                        fontSize="14px"
                        fontWeight={400}
                        _hover={{ fontWeight: 700 }}
                      >
                        <Flex
                          justifyContent={"center"}
                          alignItems={"center"}
                          w="100%"
                        >
                          <Image src="/assets/icons/blog.png" w="20px" />
                          <Box ml={2}>고등</Box>
                        </Flex>
                      </Button>
                    </a>
                  </GridItem>
                  <GridItem>
                    <a href={`${teamData?.blogScience}`} target="_blank">
                      <Button
                        w="100%"
                        bgColor="white"
                        border={`solid 1px ${colors.blue1}`}
                        borderRadius={"4px"}
                        fontSize="14px"
                        fontWeight={400}
                        _hover={{ fontWeight: 700 }}
                      >
                        <Flex
                          justifyContent={"center"}
                          alignItems={"center"}
                          w="100%"
                        >
                          <Image src="/assets/icons/blog.png" w="20px" />
                          <Box ml={2}>과학</Box>
                        </Flex>
                      </Button>
                    </a>
                  </GridItem>
                </Grid>
              </>
            )}
          </GridItem>

          <GridItem>
            <Box
              justifyContent={"space-between"}
              alignItems={"center"}
              w="100%"
              color={colors.grey}
              fontWeight={700}
              borderBottom={`solid 1px ${colors.grey}`}
              mt={2}
              // mb={4}
            >
              교재/물품 주문, 업무 요청(학원사업부)
            </Box>
          </GridItem>
          <GridItem>
            <Flex
              justifyContent={"space-between"}
              flexGrow={"1"}
              w="100%"
              gap={1}
              bgColor={colors.blue0}
            >
              {teamData?.order && (
                <Box w="100%">
                  <a href={`${teamData?.order}`} target="_blank">
                    <Button
                      w="100%"
                      bgColor="white"
                      border={`solid 1px ${colors.blue1}`}
                      borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/orderBook.png" w="20px" />
                        <Box ml={2}>{teamData?.title} 주문서</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
              )}
              {teamData?.orderElement && (
                <Box w="100%">
                  <a href={`${teamData?.orderElement}`} target="_blank">
                    <Button
                      w="100%"
                      bgColor="white"
                      border={`solid 1px ${colors.blue1}`}
                      borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/orderBook.png" w="20px" />
                        <Box ml={2}>주문서(초)</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
              )}
              {teamData?.orderMiddle && (
                <Box w="100%">
                  <a href={`${teamData?.orderMiddle}`} target="_blank">
                    <Button
                      w="100%"
                      bgColor="white"
                      border={`solid 1px ${colors.blue1}`}
                      borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/orderBook.png" w="20px" />
                        <Box ml={2}>주문서(중)</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
              )}
              {teamData?.orderHigh && (
                <Box w="100%">
                  <a href={`${teamData?.orderHigh}`} target="_blank">
                    <Button
                      w="100%"
                      bgColor="white"
                      border={`solid 1px ${colors.blue1}`}
                      borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/orderBook.png" w="20px" />
                        <Box ml={2}>주문서(고)</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
              )}
            </Flex>
          </GridItem>
          <GridItem>
            <Flex
              justifyContent={"space-between"}
              flexGrow={"1"}
              w="100%"
              gap={1}
              bgColor={colors.blue0}
            >
              {teamData?.orderDesign && (
                <Box w="100%">
                  <a href={`${teamData?.orderDesign}`} target="_blank">
                    <Button
                      w="100%"
                      bgColor="white"
                      border={`solid 1px ${colors.blue1}`}
                      borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/orderDesign.png" w="20px" />
                        <Box ml={2}>{teamData?.title} 요청서</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
              )}
              {teamData?.orderDesignElement && (
                <Box w="100%">
                  <a href={`${teamData?.orderDesignElement}`} target="_blank">
                    <Button
                      w="100%"
                      bgColor="white"
                      border={`solid 1px ${colors.blue1}`}
                      borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/orderDesign.png" w="20px" />
                        <Box ml={2}>요청서(초)</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
              )}
              {teamData?.orderDesignMiddle && (
                <Box w="100%">
                  <a href={`${teamData?.orderDesignMiddle}`} target="_blank">
                    <Button
                      w="100%"
                      bgColor="white"
                      border={`solid 1px ${colors.blue1}`}
                      borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/orderDesign.png" w="20px" />
                        <Box ml={2}>요청서(중)</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
              )}
              {teamData?.orderDesignHigh && (
                <Box w="100%">
                  <a href={`${teamData?.orderDesignHigh}`} target="_blank">
                    <Button
                      w="100%"
                      bgColor="white"
                      border={`solid 1px ${colors.blue1}`}
                      borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/orderDesign.png" w="20px" />
                        <Box ml={2}>요청서(고)</Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
              )}
            </Flex>
          </GridItem>

          <GridItem>
            <Box
              justifyContent={"space-between"}
              alignItems={"center"}
              w="100%"
              color={colors.grey}
              fontWeight={700}
              borderBottom={`solid 1px ${colors.grey}`}
              mt={2}
            >
              웹클라우드
            </Box>
          </GridItem>
          <GridItem bgColor={colors.blue0}>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              flexGrow={"1"}
              w="100%"
              gap={1}
              bgColor={colors.blue0}
              mb={2}
            >
              <Box w="100%">
                <a href={`${teamData?.gdriveFolder}`} target="_blank">
                  <Button
                    w="100%"
                    bgColor="white"
                    border={`solid 1px ${colors.blue1}`}
                    borderRadius={"4px"}
                    fontSize="14px"
                    fontWeight={400}
                    _hover={{ fontWeight: 700 }}
                  >
                    <Flex
                      justifyContent={"center"}
                      alignItems={"center"}
                      w="100%"
                    >
                      <Image src="/assets/icons/edubiz.png" w="20px" />
                      <Box ml={1} fontSize="0.8rem">
                        학원사업부
                      </Box>
                    </Flex>
                  </Button>
                </a>
              </Box>
              {joins.includes(typeof teamId === "string" ? teamId : "") || (
                <Box w="100%">
                  <a href={`${teamData?.gdriveFolderGa}`} target="_blank">
                    <Button
                      w="100%"
                      bgColor="white"
                      border={`solid 1px ${colors.blue1}`}
                      borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/gdrive.svg" w="20px" />
                        <Box ml={1} fontSize="0.8rem">
                          경영지원부
                        </Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
              )}
              {teamData?.gdriveFolderGaSc && (
                <Box w="100%">
                  <a href={`${teamData?.gdriveFolderGaSc}`} target="_blank">
                    <Button
                      w="100%"
                      bgColor="white"
                      border={`solid 1px ${colors.blue1}`}
                      borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/gdrive.svg" w="20px" />
                        <Box ml={1} fontSize="0.8rem">
                          경영지원부
                          <span style={{ fontSize: "0.6rem" }}>(과학)</span>
                        </Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
              )}
            </Flex>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              flexGrow={"1"}
              w="100%"
              gap={1}
              bgColor={colors.blue0}
              mb={2}
            >
              {teamData?.notionPage && (
                <Box w="100%">
                  <a href={`${teamData?.notionPage}`} target="_blank">
                    <Button
                      w="100%"
                      bgColor="white"
                      border={`solid 1px ${colors.blue1}`}
                      borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/notion.svg" w="20px" />

                        <Box ml={1} fontSize="0.8rem">
                          노션자료실
                        </Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
              )}
              {teamData?.worklog && (
                <Box w="100%">
                  <a href={teamData?.worklog} target="_blank">
                    <Button
                      w="100%"
                      bgColor="white"
                      border={`solid 1px ${colors.blue1}`}
                      borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/worklog.png" w="20px" />

                        <Box ml={1} fontSize="0.8rem">
                          근무일지
                        </Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
              )}
              {teamData?.worklogSci && (
                <Box w="100%">
                  <a href={teamData?.worklogSci} target="_blank">
                    <Button
                      w="100%"
                      bgColor="white"
                      border={`solid 1px ${colors.blue1}`}
                      borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/worklog.png" w="20px" />
                        <Box ml={1} fontSize="0.8rem">
                          근무일지
                          <span style={{ fontSize: "0.6rem" }}>(과학)</span>
                        </Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
              )}
            </Flex>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              flexGrow={"1"}
              w="100%"
              gap={1}
              bgColor={colors.blue0}
              mb={2}
            >
              <Box w="100%">
                <a
                  href={`https://www.youtube.com/channel/UCwgew-iQxiOL1_XeYG0Tn0A`}
                  target="_blank"
                >
                  <Button
                    w="100%"
                    bgColor="white"
                    border={`solid 1px ${colors.blue1}`}
                    borderRadius={"4px"}
                    fontSize="14px"
                    fontWeight={400}
                    _hover={{ fontWeight: 700 }}
                  >
                    <Flex
                      justifyContent={"center"}
                      alignItems={"center"}
                      w="100%"
                    >
                      <Image src="/assets/icons/youtube.svg" w="20px" />
                      <Box ml={1} fontSize="0.8rem">
                        개상TV
                      </Box>
                    </Flex>
                  </Button>
                </a>
              </Box>
              {teamData?.mockTest && (
                <Box w="100%">
                  <a href={`${teamData?.mockTest}`} target="_blank">
                    <Button
                      w="100%"
                      bgColor="white"
                      border={`solid 1px ${colors.blue1}`}
                      borderRadius={"4px"}
                      fontSize="14px"
                      fontWeight={400}
                      _hover={{ fontWeight: 700 }}
                    >
                      <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        w="100%"
                      >
                        <Image src="/assets/icons/mockTest.png" w="20px" />
                        <Box ml={1} fontSize="0.8rem">
                          전국연합모의고사
                        </Box>
                      </Flex>
                    </Button>
                  </a>
                </Box>
              )}
            </Flex>
          </GridItem>

          {teamData?.quickLinks?.length > 0 && (
            <>
              <GridItem>
                <Box
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  w="100%"
                  color={colors.grey}
                  fontWeight={700}
                  borderBottom={`solid 1px ${colors.grey}`}
                  mt={2}
                >
                  퀵링크
                </Box>
              </GridItem>
              <GridItem>
                <Grid templateColumns={"1fr 1fr"} gap={1}>
                  {teamData?.quickLinks.map((quickLink: any, index: number) => (
                    <GridItem key={index}>
                      <a href={quickLink.link} target="_blank">
                        <Button
                          key={index}
                          mb={1}
                          w="100%"
                          bgColor="white"
                          border={`solid 1px ${colors.blue1}`}
                          borderRadius={"4px"}
                          fontSize="14px"
                          fontWeight={400}
                          _hover={{ fontWeight: 700 }}
                          leftIcon={
                            index === 0 ? (
                              <TbSquareRoundedNumber1Filled />
                            ) : index === 1 ? (
                              <TbSquareRoundedNumber2Filled />
                            ) : index === 2 ? (
                              <TbSquareRoundedNumber3Filled />
                            ) : (
                              <TbSquareRoundedNumber4Filled />
                            )
                          }
                        >
                          {quickLink.title}
                        </Button>
                      </a>
                    </GridItem>
                  ))}
                </Grid>
              </GridItem>
            </>
          )}
        </Grid>
        {/* <Box width="100%" textAlign={"right"}>
          <EditIcon />
        </Box> */}
      </Box>
    </>
  )
}
