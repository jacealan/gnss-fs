import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import Script from "next/script"
import { Map, MapMarker } from "react-kakao-maps-sdk"

import { useRealViewport } from "next-real-viewport"
import { Flex, Center, Box, Image } from "@chakra-ui/react"
import getBranch from "@/lib/getBranch"

import { HiChevronRight } from "react-icons/hi2"
import { TbPhoneCall } from "react-icons/tb"
import { FaBusAlt } from "react-icons/fa"
import { NextScript } from "next/document"

export default function EventPlDt() {
  const { vw, vh } = useRealViewport()
  const [vwC, setVwC] = useState(350)
  const router = useRouter()
  const { branchId: branchId, yearId: targetId } = router.query
  // const branch = branches[branchId as keyof typeof branches]
  const [branch, setBranch] = useState<any>(null)

  useEffect(() => {
    // if (teamId !== "" && teamId !== undefined) getTeam(teamId)
    if (branchId) {
      const _ = async () => {
        await setBranch(await getBranch(branchId))
      }
      _()
    }

    // if (branchId === "PlSj") router.push("/branch/PlSj/qr")
  }, [branchId])

  if (branch && branch.boardButton.length == 0) {
    router.push("/")
  }

  useEffect(() => {
    if (vw) {
      if (vw * 100 > 760) {
        setVwC(760)
      } else if (vw * 100 > 350) {
        setVwC(vw * 100)
      } else {
        setVwC(350)
      }
    }
  }, [vw])
  return (
    <>
      <Box>
        <Image src="/assets/events/event1.png"></Image>
      </Box>
      <Box>
        <Image src="/assets/events/event2.png"></Image>
      </Box>
      <Box>
        <Link href="https://forms.gle/XhHZ9J956Xmoo41R8" target="_blank">
          <Image src="/assets/events/event3.png"></Image>
        </Link>
      </Box>
      <Box>
        <Image src="/assets/events/event4.png"></Image>
      </Box>
      <Box width="100%">
        <Image src="/assets/events/event6.png"></Image>
        <Link
          href="https://map.naver.com/v5/search/%EA%B2%BD%EA%B8%B0%EB%8F%84%20%ED%99%94%EC%84%B1%EC%8B%9C%20%EB%8F%99%ED%83%84%EC%88%9C%ED%99%98%EB%8C%80%EB%A1%9C%20127-19%20%EB%8F%99%ED%83%84%EC%97%90%EC%8A%A4%EB%B9%84%ED%83%80%EC%9A%B4%208%EC%B8%B5"
          target="_blank"
        >
          <Center flexDirection={"column"}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7352.030879395358!2d127.09796545032377!3d37.166264161838264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b47d1301f60db%3A0x2ce4450a86264f5b!2z7JeQ7Iqk67mE7YOA7Jq0!5e0!3m2!1sko!2skr!4v1727845620427!5m2!1sko!2skr"
              width="100%"
              height={(vwC * 9) / 16}
              // style="border:0;"
              // allowfullscreen=""
              loading="lazy"
              // referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            {/* <Map
              center={{ lat: 37.167816, lng: 127.10717 }}
              style={{ width: "100%", height: "360px" }}
              level={5}
            >
              <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
                <div style={{ color: "#000" }}>개념폴리아 동탄관</div>
              </MapMarker>
            </Map> */}

            {/* <img
              className="map"
              src="http://t1.daumcdn.net/roughmap/imgmap/b7cd7edb8ecaa98e9f60b9c3ec0b67fe9a4bdde73a4843ad0888584fc10d2848"
              width="90%"
              // height="358px"
            /> */}
            <Flex
              width="90%"
              fontSize={vw && (20 / (760 / vwC)).toString() + "px"}
              justifyContent={"end"}
              alignItems={"center"}
              mt={2}
            >
              {/* 경기도 화성시 동탄순환대로 127-19 동탄에스비타운 8층 */}
              <FaBusAlt />
              <Box>&nbsp;&nbsp;남동탄지역 셔틀버스 운영예정</Box>
            </Flex>
            <br />
            <br />
          </Center>
        </Link>
      </Box>
      <Box>
        <Link href="https://forms.gle/XhHZ9J956Xmoo41R8" target="_blank">
          <Image src="/assets/events/event3.png"></Image>
        </Link>
      </Box>
      <Center
        fontSize={vw && (50 / (760 / vwC)).toString() + "px"}
        fontFamily={"GmarketSans"}
        fontWeight={900}
        p={6}
      >
        <Link href={`tell://${branch?.phone}`}>상담문의: 031. 375. 4808</Link>
      </Center>
    </>
  )
}
