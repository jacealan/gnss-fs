import { Grid, GridItem, Divider, Center, Box } from "@chakra-ui/react";

export default function BranchListTitle() {
  return (
    <>
      <Grid
        templateColumns="1fr 350px 1fr"
        w="100%"
        // width={{ base: "100%", lg: "992px" }}
        alignItems={"center"}
        pt={10}
      >
        <GridItem>
          <Divider borderTop="solid 1px black" />
        </GridItem>
        <GridItem>
          <Center fontSize={"22px"}>개념상상 / 개념폴리아 지점별 소식</Center>
          <Box height={1} />
          <Center fontSize={"13px"} fontWeight={300} pb={5}>
            학원별 시간표 및 공지사항을 확인하실 수 있습니다
          </Center>
        </GridItem>
        <GridItem>
          <Divider borderTop="solid 1px black" />
        </GridItem>
      </Grid>
    </>
  );
}
