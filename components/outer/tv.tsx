import { useRealViewport } from "next-real-viewport"
import { useEffect, useState, useRef } from "react"
import { Grid, GridItem, Divider, Center, Box } from "@chakra-ui/react"

import getGstv from "@/lib/getGstv"

// const tvs = [
//   "https://www.youtube.com/embed/kdx2Ixh_zno",
//   "https://www.youtube.com/embed/0F2ZVbPTb_A?si=vkfBgQtFGfITMGRw",
//   "https://www.youtube.com/embed/xIhoHia1UCc?si=gxAEt8e-eiM0uVy5",
//   "https://www.youtube.com/embed/m8Dy3lc5Xhk?si=z-yLJ98mNPaDsj5n",
//   // "https://www.youtube.com/watch?v=0F2ZVbPTb_A&t=8s",
// ]

function youtubeId(src: string) {
  if (src.includes("https://youtu.be/"))
    // console.log("embed", src.substring(30, 41))
    return src.substring(17, 28)

  if (src.includes("https://www.youtube.com/embed/"))
    // console.log("embed", src.substring(30, 41))
    return src.substring(30, 41)

  if (src.includes("https://www.youtube.com/watch?")) {
    const indexOfV = src.indexOf("v=")
    // console.log("watch", src.substring(indexOfV + 2, indexOfV + 13))
    return src.substring(indexOfV + 2, indexOfV + 13)
  }
}

export default function Tv() {
  const { vw, vh } = useRealViewport()

  const [gstvData, setGstvData] = useState<any>()

  const _ = async () => {
    await setGstvData(await getGstv())
  }

  useEffect(() => {
    _()
  }, [])
  console.log(gstvData)

  return (
    <>
      <Grid
        templateColumns="1fr 150px 1fr"
        w="100%"
        // width={{ base: "100%", lg: "992px" }}
        alignItems={"center"}
        pt={10}
      >
        <GridItem>
          <Divider borderTop="solid 1px black" />
        </GridItem>
        <GridItem>
          <Center fontSize={"22px"}>개상TV</Center>
        </GridItem>
        <GridItem>
          <Divider borderTop="solid 1px black" />
        </GridItem>
      </Grid>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={6}
        w="100%"
        padding={2}
      >
        {gstvData &&
          gstvData.map((gstv: any, index: number) => (
            <GridItem key={index}>
              <div className="video">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId(gstv.link)}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </GridItem>
          ))}
      </Grid>

      <style jsx>{`
        .video {
          width: 100%;
          height: ${vw && vw * 100 < 992
            ? vw * 100 < 768
              ? ((vw * 100 - 2 * 2) / 16) * 9
              : ((vw * 100 - 2 * 2 - 16) / 2 / 16) * 9
            : ((992 - 2 * 2 - 16) / 2 / 16) * 9}px;
          // border: 1px solid red;
          overflow: hidden;
          position: relative;
        }
        iframe {
          // position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  )
}
