import { useState, useEffect } from "react"
import Link from "next/link"

import theme from "@/components/outer/theme.json"
// import branches from "@/components/outer/branches.json"
// import getBranch from "@/lib/getBranch"
import branchesIdTitle from "@/lib/branchesIdTitle"

import { Image, Box, Flex, Center } from "@chakra-ui/react"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Portal,
  IconButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react"
import { ChevronDownIcon, HamburgerIcon, PhoneIcon } from "@chakra-ui/icons"

export default function Nav() {
  // const menuList = Object.keys(branches)
  const menuList = [
    "SsDc",
    "PlDc",
    "SsMd",
    "SPAk",
    "PlCd",
    "SsSc",
    "PlSc",
    "ScSc",
    "PlBb",
    "SsJs",
    "PlJs",
    "ScJs",
    "LbJs",
    "PlPc",
    "PlSd",
    "PlSj",
  ]

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
    <Box
      width="100%"
      backgroundColor={theme.white}
      color={theme.black}
      boxShadow={
        "0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
      }
      position="fixed"
      top={0}
      zIndex={1000}
    >
      <Center padding={2}>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={{ base: "5px 5px 5px 5px", lg: "5px 20px 5px 20px" }}
          width={{ base: "100%", lg: "992px" }}
        >
          <Link href="/#" className="link">
            <Flex alignItems={"Center"} fontWeight={1000}>
              <Image src={`/assets/logos/logoTitle.png`} height={8} />
            </Flex>
          </Link>
          <Flex alignItems={"Center"}>
            <Menu
            //  isOpen={isOpen}
            >
              {/* <button
                type="button"
                className="chakra-button chakra-menu__menu-button css-70r8au"
                id="menu-button-:r2:"
                aria-expanded="false"
                aria-haspopup="menu"
                aria-controls="menu-list-:r2:"
              >
                <span className="css-xl71ch">지점안내</span>
                <span className="chakra-button__icon css-1hzyiq5">
                  <svg
                    viewBox="0 0 24 24"
                    focusable="false"
                    className="chakra-icon css-onkibi"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                    ></path>
                  </svg>
                </span>
              </button> */}
              <MenuButton
                as={Button}
                variant="outline"
                colorScheme="grey"
                rightIcon={<ChevronDownIcon />}
                fontSize={12}
                padding={3}
              >
                지점안내
              </MenuButton>
              {/* <Portal> */}
              <MenuList
                zIndex={10}
                //  onMouseLeave={onClose}
              >
                {menuList.map((branchId, index) => (
                  <MenuItem key={index}>
                    <Link href={`/#${branchId}`}>
                      {branches && branches[branchId as keyof typeof branches]}
                    </Link>
                  </MenuItem>
                ))}
              </MenuList>
              {/* </Portal> */}
            </Menu>
          </Flex>
        </Flex>
      </Center>

      {/* <style jsx="true">{`
            .link,
            .link:hover,
            .link:visited,
            .link:active {
              text-decoration: none;
              color: inherit;
            }
          `}</style> */}
    </Box>
  )
}
