import { useState, useEffect } from "react"
import { Box, Image, Button } from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"
import theme from "@/components/outer/theme.json"

const space = 50
const numbers = Array.from({ length: 20 }, (value, index) => index)

export default function DetailSchedule({
  branch,
  targetId,
  detail,
}: {
  branch: any
  targetId: string | any
  detail: string | any
}) {
  return (
    <>
      <Box
        w="100%"
        padding={{
          base: `20px ${space / 2}px 20px ${space / 2}px`,
          md: `20px ${space}px 20px ${space}px`,
          lg: `20px ${space * 2}px 20px ${space * 2}px`,
        }}
      >
        {numbers.map((i: number) => (
          <>
            {branch && (
              <>
                {i % 2 ? (
                  <>
                    {branch[
                      `target${targetId}${detail}Image${Math.floor(i / 2)}`
                    ] && (
                      <Image
                        src={
                          branch[
                            `target${targetId}${detail}Image${Math.floor(
                              i / 2
                            )}`
                          ]
                        }
                        width="100%"
                        onError={(element: any) => {
                          element.target.remove
                            ? element.target.remove()
                            : element.target.removeNode()
                        }}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {branch[
                      `target${targetId}${detail}Head${Math.floor(i / 2)}`
                    ] && (
                      <Box mt={"20px"} pb={2} fontSize={20} fontWeight={500}>
                        &#x25A0;&nbsp;
                        {
                          branch[
                            `target${targetId}${detail}Head${Math.floor(i / 2)}`
                          ]
                        }
                      </Box>
                    )}
                  </>
                )}
              </>
            )}
          </>
        ))}
      </Box>
      {branch && branch[`target${targetId}CounselBooking`] && (
        <a
          href={branch[`target${targetId}CounselBooking`]}
          target="_blank"
          rel="noreferrer"
        >
          <Button
            p={"30px 90px"}
            borderRadius={50}
            // bgColor="#fdd773"
            fontSize={20}
            variant={"outline"}
          >
            입반테스트 신청하기&nbsp;
            <EditIcon />
          </Button>
        </a>
      )}
    </>
  )
}
