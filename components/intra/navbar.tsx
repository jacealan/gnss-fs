import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import dbConnect from "@/lib/mongooseConnect"
import Team from "@/models/team"

import Link from "next/link"
// import Image from "next/image"
import LogInOut from "./loginout"
import NaverSearch from "./team/naverSearch"

import colors from "@/theme/colors"
import { Box, Grid, GridItem, Flex, Stack, Image } from "@chakra-ui/react"

export default function NavBar({ teams }: { teams: any }) {
  const router = useRouter()
  const {
    query: { teamId },
  } = router

  return (
    <>
      <Grid
        templateColumns={"3fr 6fr 3fr"}
        alignItems={"center"}
        p={"5px 40px 5px 40px"}
        bgColor={colors.primary}
        // bgImage={"/assets/images/bg/topbarBg01Christmas.png"}
        bgSize={"contain"}
        w="100%"
      >
        <GridItem>
          <Flex direction={"row"} alignItems={"center"}>
            <Link href="/intra" target="_blank">
              <Box bgColor={colors.primary}>
                <Image src="/assets/logos/logo.png" w="23px" h="40px" />
              </Box>
            </Link>
            <Box
              ml="10px"
              fontWeight={700}
              fontSize="18px"
              bgColor={colors.primary}
            >
              {teams && teamId ? (
                <Link href={`/intra/team/${teamId}`}>
                  {teams[teamId.toString()]}
                </Link>
              ) : (
                `개념상상/개념폴리아`
              )}
            </Box>
          </Flex>
        </GridItem>
        <GridItem>
          <NaverSearch />
        </GridItem>
        <GridItem>
          <LogInOut />
        </GridItem>
      </Grid>
    </>
  )
}
