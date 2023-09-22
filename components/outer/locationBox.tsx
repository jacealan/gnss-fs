import { useRealViewport } from "next-real-viewport"
import { Flex, Grid, GridItem, Box } from "@chakra-ui/react"

import theme from "@/components/outer/theme.json"
import locations from "@/components/outer/locations.json"
import BranchBox from "./branchBox"

export default function LocationBox() {
  return (
    <>
      {locations.map((element: any, index: number) => (
        <div key={index} style={{ width: "100%" }}>
          <Flex w="100%" padding={"20px 0 0 10px"}>
            <Box
              borderBottom={`solid 2px ${theme.red}`}
              color={theme.black}
              fontSize={18}
              fontWeight={600}
              padding={"0 50px 5px 5px"}
              margin={"20px 0 20px 0"}
            >
              {element.location}
            </Box>
          </Flex>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              // lg: "repeat(3, 1fr)",
            }}
            gap={6}
            w="100%"
            padding={2}
          >
            {element.branchIds.map((branchId: any, index: number) => (
              <GridItem key={index}>
                <BranchBox
                  branchId={branchId}
                  branchColor={index % 2 ? theme.blue : theme.red}
                />
              </GridItem>
            ))}
          </Grid>
        </div>
      ))}
    </>
  )
}
