import { Grid, GridItem, Divider, Center } from "@chakra-ui/react"
import theme from "@/components/outer/theme.json"

const space = 50

export default function DetailTitle({
  branch,
  targetId,
  detail,
}: {
  branch: any
  targetId: string | any
  detail: string
}) {
  return (
    <>
      <Grid
        templateColumns={{ base: "1fr 250px 1fr", sm: "1fr 350px 1fr" }}
        w="100%"
        padding={{
          base: 0,
          // sm: `0 ${space / 2}px`,
          md: `0 ${space}px`,
          lg: `0 ${space * 2}px`,
        }}
        alignItems={"center"}
      >
        <GridItem>
          <Divider borderTop="solid 1px black" />
        </GridItem>
        <GridItem>
          <Center fontSize="24px" fontWeight={600}>
            {branch?.brand} {branch?.location}관&nbsp;
            {branch?.brand === "개념폴리아"
              ? `${branch[`target${targetId}`]} `
              : ""}
            {/* {detail === "schedule" ? "시간표" : "설명회"} */}
          </Center>
        </GridItem>
        <GridItem>
          <Divider borderTop="solid 1px black" />
        </GridItem>
      </Grid>
    </>
  )
}
