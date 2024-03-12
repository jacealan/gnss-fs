import { useState, useEffect } from "react"
import { Box, Image, Button } from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"
import theme from "@/components/outer/theme.json"
import { EnterHtmlParser } from "@/lib/enterHtmlParser"

const space = 50
const numbers = Array.from({ length: 20 }, (value, index) => index)

export default function DetailKeynote({
  branch,
  targetId,
  detail,
}: {
  branch: any
  targetId: string | any
  detail: string | any
}) {
  // const [data, setData] = useState<any>({})

  // const GetSheet = async (branchId: string) => {
  //   const sheetId = "1-i7GucH--ChkDTCJZX8IonLm6g-rglFJWjrVdPuIw8g"
  //   //   const sheetId = process.env.REACT_APP_GOOGLE_SHEET_ID;
  //   const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`
  //   const sheetNames = {
  //     SsDc: "상상_대치",
  //     PlDc: "개폴_대치",
  //     SsMs: "상상_엠솔",
  //     SsSc: "상상_서초",
  //     PlSc: "개폴_서초",
  //     PlAkj: "개폴_압구정",
  //     PlBb: "개폴_방배",
  //     PlCd: "개폴_청담",
  //     SsSci_sc: "과학_서초",
  //     SsJs: "상상_잠실",
  //     PlJs: "개폴_잠실",
  //     SsSci_js: "과학_잠실",
  //     SsLib_js: "독공_잠실",
  //     PlPc: "개폴_평촌",
  //     PlSd: "개폴_송도",
  //   }
  //   const query = encodeURIComponent("Select *")

  //   const gsheetData = {}
  //   const url = `${base}&sheet=${
  //     sheetNames[branchId as keyof typeof sheetNames]
  //   }&tq=${query}`
  //   const branchData: any = { presentations: [] }
  //   await fetch(url)
  //     .then((res) => res.text())
  //     .then((rep) => JSON.parse(rep.substring(47).slice(0, -2)).table.rows)
  //     .then((jsonData) => {
  //       jsonData.forEach((row: any, idx: number) => {
  //         if (row.c[0] != null && row.c[1] != null) {
  //           branchData[`${row.c[0]?.v}` as keyof typeof branchData] = row.c[1].v
  //         }
  //       })
  //     })

  //   for (let i = 0; i < 10; i++) {
  //     if (
  //       branchData[
  //         `presentationContents${yearId}Image${i}` as keyof typeof branchData
  //       ] !== undefined
  //     ) {
  //       branchData.presentations.push({
  //         title:
  //           branchData[
  //             `presentationContents${yearId}Title${i}` as keyof typeof branchData
  //           ],
  //         image:
  //           branchData[
  //             `presentationContents${yearId}Image${i}` as keyof typeof branchData
  //           ],
  //       })
  //     }
  //   }

  //   // console.log(branchId, branchData);

  //   // return branchData;
  //   setData(branchData)
  // }
  // // console.log(data)
  // // console.log(data[`presentationBooking${yearId}`])

  // useEffect(() => {
  //   // console.log(branch);
  //   if (branch !== undefined) {
  //     GetSheet(branch?.id)
  //   }
  // }, [branch])

  // return (
  //   <>
  //     {/* {"presentationImages" in Object.keys(data) && */}
  //     {data !== null &&
  //       data?.presentations?.map(
  //         ({ title, image }: { title: string; image: string }, index: any) => (
  //           <>
  //             {(title || image) && (
  //               <Box
  //                 key={index}
  //                 w="100%"
  //                 padding={{
  //                   base: `20px ${space / 2}px 20px ${space / 2}px`,
  //                   md: `20px ${space}px 20px ${space}px`,
  //                   lg: `20px ${space * 2}px 20px ${space * 2}px`,
  //                 }}
  //               >
  //                 {title && (
  //                   <Box pb={2} fontSize={20} fontWeight={500}>
  //                     &#x25A0; <EnterHtmlParser text={title} />
  //                   </Box>
  //                 )}
  //                 {image && (
  //                   <img
  //                     src={image}
  //                     width="100%"
  //                     onError={(element: any) => {
  //                       element.target.remove
  //                         ? element.target.remove()
  //                         : element.target.removeNode()
  //                     }}
  //                   />
  //                 )}
  //               </Box>
  //             )}
  //           </>
  //         )
  //       )}
  //     {data !== null &&
  //       data[`presentationBooking${yearId}`] !== undefined &&
  //       data[`presentationBooking${yearId}`] !== null && (
  //         <a
  //           href={data[`presentationBooking${yearId}`]}
  //           target="_blank"
  //           rel="noreferrer"
  //         >
  //           <Button
  //             p={"30px 90px"}
  //             borderRadius={50}
  //             fontSize={20}
  //             variant={"outline"}
  //           >
  //             설명회 신청하기&nbsp;
  //             <EditIcon />
  //           </Button>
  //         </a>
  //       )}
  //   </>
  // )
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
          <div key={i}>
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
          </div>
        ))}
      </Box>
      {branch && branch[`target${targetId}KeynoteBooking`] && (
        <a
          href={branch[`target${targetId}KeynoteBooking`]}
          target="_blank"
          rel="noreferrer"
        >
          <Button
            p={"30px 90px"}
            borderRadius={50}
            fontSize={20}
            variant={"outline"}
          >
            설명회 신청하기&nbsp;
            <EditIcon />
          </Button>
        </a>
      )}
    </>
  )
}
