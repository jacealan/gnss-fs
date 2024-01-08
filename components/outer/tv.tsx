import { useRealViewport } from "next-real-viewport"
import { Grid, GridItem, Divider, Center, Box } from "@chakra-ui/react"

export default function Tv() {
  const { vw, vh } = useRealViewport()

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
          <Center fontSize={"22px"}>상상TV</Center>
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
        <GridItem>
          <div className="video">
            <iframe
              src="https://www.youtube.com/embed/kdx2Ixh_zno?si=-qFFfT9EmgqClUUG"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </GridItem>
        <GridItem>
          <div className="video">
            <iframe
              src="https://www.youtube.com/embed/or7gCaL1M5w?si=HbVVFPnsO0RXzgeK"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </GridItem>
        <GridItem>
          <div className="video">
            <iframe
              src="https://www.youtube.com/embed/OzMuY1NQdHg?si=cuE6woDuWTs09-Uz"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </GridItem>
        <GridItem>
          <div className="video">
            <iframe
              src="https://www.youtube.com/embed/m8Dy3lc5Xhk?si=z-yLJ98mNPaDsj5n"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </GridItem>
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
