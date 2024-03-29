import { useRealViewport } from "next-real-viewport"
import { Slide } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"

import { Box, Center } from "@chakra-ui/react"

const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
}

const slideLists = [
  {
    imageNum: 9,
    link: "https://www.youtube.com/channel/UCwgew-iQxiOL1_XeYG0Tn0A", // 개상TV
  },
  // { imageNum: 8 }, // 모의고사
  { imageNum: 7, link: "/branch/PlSj" },
  { imageNum: 6, link: "/branch/SsMd" },
  { imageNum: 4, link: "/branch/PlCd/qr" },
  { imageNum: 0, link: "/branch/PlBb/qr" },
  {
    imageNum: 2,
    link: "https://blog.naver.com/PostView.naver?blogId=dhgbstudy&logNo=223033480560&proxyReferer=http:%2F%2Fwww.gnss.co.kr%2F",
  },
]

const buttonStyle = {
  width: "20px",
  background: "none",
  border: "0px",
}

const properties = {
  duration: 3000,
  prevArrow: (
    <button style={{ ...buttonStyle }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
        <defs>
          <clipPath>
            <path fill="#00f" fillOpacity=".514" d="m-7 1024.36h34v34h-34z" />
          </clipPath>
          <clipPath>
            <path
              fill="#aade87"
              fillOpacity=".472"
              d="m-6 1028.36h32v32h-32z"
            />
          </clipPath>
        </defs>
        <path
          d="m345.44 248.29l-194.29 194.28c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744l171.91-171.91-171.91-171.9c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.29 194.28c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373"
          fill="#4d4d4d"
          transform="matrix(-.03541-.00013-.00013.03541 19.02 3.02)"
        />
      </svg>
    </button>
  ),
  nextArrow: (
    <button style={{ ...buttonStyle }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
        <defs>
          <clipPath>
            <path fill="#00f" fillOpacity=".514" d="m-7 1024.36h34v34h-34z" />
          </clipPath>
          <clipPath>
            <path
              fill="#aade87"
              fillOpacity=".472"
              d="m-6 1028.36h32v32h-32z"
            />
          </clipPath>
        </defs>
        <path
          d="m345.44 248.29l-194.29 194.28c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744l171.91-171.91-171.91-171.9c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.29 194.28c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373"
          transform="matrix(.03541-.00013.00013.03541 2.98 3.02)"
          fill="#4d4d4d"
        />
      </svg>
    </button>
  ),
}

export default function Slideshow() {
  const { vw, vh } = useRealViewport()

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  }

  return (
    <Slide {...properties}>
      {slideLists.map((element, index) => (
        <Box key={index}>
          {element.link && (
            <a href={`${element.link}#slide`} target="_blank">
              <Box
                style={{
                  ...divStyle,
                }}
                backgroundImage={{
                  base: `/assets/slideshows/slide${element.imageNum}m.png`,
                  md: `/assets/slideshows/slide${element.imageNum}t.png`,
                  lg: `/assets/slideshows/slide${element.imageNum}p.png`,
                }}
                width={"auto"}
                maxWidth="2560px"
                height={{ base: vw && (vw * 100) / 2, lg: "520px" }}
                margin="auto"
              ></Box>
            </a>
          )}
          {!element.link && (
            <>
              <Box
                style={{
                  ...divStyle,
                }}
                backgroundImage={{
                  base: `/assets/slideshows/slide${element.imageNum}m.png`,
                  md: `/assets/slideshows/slide${element.imageNum}t.png`,
                  lg: `/assets/slideshows/slide${element.imageNum}p.png`,
                }}
                width={"auto"}
                maxWidth="2560px"
                height={{ base: vw && (vw * 100) / 2, lg: "520px" }}
                margin="auto"
              ></Box>
            </>
          )}
        </Box>
      ))}
    </Slide>
  )
}
