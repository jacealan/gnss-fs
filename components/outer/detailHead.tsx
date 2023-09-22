import { Flex, Box } from "@chakra-ui/react"
import theme from "@/components/outer/theme.json"

const space = 50

export default function DetailHead({
  branch,
  targetId,
  detail,
}: {
  branch: any
  targetId: string | any
  detail: string
}) {
  const bgColor = detail === "Schedule" ? theme.green : theme.blue

  return (
    <>
      {/* Title */}
      <Box
        w="100%"
        bgColor={bgColor}
        color={theme.white}
        padding={{ base: 0, lg: `0 ${space}px` }}
      >
        <Box w="100%" h={{ base: 0, sm: `${space}px` }} bgColor={bgColor} />
        <Flex
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent={"space-between"}
          alignItems={"flex-end"}
          padding={{
            base: `${space}px ${space / 2}px ${space / 2}px ${space / 2}px`,
            sm: `${space}px ${space}px ${space / 2}px ${space}px`,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
              height: "100%",
            }}
          >
            <Box fontSize={{ base: 15, md: 20 }} fontWeight={600}>
              {branch?.brand} 학원 {detail === "Schedule" ? "수업" : "설명회"}
              안내
            </Box>
            <Box fontSize={{ base: 25, md: 40 }} fontWeight={700}>
              {branch?.location}관&nbsp;
              {branch?.brand === "개념폴리아" &&
              branch[`target${targetId}`] !== ""
                ? `(${branch[`target${targetId}`]}) `
                : ""}
            </Box>
            <Box fontSize={{ base: 15, md: 20 }} fontWeight={300}>
              {branch?.concept}
            </Box>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-end",
            }}
          >
            <Box
              // h="95px"
              fontSize={{ base: 45, md: 70 }}
              fontWeight={700}
              // textAlign={"right"}
            >
              {branch &&
                // detail === "Schedule" &&
                branch[`target${targetId}${detail}Month`]}
              {/* {branch &&
                detail === "Keynote" &&
                branch[`target${targetId}KeynoteMonth`]} */}
              {/* {detail === "schedule" && "학기"} */}
            </Box>
            {/* <Box fontSize={{ base: 15, md: 20 }} fontWeight={300}>
              [ {branch && branch[`scheduleOpen${targetId}`]} ]
            </Box> */}
          </div>
        </Flex>
        <Box w="100%" h={`${space}px`} bgColor="white" />
      </Box>
    </>
  )
}
