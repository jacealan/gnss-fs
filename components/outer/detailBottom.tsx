import { Flex, Box } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import theme from "@/components/outer/theme.json"

const space = 50

export default function DetailBottom({
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
      {/* Blog */}
      <Box
        margin="50px 0 10px 0"
        padding={"5px 40px"}
        borderRadius={20}
        border={`solid 2px ${bgColor}`}
      >
        <a href={branch?.blog} target="_blank" rel="noreferrer">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Box>
              {branch?.brand} {branch?.location}관 방문하기&nbsp;
            </Box>
            <ExternalLinkIcon />
          </div>
        </a>
      </Box>

      {/* Phone */}
      <Box
        w="100%"
        padding={{
          base: `${space}px ${space / 2}px 20px ${space / 2}px`,
          md: `${space}px ${space}px 20px ${space}px`,
          lg: `${space}px ${space * 2}px 20px ${space * 2}px`,
        }}
        bgColor={bgColor}
        color={theme.white}
        fontSize={20}
        fontWeight={700}
      >
        <a href={`tel://${branch?.phone}`}>
          {branch?.brand} {branch?.location}관{" "}
          {branch &&
            branch[`target${targetId}Phone`] &&
            branch[`target${targetId}Phone`].replaceAll("-", ". ")}
        </a>
      </Box>
    </>
  )
}
