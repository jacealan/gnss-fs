import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import teamsIdTitle from "@/lib/teamsIdTitle"
import usersEmailName from "@/lib/usersEmailName"
import branchesIdTitle from "@/lib/branchesIdTitle"

import NavBar from "@/components/intra/navbar"
import BottomBar from "@/components/intra/bottombar"

import { Box, Center } from "@chakra-ui/react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [teams, setTeams] = useState<any>(null)
  const [users, setUsers] = useState<any>(null)
  const [branches, setBranches] = useState<any>(null)

  useEffect(() => {
    const _ = async () => {
      setTeams(await teamsIdTitle())
      setUsers(await usersEmailName())
      setBranches(await branchesIdTitle())
    }
    _()
  }, [])

  // console.log(users)
  // console.log(router.pathname)
  if (router.pathname.substring(1, 6) === "intra") {
    return (
      <>
        <NavBar teams={teams} />
        <Center w="100%">
          {router.pathname === "/intra" ? (
            <Box w="100%" border="solid 0px #ccc">
              {children}
            </Box>
          ) : (
            <Box w="1080px" maxWidth="1080px" border="solid 0px #ccc" mt={3}>
              {children}
            </Box>
          )}
        </Center>
        {router.pathname === "/intra" && <Box h="150px" />}
        <BottomBar teams={teams} />
      </>
    )
  }
  return (
    <>
      <Box>{children}</Box>
    </>
  )
}
