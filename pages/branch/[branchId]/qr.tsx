import { useRouter } from "next/router"
// import { Link } from "next/link"
import { useRealViewport } from "next-real-viewport"
import { Flex, Center, Box, Image } from "@chakra-ui/react"

import Head from "next/head"

const qrData = {
  PlBb: {
    name: "개념폴리아 방배관",
    bgColor: "#aaa",
    links: [
      {
        title: "개념폴리아 방배관 방문하기",
        href: "https://blog.naver.com/gnpolya23",
      },
      {
        title: "개념폴리아 방배관 입학테스트 에약",
        href: "https://form.office.naver.com/form/responseView.cmd?formkey=Yzc5OGJmZjMtMmEzOS00N2NhLTkyZjMtNjdlZjBhMTcwNzI4&sourceId=urlshare",
      },
      {
        title: "설명회 참석 예약",
        href: "https://form.office.naver.com/form/responseView.cmd?formkey=ZGFiZjAyMWUtZGYwNS00MWIwLWE3OWItNWNlNWYwMDkwZmI1&sourceId=urlshare",
      },
      {
        title: "방배관 위치안내",
        href: "https://m.place.naver.com/place/1394387582/location?subtab=location&selected_place_id=1394387582",
      },
      { title: "상 담 문 의", href: "tel://02-533-4808" },
    ],
  },
  PlCd: {
    bgColor: "#aaa",
    name: "개념폴리아 삼성청담관",
    links: [
      {
        title: "개념폴리아 방배관 방문하기",
        href: "https://blog.naver.com/gnpolya_cd",
      },
      {
        title: "개념폴리아 방배관 입학테스트 에약",
        href: "https://forms.gle/uBvXrtgUj5K5rYV19",
      },
      {
        title: "설명회 참석 예약",
        href: "https://forms.gle/rL1pLMYLpBtnbCtUA",
      },
      {
        title: "방배관 위치안내",
        href: "https://map.naver.com/v5/search/%EC%82%BC%EC%84%B1%EB%A1%9C%20119%EA%B8%B8%2014/address/14143180.545405883,4511280.984627821,%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EC%82%BC%EC%84%B1%EB%A1%9C119%EA%B8%B8%2014,new?c=19,0,0,0,dh&isCorrectAnswer=true",
      },
      { title: "상 담 문 의", href: "tel://02-565-4808" },
    ],
  },
}

export default function QR() {
  const { vw, vh } = useRealViewport()
  const router = useRouter()
  const { branchId } = router.query

  if (branchId === "PlBb") {
    return (
      <>
        <Head>
          <title>{qrData[branchId].name}</title>
          <meta name="description" content="수학은 개념상상,개념폴리아" />
          <meta property="og:title" content={qrData[branchId].name} />
          <meta
            property="og:description"
            content="수학은 개념상상,개념폴리아"
          />
          <meta
            property="og:image"
            content="//gnss.co.kr/assets/images/og1605x647.png"
          />
        </Head>
        <Flex justifyContent="center">
          <Box>
            {/* <img src="/assets/qrs/qrPlBb.svg"></img> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={vw && (vw * 100 > 700 ? "700" : "100vw")}
              height={vw && (vw * 100 > 700 ? "889" : "auto")}
              viewBox="0 0 700 1245"
            >
              <defs>
                <pattern
                  id="pattern"
                  preserveAspectRatio="none"
                  width="100%"
                  height="100%"
                  viewBox="0 0 700 488"
                >
                  <image
                    width="700"
                    height="488"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArwAAAHoCAYAAACrTTw/AAAABHNCSVQICAgIfAhkiAAAGzVJREFUeF7t1kEBgCAUBUGIZf8C3M3BWaXGOjR4wz/svO61h0eAAAECBAgQIEAgKjC/4H2i28wiQIAAAQIECBAgMASvIyBAgAABAgQIEEgLCN709xpHgAABAgQIECAgeN0AAQIECBAgQIBAWkDwpr/XOAIECBAgQIAAAcHrBggQIECAAAECBNICgjf9vcYRIECAAAECBAgIXjdAgAABAgQIECCQFhC86e81jgABAgQIECBAQPC6AQIECBAgQIAAgbSA4E1/r3EECBAgQIAAAQKC1w0QIECAAAECBAikBQRv+nuNI0CAAAECBAgQELxugAABAgQIECBAIC0geNPfaxwBAgQIECBAgIDgdQMECBAgQIAAAQJpAcGb/l7jCBAgQIAAAQIEBK8bIECAAAECBAgQSAsI3vT3GkeAAAECBAgQICB43QABAgQIECBAgEBaQPCmv9c4AgQIECBAgAABwesGCBAgQIAAAQIE0gKCN/29xhEgQIAAAQIECAheN0CAAAECBAgQIJAWELzp7zWOAAECBAgQIEBA8LoBAgQIECBAgACBtIDgTX+vcQQIECBAgAABAoLXDRAgQIAAAQIECKQFBG/6e40jQIAAAQIECBAQvG6AAAECBAgQIEAgLSB4099rHAECBAgQIECAgOB1AwQIECBAgAABAmkBwZv+XuMIECBAgAABAgQErxsgQIAAAQIECBBICwje9PcaR4AAAQIECBAgIHjdAAECBAgQIECAQFpA8Ka/1zgCBAgQIECAAAHB6wYIECBAgAABAgTSAoI3/b3GESBAgAABAgQICF43QIAAAQIECBAgkBYQvOnvNY4AAQIECBAgQEDwugECBAgQIECAAIG0gOBNf69xBAgQIECAAAECgtcNECBAgAABAgQIpAUEb/p7jSNAgAABAgQIEBC8boAAAQIECBAgQCAtIHjT32scAQIECBAgQICA4HUDBAgQIECAAAECaQHBm/5e4wgQIECAAAECBASvGyBAgAABAgQIEEgLCN709xpHgAABAgQIECAgeN0AAQIECBAgQIBAWkDwpr/XOAIECBAgQIAAAcHrBggQIECAAAECBNICgjf9vcYRIECAAAECBAgIXjdAgAABAgQIECCQFhC86e81jgABAgQIECBAQPC6AQIECBAgQIAAgbSA4E1/r3EECBAgQIAAAQKC1w0QIECAAAECBAikBQRv+nuNI0CAAAECBAgQELxugAABAgQIECBAIC0geNPfaxwBAgQIECBAgIDgdQMECBAgQIAAAQJpAcGb/l7jCBAgQIAAAQIEBK8bIECAAAECBAgQSAsI3vT3GkeAAAECBAgQICB43QABAgQIECBAgEBaQPCmv9c4AgQIECBAgAABwesGCBAgQIAAAQIE0gKCN/29xhEgQIAAAQIECAheN0CAAAECBAgQIJAWELzp7zWOAAECBAgQIEBA8LoBAgQIECBAgACBtIDgTX+vcQQIECBAgAABAoLXDRAgQIAAAQIECKQFBG/6e40jQIAAAQIECBAQvG6AAAECBAgQIEAgLSB4099rHAECBAgQIECAgOB1AwQIECBAgAABAmkBwZv+XuMIECBAgAABAgQErxsgQIAAAQIECBBICwje9PcaR4AAAQIECBAgIHjdAAECBAgQIECAQFpA8Ka/1zgCBAgQIECAAAHB6wYIECBAgAABAgTSAoI3/b3GESBAgAABAgQICF43QIAAAQIECBAgkBYQvOnvNY4AAQIECBAgQEDwugECBAgQIECAAIG0gOBNf69xBAgQIECAAAECgtcNECBAgAABAgQIpAUEb/p7jSNAgAABAgQIEBC8boAAAQIECBAgQCAtIHjT32scAQIECBAgQICA4HUDBAgQIECAAAECaQHBm/5e4wgQIECAAAECBASvGyBAgAABAgQIEEgLCN709xpHgAABAgQIECAgeN0AAQIECBAgQIBAWkDwpr/XOAIECBAgQIAAAcHrBggQIECAAAECBNICgjf9vcYRIECAAAECBAgIXjdAgAABAgQIECCQFhC86e81jgABAgQIECBAQPC6AQIECBAgQIAAgbSA4E1/r3EECBAgQIAAAQKC1w0QIECAAAECBAikBQRv+nuNI0CAAAECBAgQELxugAABAgQIECBAIC0geNPfaxwBAgQIECBAgIDgdQMECBAgQIAAAQJpAcGb/l7jCBAgQIAAAQIEBK8bIECAAAECBAgQSAsI3vT3GkeAAAECBAgQICB43QABAgQIECBAgEBaQPCmv9c4AgQIECBAgAABwesGCBAgQIAAAQIE0gKCN/29xhEgQIAAAQIECAheN0CAAAECBAgQIJAWELzp7zWOAAECBAgQIEBA8LoBAgQIECBAgACBtIDgTX+vcQQIECBAgAABAoLXDRAgQIAAAQIECKQFBG/6e40jQIAAAQIECBAQvG6AAAECBAgQIEAgLSB4099rHAECBAgQIECAgOB1AwQIECBAgAABAmkBwZv+XuMIECBAgAABAgQErxsgQIAAAQIECBBICwje9PcaR4AAAQIECBAgIHjdAAECBAgQIECAQFpA8Ka/1zgCBAgQIECAAAHB6wYIECBAgAABAgTSAoI3/b3GESBAgAABAgQICF43QIAAAQIECBAgkBYQvOnvNY4AAQIECBAgQEDwugECBAgQIECAAIG0gOBNf69xBAgQIECAAAECgtcNECBAgAABAgQIpAUEb/p7jSNAgAABAgQIEBC8boAAAQIECBAgQCAtIHjT32scAQIECBAgQICA4HUDBAgQIECAAAECaQHBm/5e4wgQIECAAAECBASvGyBAgAABAgQIEEgLCN709xpHgAABAgQIECAgeN0AAQIECBAgQIBAWkDwpr/XOAIECBAgQIAAAcHrBggQIECAAAECBNICgjf9vcYRIECAAAECBAgIXjdAgAABAgQIECCQFhC86e81jgABAgQIECBAQPC6AQIECBAgQIAAgbSA4E1/r3EECBAgQIAAAQKC1w0QIECAAAECBAikBQRv+nuNI0CAAAECBAgQELxugAABAgQIECBAIC0geNPfaxwBAgQIECBAgIDgdQMECBAgQIAAAQJpAcGb/l7jCBAgQIAAAQIEBK8bIECAAAECBAgQSAsI3vT3GkeAAAECBAgQICB43QABAgQIECBAgEBaQPCmv9c4AgQIECBAgAABwesGCBAgQIAAAQIE0gKCN/29xhEgQIAAAQIECAheN0CAAAECBAgQIJAWELzp7zWOAAECBAgQIEBA8LoBAgQIECBAgACBtIDgTX+vcQQIECBAgAABAoLXDRAgQIAAAQIECKQFBG/6e40jQIAAAQIECBAQvG6AAAECBAgQIEAgLSB4099rHAECBAgQIECAgOB1AwQIECBAgAABAmkBwZv+XuMIECBAgAABAgQErxsgQIAAAQIECBBICwje9PcaR4AAAQIECBAgIHjdAAECBAgQIECAQFpA8Ka/1zgCBAgQIECAAAHB6wYIECBAgAABAgTSAoI3/b3GESBAgAABAgQICF43QIAAAQIECBAgkBYQvOnvNY4AAQIECBAgQEDwugECBAgQIECAAIG0gOBNf69xBAgQIECAAAECgtcNECBAgAABAgQIpAUEb/p7jSNAgAABAgQIEBC8boAAAQIECBAgQCAtIHjT32scAQIECBAgQICA4HUDBAgQIECAAAECaQHBm/5e4wgQIECAAAECBASvGyBAgAABAgQIEEgLCN709xpHgAABAgQIECAgeN0AAQIECBAgQIBAWkDwpr/XOAIECBAgQIAAAcHrBggQIECAAAECBNICgjf9vcYRIECAAAECBAgIXjdAgAABAgQIECCQFhC86e81jgABAgQIECBAQPC6AQIECBAgQIAAgbSA4E1/r3EECBAgQIAAAQKC1w0QIECAAAECBAikBQRv+nuNI0CAAAECBAgQELxugAABAgQIECBAIC0geNPfaxwBAgQIECBAgIDgdQMECBAgQIAAAQJpAcGb/l7jCBAgQIAAAQIEBK8bIECAAAECBAgQSAsI3vT3GkeAAAECBAgQICB43QABAgQIECBAgEBaQPCmv9c4AgQIECBAgAABwesGCBAgQIAAAQIE0gKCN/29xhEgQIAAAQIECAheN0CAAAECBAgQIJAWELzp7zWOAAECBAgQIEBA8LoBAgQIECBAgACBtIDgTX+vcQQIECBAgAABAoLXDRAgQIAAAQIECKQFBG/6e40jQIAAAQIECBAQvG6AAAECBAgQIEAgLSB4099rHAECBAgQIECAgOB1AwQIECBAgAABAmkBwZv+XuMIECBAgAABAgQErxsgQIAAAQIECBBICwje9PcaR4AAAQIECBAgIHjdAAECBAgQIECAQFpA8Ka/1zgCBAgQIECAAAHB6wYIECBAgAABAgTSAoI3/b3GESBAgAABAgQICF43QIAAAQIECBAgkBYQvOnvNY4AAQIECBAgQEDwugECBAgQIECAAIG0gOBNf69xBAgQIECAAAECgtcNECBAgAABAgQIpAUEb/p7jSNAgAABAgQIEBC8boAAAQIECBAgQCAtIHjT32scAQIECBAgQICA4HUDBAgQIECAAAECaQHBm/5e4wgQIECAAAECBASvGyBAgAABAgQIEEgLCN709xpHgAABAgQIECAgeN0AAQIECBAgQIBAWkDwpr/XOAIECBAgQIAAAcHrBggQIECAAAECBNICgjf9vcYRIECAAAECBAgIXjdAgAABAgQIECCQFhC86e81jgABAgQIECBAQPC6AQIECBAgQIAAgbSA4E1/r3EECBAgQIAAAQKC1w0QIECAAAECBAikBQRv+nuNI0CAAAECBAgQELxugAABAgQIECBAIC0geNPfaxwBAgQIECBAgIDgdQMECBAgQIAAAQJpAcGb/l7jCBAgQIAAAQIEBK8bIECAAAECBAgQSAsI3vT3GkeAAAECBAgQICB43QABAgQIECBAgEBaQPCmv9c4AgQIECBAgAABwesGCBAgQIAAAQIE0gKCN/29xhEgQIAAAQIECAheN0CAAAECBAgQIJAWELzp7zWOAAECBAgQIEBA8LoBAgQIECBAgACBtIDgTX+vcQQIECBAgAABAoLXDRAgQIAAAQIECKQFBG/6e40jQIAAAQIECBAQvG6AAAECBAgQIEAgLSB4099rHAECBAgQIECAgOB1AwQIECBAgAABAmkBwZv+XuMIECBAgAABAgQErxsgQIAAAQIECBBICwje9PcaR4AAAQIECBAgIHjdAAECBAgQIECAQFpA8Ka/1zgCBAgQIECAAAHB6wYIECBAgAABAgTSAoI3/b3GESBAgAABAgQICF43QIAAAQIECBAgkBYQvOnvNY4AAQIECBAgQEDwugECBAgQIECAAIG0gOBNf69xBAgQIECAAAECgtcNECBAgAABAgQIpAUEb/p7jSNAgAABAgQIEBC8boAAAQIECBAgQCAtIHjT32scAQIECBAgQICA4HUDBAgQIECAAAECaQHBm/5e4wgQIECAAAECBASvGyBAgAABAgQIEEgLCN709xpHgAABAgQIECAgeN0AAQIECBAgQIBAWkDwpr/XOAIECBAgQIAAAcHrBggQIECAAAECBNICgjf9vcYRIECAAAECBAgIXjdAgAABAgQIECCQFhC86e81jgABAgQIECBAQPC6AQIECBAgQIAAgbSA4E1/r3EECBAgQIAAAQKC1w0QIECAAAECBAikBQRv+nuNI0CAAAECBAgQELxugAABAgQIECBAIC0geNPfaxwBAgQIECBAgIDgdQMECBAgQIAAAQJpAcGb/l7jCBAgQIAAAQIEBK8bIECAAAECBAgQSAsI3vT3GkeAAAECBAgQICB43QABAgQIECBAgEBaQPCmv9c4AgQIECBAgAABwesGCBAgQIAAAQIE0gKCN/29xhEgQIAAAQIECAheN0CAAAECBAgQIJAWELzp7zWOAAECBAgQIEBA8LoBAgQIECBAgACBtIDgTX+vcQQIECBAgAABAoLXDRAgQIAAAQIECKQFBG/6e40jQIAAAQIECBAQvG6AAAECBAgQIEAgLSB4099rHAECBAgQIECAgOB1AwQIECBAgAABAmkBwZv+XuMIECBAgAABAgQErxsgQIAAAQIECBBICwje9PcaR4AAAQIECBAgIHjdAAECBAgQIECAQFpA8Ka/1zgCBAgQIECAAAHB6wYIECBAgAABAgTSAoI3/b3GESBAgAABAgQICF43QIAAAQIECBAgkBYQvOnvNY4AAQIECBAgQEDwugECBAgQIECAAIG0gOBNf69xBAgQIECAAAECgtcNECBAgAABAgQIpAUEb/p7jSNAgAABAgQIEBC8boAAAQIECBAgQCAtIHjT32scAQIECBAgQICA4HUDBAgQIECAAAECaQHBm/5e4wgQIECAAAECBASvGyBAgAABAgQIEEgLCN709xpHgAABAgQIECAgeN0AAQIECBAgQIBAWkDwpr/XOAIECBAgQIAAAcHrBggQIECAAAECBNICgjf9vcYRIECAAAECBAgIXjdAgAABAgQIECCQFhC86e81jgABAgQIECBAQPC6AQIECBAgQIAAgbSA4E1/r3EECBAgQIAAAQKC1w0QIECAAAECBAikBQRv+nuNI0CAAAECBAgQELxugAABAgQIECBAIC0geNPfaxwBAgQIECBAgIDgdQMECBAgQIAAAQJpAcGb/l7jCBAgQIAAAQIEBK8bIECAAAECBAgQSAsI3vT3GkeAAAECBAgQICB43QABAgQIECBAgEBaQPCmv9c4AgQIECBAgAABwesGCBAgQIAAAQIE0gKCN/29xhEgQIAAAQIECAheN0CAAAECBAgQIJAWELzp7zWOAAECBAgQIEBA8LoBAgQIECBAgACBtIDgTX+vcQQIECBAgAABAoLXDRAgQIAAAQIECKQFBG/6e40jQIAAAQIECBAQvG6AAAECBAgQIEAgLSB4099rHAECBAgQIECAgOB1AwQIECBAgAABAmkBwZv+XuMIECBAgAABAgQErxsgQIAAAQIECBBICwje9PcaR4AAAQIECBAgIHjdAAECBAgQIECAQFpA8Ka/1zgCBAgQIECAAAHB6wYIECBAgAABAgTSAoI3/b3GESBAgAABAgQICF43QIAAAQIECBAgkBYQvOnvNY4AAQIECBAgQEDwugECBAgQIECAAIG0gOBNf69xBAgQIECAAAECgtcNECBAgAABAgQIpAUEb/p7jSNAgAABAgQIEBC8boAAAQIECBAgQCAtIHjT32scAQIECBAgQICA4HUDBAgQIECAAAECaQHBm/5e4wgQIECAAAECBASvGyBAgAABAgQIEEgLCN709xpHgAABAgQIECAgeN0AAQIECBAgQIBAWkDwpr/XOAIECBAgQIAAAcHrBggQIECAAAECBNICgjf9vcYRIECAAAECBAgIXjdAgAABAgQIECCQFhC86e81jgABAgQIECBAQPC6AQIECBAgQIAAgbSA4E1/r3EECBAgQIAAAQKC1w0QIECAAAECBAikBQRv+nuNI0CAAAECBAgQELxugAABAgQIECBAIC0geNPfaxwBAgQIECBAgIDgdQMECBAgQIAAAQJpAcGb/l7jCBAgQIAAAQIEBK8bIECAAAECBAgQSAsI3vT3GkeAAAECBAgQICB43QABAgQIECBAgEBaQPCmv9c4AgQIECBAgAABwesGCBAgQIAAAQIE0gKCN/29xhEgQIAAAQIECAheN0CAAAECBAgQIJAWELzp7zWOAAECBAgQIEBA8LoBAgQIECBAgACBtIDgTX+vcQQIECBAgAABAoLXDRAgQIAAAQIECKQFBG/6e40jQIAAAQIECBAQvG6AAAECBAgQIEAgLSB4099rHAECBAgQIECAgOB1AwQIECBAgAABAmkBwZv+XuMIECBAgAABAgQErxsgQIAAAQIECBBICwje9PcaR4AAAQIECBAgIHjdAAECBAgQIECAQFpA8Ka/1zgCBAgQIECAAAHB6wYIECBAgAABAgTSAoI3/b3GESBAgAABAgQICF43QIAAAQIECBAgkBYQvOnvNY4AAQIECBAgQEDwugECBAgQIECAAIG0gOBNf69xBAgQIECAAAECgtcNECBAgAABAgQIpAUEb/p7jSNAgAABAgQIEBC8boAAAQIECBAgQCAtIHjT32scAQIECBAgQICA4HUDBAgQIECAAAECaQHBm/5e4wgQIECAAAECBASvGyBAgAABAgQIEEgLCN709xpHgAABAgQIECAgeN0AAQIECBAgQIBAWkDwpr/XOAIECBAgQIAAAcHrBggQIECAAAECBNICgjf9vcYRIECAAAECBAgIXjdAgAABAgQIECCQFhC86e81jgABAgQIECBAQPC6AQIECBAgQIAAgbSA4E1/r3EECBAgQIAAAQKC1w0QIECAAAECBAikBQRv+nuNI0CAAAECBAgQELxugAABAgQIECBAIC0geNPfaxwBAgQIECBAgIDgdQMECBAgQIAAAQJpAcGb/l7jCBAgQIAAAQIEBK8bIECAAAECBAgQSAsI3vT3GkeAAAECBAgQICB43QABAgQIECBAgEBaQPCmv9c4AgQIECBAgAABwesGCBAgQIAAAQIE0gKCN/29xhEgQIAAAQIECAheN0CAAAECBAgQIJAWELzp7zWOAAECBAgQIEBA8LoBAgQIECBAgACBtIDgTX+vcQQIECBAgAABAoLXDRAgQIAAAQIECKQFBG/6e40jQIAAAQIECBAQvG6AAAECBAgQIEAgLSB4099rHAECBAgQIECAgOB1AwQIECBAgAABAmkBwZv+XuMIECBAgAABAgQErxsgQIAAAQIECBBICwje9PcaR4AAAQIECBAgIHjdAAECBAgQIECAQFpA8Ka/1zgCBAgQIECAAAHB6wYIECBAgAABAgTSAoI3/b3GESBAgAABAgQICF43QIAAAQIECBAgkBYQvOnvNY4AAQIECBAgQEDwugECBAgQIECAAIG0gOBNf69xBAgQIECAAAECgtcNECBAgAABAgQIpAUEb/p7jSNAgAABAgQIEBC8boAAAQIECBAgQCAtIHjT32scAQIECBAgQICA4HUDBAgQIECAAAECaQHBm/5e4wgQIECAAAECBASvGyBAgAABAgQIEEgLCN709xpHgAABAgQIECAgeN0AAQIECBAgQIBAWkDwpr/XOAIECBAgQIAAAcHrBggQIECAAAECBNICJ3h3eqFxBAgQIECAAAECvxZ4AeOAgtjgxIcZAAAAAElFTkSuQmCC"
                  />
                </pattern>
                <filter
                  id="Layer_1"
                  x="-9"
                  y="-6"
                  width="718"
                  height="469"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="3" />
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feFlood floodOpacity="0.161" />
                  <feComposite operator="in" in2="blur" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <filter
                  id="사각형_30"
                  x="70"
                  y="414"
                  width="558"
                  height="837"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="3" />
                  <feGaussianBlur stdDeviation="1" result="blur-2" />
                  <feFlood floodOpacity="0.161" />
                  <feComposite operator="in" in2="blur-2" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <filter
                  id="사각형_27"
                  x="197"
                  y="1042"
                  width="306"
                  height="69"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="3" result="blur-3" />
                  <feFlood floodOpacity="0.161" />
                  <feComposite operator="in" in2="blur-3" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <clipPath id="clipPath">
                  <rect
                    id="사각형_1"
                    data-name="사각형 1"
                    width="40"
                    height="53"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clipPath-2">
                  <rect
                    id="사각형_2"
                    data-name="사각형 2"
                    width="40.748"
                    height="52.027"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clipPath-4">
                  <rect
                    id="사각형_4"
                    data-name="사각형 4"
                    width="32.585"
                    height="41.522"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clipPath-6">
                  <rect
                    id="사각형_6"
                    data-name="사각형 6"
                    width="50"
                    height="44"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clipPath-7">
                  <rect
                    id="사각형_7"
                    data-name="사각형 7"
                    width="39"
                    height="32"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clipPath-9">
                  <rect
                    id="사각형_9"
                    data-name="사각형 9"
                    width="37"
                    height="36"
                    transform="translate(0 0)"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clipPath-10">
                  <rect
                    id="사각형_10"
                    data-name="사각형 10"
                    width="23"
                    height="23"
                    transform="translate(0 0)"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clipPath-13">
                  <rect
                    id="사각형_13"
                    data-name="사각형 13"
                    width="21"
                    height="7"
                    transform="translate(0 0)"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clipPath-15">
                  <rect
                    id="사각형_15"
                    data-name="사각형 15"
                    width="30"
                    height="32"
                    transform="translate(356.422 337.813) rotate(19.527)"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clipPath-16">
                  <rect
                    id="사각형_16"
                    data-name="사각형 16"
                    width="22"
                    height="22"
                    transform="translate(0 0)"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clipPath-18">
                  <rect
                    id="사각형_18"
                    data-name="사각형 18"
                    width="52.927"
                    height="49.811"
                    transform="matrix(0.713, -0.701, 0.701, 0.713, 615.848, 51.523)"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clipPath-19">
                  <rect
                    id="사각형_19"
                    data-name="사각형 19"
                    width="41"
                    height="37"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clipPath-21">
                  <rect
                    id="사각형_21"
                    data-name="사각형 21"
                    width="52.927"
                    height="49.811"
                    transform="matrix(0.713, -0.701, 0.701, 0.713, 579.848, 356.523)"
                    fill="none"
                  />
                </clipPath>
                <filter
                  id="사각형_22"
                  x="107"
                  y="478"
                  width="486"
                  height="74"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="3" />
                  <feGaussianBlur stdDeviation="2" result="blur-4" />
                  <feFlood floodOpacity="0.161" />
                  <feComposite operator="in" in2="blur-4" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <filter
                  id="사각형_23"
                  x="107"
                  y="616"
                  width="486"
                  height="74"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="3" />
                  <feGaussianBlur stdDeviation="2" result="blur-5" />
                  <feFlood floodOpacity="0.161" />
                  <feComposite operator="in" in2="blur-5" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <filter
                  id="사각형_28"
                  x="107"
                  y="754"
                  width="486"
                  height="74"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="3" />
                  <feGaussianBlur stdDeviation="2" result="blur-6" />
                  <feFlood floodOpacity="0.161" />
                  <feComposite operator="in" in2="blur-6" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <filter
                  id="사각형_29"
                  x="107"
                  y="892"
                  width="486"
                  height="74"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="3" />
                  <feGaussianBlur stdDeviation="2" result="blur-7" />
                  <feFlood floodOpacity="0.161" />
                  <feComposite operator="in" in2="blur-7" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <clipPath id="clipPath-22">
                  <rect
                    id="사각형_31"
                    data-name="사각형 31"
                    width="29.818"
                    height="27.571"
                    fill="#fff"
                  />
                </clipPath>
                <clipPath id="clip-Canvas">
                  <rect width="700" height="1245" />
                </clipPath>
              </defs>
              <g id="Canvas" clipPath="url(#clip-Canvas)">
                <rect width="700" height="1245" fill="#f5f5f5" />
                <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Layer_1)">
                  <rect
                    id="Layer_1-2"
                    data-name="Layer 1"
                    width="700"
                    height="451"
                    transform="translate(0)"
                    fill="url(#pattern)"
                  />
                </g>
                <g
                  transform="matrix(1, 0, 0, 1, 0, 0)"
                  filter="url(#사각형_30)"
                >
                  <path
                    id="사각형_30-2"
                    data-name="사각형 30"
                    d="M12,0H540a12,12,0,0,1,12,12V831a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V12A12,12,0,0,1,12,0Z"
                    transform="translate(73 414)"
                    fill="#fff"
                  />
                </g>
                <a href="tel://02-533-4808">
                  <g
                    transform="matrix(1, 0, 0, 1, 0, 0)"
                    filter="url(#사각형_27)"
                  >
                    <rect
                      id="사각형_27-2"
                      data-name="사각형 27"
                      width="288"
                      height="51"
                      rx="25.5"
                      transform="translate(206 1050)"
                      fill="#4ddbd0"
                    />
                  </g>
                </a>
                <g id="배경_아이콘" data-name="배경 아이콘" opacity="0.38">
                  <g
                    id="Vector_Smart_Object"
                    data-name="Vector Smart Object"
                    transform="translate(527 71)"
                  >
                    <g id="그룹_2" data-name="그룹 2">
                      <g
                        id="그룹_1"
                        data-name="그룹 1"
                        clipPath="url(#clipPath)"
                      >
                        <path
                          id="패스_1"
                          data-name="패스 1"
                          d="M39.448,1.093H34.129A1.392,1.392,0,0,0,32.758,0H28.746a1.391,1.391,0,0,0-1.371,1.093H2.273A2.3,2.3,0,0,0,0,3.409V50.684A2.3,2.3,0,0,0,2.273,53H39.448A.557.557,0,0,0,40,52.438V1.655a.557.557,0,0,0-.551-.562M3.333,51.876H2.273A1.183,1.183,0,0,1,1.1,50.684V3.409a1.182,1.182,0,0,1,1.17-1.192h1.06ZM28.451,1.362a.275.275,0,0,1,.3-.238h4.012a.275.275,0,0,1,.3.238V7.333L31.036,6.1a.545.545,0,0,0-.567,0L28.451,7.333ZM38.9,51.876H4.436V2.217H27.348V8.324a.564.564,0,0,0,.28.489.545.545,0,0,0,.555-.007l2.57-1.568,2.57,1.568a.543.543,0,0,0,.555.007.564.564,0,0,0,.28-.489V2.217H38.9Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_2"
                          data-name="패스 2"
                          d="M32.686,38.309H30.97a9.558,9.558,0,0,0-.352-2.091.543.543,0,0,0-.031-.11,9.489,9.489,0,0,0-1.015-2.269.55.55,0,0,0-.064-.1,9.5,9.5,0,0,0-1.246-1.576c-.009-.01-.015-.021-.024-.03a.53.53,0,0,0-.048-.04,9.371,9.371,0,0,0-1.5-1.215.532.532,0,0,0-.092-.06,9.157,9.157,0,0,0-2.237-1.029.551.551,0,0,0-.111-.032,9.072,9.072,0,0,0-2-.346l.008-1.643a.557.557,0,0,0-.549-.565h0a.557.557,0,0,0-.551.559l-.009,1.65a9.383,9.383,0,0,0-8.705,8.9H10.532a.562.562,0,0,0,0,1.124h1.911a9.383,9.383,0,0,0,8.6,8.844l-.009,1.683a.557.557,0,0,0,.549.565h0a.557.557,0,0,0,.551-.559l.009-1.675a9.378,9.378,0,0,0,8.816-8.859h1.72a.562.562,0,0,0,0-1.124M21.053,47.15a8.268,8.268,0,0,1-7.5-7.718h7.545Zm.046-8.841H13.545a8.267,8.267,0,0,1,7.594-7.771Zm8.347-2.142-2.1,2.142H25.715l3.243-3.3a8.376,8.376,0,0,1,.488,1.161m-1.081-2.145-4.209,4.288h-1.2l4.879-4.97a8.306,8.306,0,0,1,.532.682m-6.123-3.485a8.017,8.017,0,0,1,.81.1l-.815.83Zm-.013,2.523,2.072-2.11a8.023,8.023,0,0,1,1.143.493L22.22,34.725Zm-.017,3.264,4.2-4.28q.329.238.634.506l-4.843,4.933Zm-.056,10.843.04-7.733H29.86a8.263,8.263,0,0,1-7.7,7.733M28.9,38.309l.86-.876a8.461,8.461,0,0,1,.1.876Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_3"
                          data-name="패스 3"
                          d="M19.659,14.037,16.97,22.749h1.057l.822-2.74h2.806l.845,2.74h1.092l-2.7-8.712Zm-.6,5.093.775-2.52c.152-.53.282-1.06.4-1.577h.024c.117.5.235,1.021.411,1.59l.775,2.508Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_4"
                          data-name="패스 4"
                          d="M29.687,14.037v8.712h1.022V18.664h3.827v4.085h1.033V14.037H34.536v3.645H30.708V14.037Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_5"
                          data-name="패스 5"
                          d="M7.483,10.973a.557.557,0,0,0,.551.562H35.688a.562.562,0,0,0,0-1.124H8.035a.557.557,0,0,0-.551.562"
                          fill="#fff"
                        />
                        <path
                          id="패스_6"
                          data-name="패스 6"
                          d="M14.915,18.922l.2,3.826h1l-.493-8.712h-1.3L12.907,18.25c-.352,1.1-.634,2.055-.834,2.934h-.035c-.2-.9-.47-1.861-.8-2.934L9.89,14.037h-1.3l-.551,8.712h.974l.212-3.736c.07-1.305.129-2.766.152-3.852H9.4c.223,1.034.54,2.159.916,3.387L11.592,22.7h.775l1.4-4.227c.4-1.2.728-2.288,1-3.309H14.8c-.012,1.086.059,2.547.117,3.761"
                          fill="#fff"
                        />
                        <path
                          id="패스_7"
                          data-name="패스 7"
                          d="M35.688,24.776H8.035a.562.562,0,0,0,0,1.124H35.688a.562.562,0,0,0,0-1.124"
                          fill="#fff"
                        />
                        <path
                          id="패스_8"
                          data-name="패스 8"
                          d="M26.387,22.749V14.993h2.419v-.956H22.947v.956h2.407v7.756Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_17"
                    data-name="Vector Smart Object copy 17"
                    transform="matrix(0, 1, -1, 0, 71, 172)"
                  >
                    <g id="그룹_4" data-name="그룹 4">
                      <g
                        id="그룹_3"
                        data-name="그룹 3"
                        clipPath="url(#clipPath-2)"
                      >
                        <path
                          id="패스_9"
                          data-name="패스 9"
                          d="M40.186,1.073H34.767A1.407,1.407,0,0,0,33.371,0H29.284a1.407,1.407,0,0,0-1.4,1.073H2.316A2.3,2.3,0,0,0,0,3.346V49.754a2.3,2.3,0,0,0,2.316,2.273h37.87a.557.557,0,0,0,.562-.551V1.624a.557.557,0,0,0-.562-.551M3.4,50.924H2.316a1.183,1.183,0,0,1-1.192-1.17V3.346a1.182,1.182,0,0,1,1.192-1.17H3.4ZM28.983,1.337a.278.278,0,0,1,.3-.234h4.087a.278.278,0,0,1,.3.234V7.2L31.616,5.989a.573.573,0,0,0-.577,0L28.983,7.2ZM39.624,50.924H4.519V2.176h23.34v6a.55.55,0,0,0,.285.48.574.574,0,0,0,.566-.007l2.618-1.539,2.618,1.539a.572.572,0,0,0,.566.007.55.55,0,0,0,.285-.48v-6h4.829Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_10"
                          data-name="패스 10"
                          d="M33.3,37.605H31.549a9.072,9.072,0,0,0-.359-2.052.518.518,0,0,0-.031-.108,9.151,9.151,0,0,0-1.034-2.227.538.538,0,0,0-.065-.1,9.388,9.388,0,0,0-1.27-1.547c-.009-.01-.015-.02-.025-.03a.535.535,0,0,0-.049-.039,9.489,9.489,0,0,0-1.53-1.193.544.544,0,0,0-.094-.059,9.5,9.5,0,0,0-2.279-1.01.577.577,0,0,0-.114-.032,9.559,9.559,0,0,0-2.036-.339l.009-1.613a.557.557,0,0,0-.559-.554h0a.557.557,0,0,0-.562.548l-.009,1.62a9.381,9.381,0,0,0-8.868,8.734H10.729a.552.552,0,1,0,0,1.1h1.947a9.379,9.379,0,0,0,8.766,8.682l-.009,1.653a.557.557,0,0,0,.559.555h0a.557.557,0,0,0,.562-.549l.009-1.644a9.384,9.384,0,0,0,8.981-8.7H33.3a.552.552,0,1,0,0-1.1M21.447,46.284A8.265,8.265,0,0,1,13.8,38.708h7.686Zm.047-8.679H13.8a8.265,8.265,0,0,1,7.736-7.628ZM30,35.5l-2.142,2.1H26.2l3.3-3.242A8.062,8.062,0,0,1,30,35.5m-1.1-2.106-4.288,4.209H23.383l4.97-4.879a8.2,8.2,0,0,1,.542.67m-6.237-3.421q.419.027.826.093l-.83.815Zm-.013,2.477,2.11-2.071a8.339,8.339,0,0,1,1.165.484l-3.284,3.223Zm-.017,3.2,4.281-4.2q.336.233.646.5l-4.933,4.842ZM22.57,46.3l.041-7.591h7.808A8.269,8.269,0,0,1,22.57,46.3m6.873-8.694.876-.86a8.016,8.016,0,0,1,.1.86Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_11"
                          data-name="패스 11"
                          d="M20.026,13.779l-2.739,8.552h1.076l.837-2.69H22.06l.861,2.69h1.113l-2.751-8.552Zm-.61,5,.789-2.474c.155-.521.287-1.041.407-1.548h.024c.12.495.239,1,.418,1.561l.789,2.462Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_12"
                          data-name="패스 12"
                          d="M30.242,13.779v8.552h1.041v-4.01h3.9v4.01h1.053V13.779H35.182v3.578h-3.9V13.779Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_13"
                          data-name="패스 13"
                          d="M7.623,10.772a.557.557,0,0,0,.562.551h28.17a.552.552,0,1,0,0-1.1H8.185a.557.557,0,0,0-.562.551"
                          fill="#fff"
                        />
                        <path
                          id="패스_14"
                          data-name="패스 14"
                          d="M15.194,18.575l.2,3.756h1.017l-.5-8.552H14.584l-1.435,4.136c-.359,1.079-.646,2.017-.849,2.88h-.036c-.2-.888-.478-1.827-.814-2.88l-1.375-4.136H8.747l-.562,8.552h.992l.215-3.667c.072-1.281.131-2.715.155-3.781h.024c.227,1.015.55,2.119.933,3.325l1.3,4.073H12.6l1.423-4.149c.407-1.18.742-2.246,1.017-3.248h.036c-.012,1.066.06,2.5.12,3.692"
                          fill="#fff"
                        />
                        <path
                          id="패스_15"
                          data-name="패스 15"
                          d="M36.355,24.321H8.185a.552.552,0,1,0,0,1.1h28.17a.552.552,0,1,0,0-1.1"
                          fill="#fff"
                        />
                        <path
                          id="패스_16"
                          data-name="패스 16"
                          d="M26.881,22.331V14.718h2.464v-.939H23.376v.939h2.452v7.613Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_18"
                    data-name="Vector Smart Object copy 18"
                    transform="matrix(0, 1, -1, 0, 316, 17)"
                  >
                    <g id="그룹_6" data-name="그룹 6">
                      <g
                        id="그룹_5"
                        data-name="그룹 5"
                        clipPath="url(#clipPath-2)"
                      >
                        <path
                          id="패스_17"
                          data-name="패스 17"
                          d="M40.186,1.073H34.767A1.407,1.407,0,0,0,33.371,0H29.284a1.407,1.407,0,0,0-1.4,1.073H2.316A2.3,2.3,0,0,0,0,3.346V49.754a2.3,2.3,0,0,0,2.316,2.273h37.87a.557.557,0,0,0,.562-.551V1.624a.557.557,0,0,0-.562-.551M3.4,50.924H2.316a1.183,1.183,0,0,1-1.192-1.17V3.346a1.182,1.182,0,0,1,1.192-1.17H3.4ZM28.983,1.337a.278.278,0,0,1,.3-.234h4.087a.278.278,0,0,1,.3.234V7.2L31.616,5.989a.573.573,0,0,0-.577,0L28.983,7.2ZM39.624,50.924H4.519V2.176h23.34v6a.55.55,0,0,0,.285.48.574.574,0,0,0,.566-.007l2.618-1.539,2.618,1.539a.572.572,0,0,0,.566.007.55.55,0,0,0,.285-.48v-6h4.829Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_18"
                          data-name="패스 18"
                          d="M33.3,37.605H31.549a9.072,9.072,0,0,0-.359-2.052.518.518,0,0,0-.031-.108,9.151,9.151,0,0,0-1.034-2.227.538.538,0,0,0-.065-.1,9.388,9.388,0,0,0-1.27-1.547c-.009-.01-.015-.02-.025-.03a.535.535,0,0,0-.049-.039,9.489,9.489,0,0,0-1.53-1.193.544.544,0,0,0-.094-.059,9.5,9.5,0,0,0-2.279-1.01.577.577,0,0,0-.114-.032,9.559,9.559,0,0,0-2.036-.339l.009-1.613a.557.557,0,0,0-.559-.554h0a.557.557,0,0,0-.562.548l-.009,1.62a9.381,9.381,0,0,0-8.868,8.734H10.729a.552.552,0,1,0,0,1.1h1.947a9.379,9.379,0,0,0,8.766,8.682l-.009,1.653a.557.557,0,0,0,.559.555h0a.557.557,0,0,0,.562-.549l.009-1.644a9.384,9.384,0,0,0,8.981-8.7H33.3a.552.552,0,1,0,0-1.1M21.447,46.284A8.265,8.265,0,0,1,13.8,38.708h7.686Zm.047-8.679H13.8a8.265,8.265,0,0,1,7.736-7.628ZM30,35.5l-2.142,2.1H26.2l3.3-3.242A8.062,8.062,0,0,1,30,35.5m-1.1-2.106-4.288,4.209H23.383l4.97-4.879a8.2,8.2,0,0,1,.542.67m-6.237-3.421q.419.027.826.093l-.83.815Zm-.013,2.477,2.11-2.071a8.339,8.339,0,0,1,1.165.484l-3.284,3.223Zm-.017,3.2,4.281-4.2q.336.233.646.5l-4.933,4.842ZM22.57,46.3l.041-7.591h7.808A8.269,8.269,0,0,1,22.57,46.3m6.873-8.694.876-.86a8.016,8.016,0,0,1,.1.86Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_19"
                          data-name="패스 19"
                          d="M20.026,13.779l-2.739,8.552h1.076l.837-2.69H22.06l.861,2.69h1.113l-2.751-8.552Zm-.61,5,.789-2.474c.155-.521.287-1.041.407-1.548h.024c.12.495.239,1,.418,1.561l.789,2.462Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_20"
                          data-name="패스 20"
                          d="M30.242,13.779v8.552h1.041v-4.01h3.9v4.01h1.053V13.779H35.182v3.578h-3.9V13.779Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_21"
                          data-name="패스 21"
                          d="M7.623,10.772a.557.557,0,0,0,.562.551h28.17a.552.552,0,1,0,0-1.1H8.185a.557.557,0,0,0-.562.551"
                          fill="#fff"
                        />
                        <path
                          id="패스_22"
                          data-name="패스 22"
                          d="M15.194,18.575l.2,3.756h1.017l-.5-8.552H14.584l-1.435,4.136c-.359,1.079-.646,2.017-.849,2.88h-.036c-.2-.888-.478-1.827-.814-2.88l-1.375-4.136H8.747l-.562,8.552h.992l.215-3.667c.072-1.281.131-2.715.155-3.781h.024c.227,1.015.55,2.119.933,3.325l1.3,4.073H12.6l1.423-4.149c.407-1.18.742-2.246,1.017-3.248h.036c-.012,1.066.06,2.5.12,3.692"
                          fill="#fff"
                        />
                        <path
                          id="패스_23"
                          data-name="패스 23"
                          d="M36.355,24.321H8.185a.552.552,0,1,0,0,1.1h28.17a.552.552,0,1,0,0-1.1"
                          fill="#fff"
                        />
                        <path
                          id="패스_24"
                          data-name="패스 24"
                          d="M26.881,22.331V14.718h2.464v-.939H23.376v.939h2.452v7.613Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object-2"
                    data-name="Vector Smart Object"
                    transform="matrix(0, 1, -1, 0, 72, 54)"
                  >
                    <g id="그룹_8" data-name="그룹 8">
                      <g
                        id="그룹_7"
                        data-name="그룹 7"
                        clipPath="url(#clipPath-4)"
                      >
                        <path
                          id="패스_25"
                          data-name="패스 25"
                          d="M32.585,38.913V2.609A2.6,2.6,0,0,0,30.008,0H2.576A2.6,2.6,0,0,0,0,2.609v36.3a2.6,2.6,0,0,0,2.576,2.609H30.008a2.6,2.6,0,0,0,2.576-2.609m-31.6,0V2.609A1.6,1.6,0,0,1,2.576,1H30.008a1.6,1.6,0,0,1,1.59,1.61v36.3a1.6,1.6,0,0,1-1.59,1.61H2.576a1.6,1.6,0,0,1-1.59-1.61"
                          fill="#fff"
                        />
                        <path
                          id="패스_26"
                          data-name="패스 26"
                          d="M30.357,3.507a1.245,1.245,0,0,0-1.235-1.251H3.463A1.245,1.245,0,0,0,2.228,3.507V38.015a1.245,1.245,0,0,0,1.235,1.251H29.122a1.245,1.245,0,0,0,1.235-1.251Zm-.986,34.508a.251.251,0,0,1-.249.253H3.463a.251.251,0,0,1-.249-.253v-3.1H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.052,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,34.763v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m2.96-.851h-.884c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V29.387H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,29.239v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.851h-.884c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214v-4.35H22.272c.051,1.17.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.052,1.17.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884Zm-6.118-4.5v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m2.96-.851h-.884c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V18.6H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,18.457v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.851h-.884c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V13.212H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,13.064v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.851h-.884c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V8.1h9.6c.127,1.046.743,1.817,1.508,1.817s1.381-.772,1.508-1.817h.143c.127,1.046.743,1.817,1.508,1.817s1.381-.772,1.508-1.817h.142c.127,1.046.743,1.817,1.508,1.817S22.023,9.146,22.15,8.1h.142c.127,1.046.743,1.817,1.508,1.817s1.381-.772,1.508-1.817h.142c.127,1.046.743,1.817,1.508,1.817S28.34,9.146,28.467,8.1h.9ZM13.777,7.7V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.6h-.879V7c0-1.243-.673-2.216-1.533-2.216S25.425,5.757,25.425,7v.1h-.092V7c0-1.243-.673-2.216-1.533-2.216S22.267,5.757,22.267,7v.1h-.092V7c0-1.243-.674-2.216-1.533-2.216S19.108,5.757,19.108,7v.1h-.092V7c0-1.243-.674-2.216-1.533-2.216S15.95,5.757,15.95,7v.1h-.092V7c0-1.243-.673-2.216-1.533-2.216S12.791,5.757,12.791,7v.1H3.214V3.507a.251.251,0,0,1,.249-.253H29.122a.251.251,0,0,1,.249.253Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_4"
                    data-name="Vector Smart Object copy 4"
                    transform="matrix(0, 1, -1, 0, 581, 273)"
                  >
                    <g id="그룹_10" data-name="그룹 10">
                      <g
                        id="그룹_9"
                        data-name="그룹 9"
                        clipPath="url(#clipPath-4)"
                      >
                        <path
                          id="패스_27"
                          data-name="패스 27"
                          d="M32.585,38.913V2.609A2.6,2.6,0,0,0,30.008,0H2.576A2.6,2.6,0,0,0,0,2.609v36.3a2.6,2.6,0,0,0,2.576,2.609H30.008a2.6,2.6,0,0,0,2.576-2.609m-31.6,0V2.609A1.6,1.6,0,0,1,2.576,1H30.008a1.6,1.6,0,0,1,1.59,1.61v36.3a1.6,1.6,0,0,1-1.59,1.61H2.576a1.6,1.6,0,0,1-1.59-1.61"
                          fill="#fff"
                        />
                        <path
                          id="패스_28"
                          data-name="패스 28"
                          d="M30.357,3.507a1.245,1.245,0,0,0-1.235-1.251H3.463A1.245,1.245,0,0,0,2.228,3.507V38.015a1.245,1.245,0,0,0,1.235,1.251H29.122a1.245,1.245,0,0,0,1.235-1.251Zm-.986,34.508a.251.251,0,0,1-.249.253H3.463a.251.251,0,0,1-.249-.253v-3.1H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.052,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,34.763v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m2.96-.851h-.884c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V29.387H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,29.239v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.851h-.884c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214v-4.35H22.272c.051,1.17.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.052,1.17.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884Zm-6.118-4.5v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m2.96-.851h-.884c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V18.6H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,18.457v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.851h-.884c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V13.212H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,13.064v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.851h-.884c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V8.1h9.6c.127,1.046.743,1.817,1.508,1.817s1.381-.772,1.508-1.817h.143c.127,1.046.743,1.817,1.508,1.817s1.381-.772,1.508-1.817h.142c.127,1.046.743,1.817,1.508,1.817S22.023,9.146,22.15,8.1h.142c.127,1.046.743,1.817,1.508,1.817s1.381-.772,1.508-1.817h.142c.127,1.046.743,1.817,1.508,1.817S28.34,9.146,28.467,8.1h.9ZM13.777,7.7V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.6h-.879V7c0-1.243-.673-2.216-1.533-2.216S25.425,5.757,25.425,7v.1h-.092V7c0-1.243-.673-2.216-1.533-2.216S22.267,5.757,22.267,7v.1h-.092V7c0-1.243-.674-2.216-1.533-2.216S19.108,5.757,19.108,7v.1h-.092V7c0-1.243-.674-2.216-1.533-2.216S15.95,5.757,15.95,7v.1h-.092V7c0-1.243-.673-2.216-1.533-2.216S12.791,5.757,12.791,7v.1H3.214V3.507a.251.251,0,0,1,.249-.253H29.122a.251.251,0,0,1,.249.253Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_29"
                    data-name="Vector Smart Object copy 29"
                    transform="translate(629 226)"
                  >
                    <g id="그룹_12" data-name="그룹 12">
                      <g
                        id="그룹_11"
                        data-name="그룹 11"
                        clipPath="url(#clipPath-6)"
                      >
                        <path
                          id="패스_29"
                          data-name="패스 29"
                          d="M6.254,37.668a1.726,1.726,0,1,0,1.775,1.725,1.752,1.752,0,0,0-1.775-1.725m0,2.247a.522.522,0,1,1,.537-.521.53.53,0,0,1-.537.521"
                          fill="#fff"
                        />
                        <path
                          id="패스_30"
                          data-name="패스 30"
                          d="M9.9,21.46H9.91l2.182-.024a.634.634,0,0,0,.2-.036l24.737.036,2.153.024h.007a.6.6,0,1,0,.007-1.2l-1.558-.017a12.269,12.269,0,0,0-.3-2.189l1.507-.377a.6.6,0,0,0,.445-.733.62.62,0,0,0-.754-.433l-1.525.382a12.388,12.388,0,0,0-.844-1.945l1.311-.722a.593.593,0,0,0,.234-.82.629.629,0,0,0-.844-.227l-1.327.731a12.812,12.812,0,0,0-1.326-1.662l1.1-1.057a.59.59,0,0,0,.006-.851.631.631,0,0,0-.875-.006L33.331,11.4a13.137,13.137,0,0,0-1.714-1.269l.794-1.323a.593.593,0,0,0-.222-.823.63.63,0,0,0-.847.216l-.8,1.328a13.268,13.268,0,0,0-1.986-.8l.415-1.486a.6.6,0,0,0-.436-.738.62.62,0,0,0-.759.423l-.416,1.49a13.365,13.365,0,0,0-2.131-.276l0-1.54a.61.61,0,0,0-.618-.6h0A.611.611,0,0,0,24,6.6l0,1.539a13.374,13.374,0,0,0-2.265.292l-.419-1.5a.621.621,0,0,0-.76-.423.6.6,0,0,0-.435.738l.42,1.5a13.089,13.089,0,0,0-1.977.807L17.746,8.2a.629.629,0,0,0-.847-.216.593.593,0,0,0-.223.823l.813,1.353a13.109,13.109,0,0,0-1.695,1.274l-1.148-1.1a.631.631,0,0,0-.875.006.59.59,0,0,0,.006.851l1.142,1.1A12.8,12.8,0,0,0,13.61,13.94l-1.385-.763a.628.628,0,0,0-.844.227.593.593,0,0,0,.233.82l1.372.756a12.331,12.331,0,0,0-.83,1.93l-1.6-.4a.62.62,0,0,0-.754.433.6.6,0,0,0,.445.733l1.586.4a12.374,12.374,0,0,0-.295,2.168L9.9,20.257a.6.6,0,1,0,.007,1.2m6.339-8.78a11.9,11.9,0,0,1,8.33-3.355H24.6a12.039,12.039,0,0,1,5.853,1.523l.009.007.011,0a11.76,11.76,0,0,1,4.308,4.146l0,.006.007.008a11.237,11.237,0,0,1,1.164,2.649.335.335,0,0,0,.049.175,11.1,11.1,0,0,1,.389,2.389L12.778,20.2a11.275,11.275,0,0,1,3.464-7.517"
                          fill="#fff"
                        />
                        <path
                          id="패스_31"
                          data-name="패스 31"
                          d="M3.909,15.4V15.4a20.192,20.192,0,0,0-.73,4.779l-1.685,0h0a.627.627,0,0,0-.437.175.593.593,0,0,0-.182.425L.86,29.231a.61.61,0,0,0,.618.6l3.391.005.019,0h0l.019,0,3.9.006.021,0h0l.02,0,3.9.006.019,0h0l.019,0,3.9.005.02,0h0l.02,0,3.9.006.019,0h0l.018,0,3.9.006.02,0h0l.02,0,3.9.006.018,0h0l.018,0,3.9.006.02,0h0l.02,0,3.9.005.018,0h0l.018,0,3.9.006.019,0h0l.019,0,3.9.006.017,0h0l.017,0,3.392.005h0a.628.628,0,0,0,.437-.176.592.592,0,0,0,.182-.425l.013-8.45a.593.593,0,0,0-.181-.426.629.629,0,0,0-.437-.177l-1.686,0a20.169,20.169,0,0,0-.716-4.782v-.005l0,0a20.381,20.381,0,0,0-2.109-4.974c-.007-.015-.013-.031-.021-.046a.64.64,0,0,0-.043-.058,21.027,21.027,0,0,0-3.271-4.156.589.589,0,0,0-.083-.1.607.607,0,0,0-.1-.078,21.487,21.487,0,0,0-4.271-3.194A.616.616,0,0,0,35.32,2.8a.61.61,0,0,0-.085-.037A21.627,21.627,0,0,0,30.187.727l-.028-.01-.024,0A21.943,21.943,0,0,0,24.618,0h-.033A21.933,21.933,0,0,0,19.1.7l-.022,0-.027.01a21.627,21.627,0,0,0-5.053,2.024.662.662,0,0,0-.089.039.6.6,0,0,0-.065.046A21.5,21.5,0,0,0,9.564,6a.6.6,0,0,0-.1.077.611.611,0,0,0-.084.1A21.023,21.023,0,0,0,6.1,10.32a.584.584,0,0,0-.046.061.491.491,0,0,0-.023.05,20.365,20.365,0,0,0-2.122,4.964l0,0m1.045.9,2.887.756A.631.631,0,0,0,8,17.073a.617.617,0,0,0,.6-.445.6.6,0,0,0-.437-.738l-2.888-.757a19.177,19.177,0,0,1,1.554-3.622l2.586,1.456a.632.632,0,0,0,.31.081.622.622,0,0,0,.536-.3.592.592,0,0,0-.225-.822L7.452,10.472a19.829,19.829,0,0,1,2.466-3.1l2.1,2.05a.632.632,0,0,0,.875,0,.59.59,0,0,0,0-.851l-2.1-2.05A20.254,20.254,0,0,1,14,4.131l1.488,2.513a.622.622,0,0,0,.537.3.631.631,0,0,0,.308-.08.593.593,0,0,0,.228-.822L15.067,3.528a20.374,20.374,0,0,1,3.73-1.5l.769,2.808a.617.617,0,0,0,.6.447.632.632,0,0,0,.16-.02.6.6,0,0,0,.439-.736l-.769-2.806a20.676,20.676,0,0,1,4-.5l0,2.9a.611.611,0,0,0,.618.6h0a.61.61,0,0,0,.619-.6l0-2.9a20.7,20.7,0,0,1,4,.515l-.778,2.8a.6.6,0,0,0,.437.738.646.646,0,0,0,.161.021.617.617,0,0,0,.6-.446l.778-2.806a20.392,20.392,0,0,1,3.726,1.509l-1.5,2.512a.593.593,0,0,0,.225.822.63.63,0,0,0,.31.081.623.623,0,0,0,.536-.3l1.5-2.509a20.255,20.255,0,0,1,3.194,2.4L36.312,8.6a.59.59,0,0,0,0,.851.632.632,0,0,0,.875,0l2.109-2.044a19.819,19.819,0,0,1,2.456,3.111l-2.586,1.447a.592.592,0,0,0-.228.821.63.63,0,0,0,.845.221l2.59-1.448a19.2,19.2,0,0,1,1.542,3.626l-2.891.748a.6.6,0,0,0-.439.736.617.617,0,0,0,.6.447.646.646,0,0,0,.159-.02l2.889-.748a19.032,19.032,0,0,1,.519,3.891l-2.988,0h0a.6.6,0,1,0,0,1.2l3.619.005h0l1.676,0L47.049,28.7l-2.172,0,0-2.915a.61.61,0,0,0-.618-.6h0a.61.61,0,0,0-.619.6l0,2.915-2.7,0,0-1.518a.61.61,0,0,0-.618-.6h0a.61.61,0,0,0-.619.6l0,1.518-2.7,0,0-2.915a.611.611,0,0,0-.618-.6h0a.61.61,0,0,0-.619.6l0,2.915-2.7,0,0-1.518a.61.61,0,0,0-.618-.6h0a.611.611,0,0,0-.619.6l0,1.518-2.7,0,0-2.915a.611.611,0,0,0-.618-.6h0a.61.61,0,0,0-.619.6l0,2.915-2.7,0,0-1.518a.61.61,0,0,0-.618-.6h0a.611.611,0,0,0-.619.6l0,1.518-2.7,0,0-2.915a.61.61,0,0,0-.618-.6h0a.61.61,0,0,0-.619.6l0,2.915-2.7,0,0-1.518a.611.611,0,0,0-.618-.6h0a.611.611,0,0,0-.619.6l0,1.518-2.7,0,0-2.915a.61.61,0,0,0-.618-.6h0a.611.611,0,0,0-.619.6l0,2.915-2.7,0,0-1.518a.611.611,0,0,0-.618-.6h0a.61.61,0,0,0-.619.6l0,1.518-2.7,0,0-2.915a.61.61,0,0,0-.618-.6h0a.61.61,0,0,0-.619.6l0,2.915-2.172,0,.011-7.246,1.676,0h0l3.62.005h0a.6.6,0,1,0,0-1.2l-2.988,0a19.042,19.042,0,0,1,.531-3.89"
                          fill="#fff"
                        />
                        <path
                          id="패스_32"
                          data-name="패스 32"
                          d="M0,33.142V43.4a.592.592,0,0,0,.181.425A.628.628,0,0,0,.619,44H49.381a.629.629,0,0,0,.438-.176A.593.593,0,0,0,50,43.4V33.143a.611.611,0,0,0-.619-.6H.619a.611.611,0,0,0-.619.6m1.238.6H3.75v3.122a.619.619,0,0,0,1.238,0V33.744H7.853v2.129a.619.619,0,0,0,1.238,0V33.744h2.865v3.122a.619.619,0,0,0,1.238,0V33.744h2.865v2.129a.619.619,0,0,0,1.238,0V33.744h2.865v3.121a.619.619,0,0,0,1.238,0V33.744h2.864v2.129a.619.619,0,0,0,1.238,0V33.744h2.865v3.121a.619.619,0,0,0,1.238,0V33.744h2.865v2.129a.619.619,0,0,0,1.238,0V33.745h2.865v3.121a.619.619,0,0,0,1.238,0V33.745h2.865v2.129a.619.619,0,0,0,1.238,0V33.745h2.864v3.121a.619.619,0,0,0,1.238,0V33.745h2.748V42.8H1.238Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_19"
                    data-name="Vector Smart Object copy 19"
                    transform="translate(431 29)"
                  >
                    <g id="그룹_14" data-name="그룹 14">
                      <g
                        id="그룹_13"
                        data-name="그룹 13"
                        clipPath="url(#clipPath-7)"
                      >
                        <path
                          id="패스_33"
                          data-name="패스 33"
                          d="M34.574,13.186l-3.305,5.609q-.131-.232-.262-.455l-2.824-5.146a.924.924,0,0,0-.8-.448H24.491a.921.921,0,0,0-.8.459.852.852,0,0,0,.026.891l4.916,7.741-5.117,7.4a.855.855,0,0,0-.06.914.919.919,0,0,0,.812.474H27.1a.928.928,0,0,0,.793-.441l2.922-5.046.316-.5c.108.18.207.34.3.478L34.31,30.2a.93.93,0,0,0,.784.426H37.98a.92.92,0,0,0,.808-.467.851.851,0,0,0-.04-.9l-4.961-7.478,5.063-7.671a.856.856,0,0,0,.04-.9.92.92,0,0,0-.807-.466H35.367a.932.932,0,0,0-.793.441m3.04.691-4.9,7.417a.852.852,0,0,0-.005.97l4.8,7.23H35.247l-2.8-4.945c-.209-.329-.461-.75-.75-1.254A.591.591,0,0,0,31.183,23h-.068a.591.591,0,0,0-.513.291c-.03.052-.172.284-.8,1.275l-2.852,4.925H24.746l4.941-7.148a.851.851,0,0,0,.026-.971l-4.762-7.5h2.278l2.747,5.005c.244.417.486.851.718,1.288a.59.59,0,0,0,.523.308h.068a.591.591,0,0,0,.51-.286l3.722-6.316Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_34"
                          data-name="패스 34"
                          d="M1.772,18.955a.805.805,0,0,0,1.047.383l3.246-1.408,4.331,12.2A2.861,2.861,0,0,0,13.109,32l.113,0a2.86,2.86,0,0,0,2.662-2.065L23.023,5.1H37.286a.779.779,0,0,0,.792-.764V.764A.779.779,0,0,0,37.286,0H20.806A2.848,2.848,0,0,0,18.03,2.07L12.75,20.827,10.5,13.558a2.859,2.859,0,0,0-.691-1.117,2.939,2.939,0,0,0-3.224-.582L.467,14.512a.77.77,0,0,0-.416.426.74.74,0,0,0,.024.6Zm5.292-6.064A1.694,1.694,0,0,1,9.38,13.9l2.639,8.514a.8.8,0,0,0,1.515-.05L19.166,2.359a1.682,1.682,0,0,1,1.64-1.227H36.9V3.966H22.733a.785.785,0,0,0-.765.564L14.749,29.641a1.689,1.689,0,0,1-1.568,1.225h-.072a1.689,1.689,0,0,1-1.6-1.1L7.04,17.181a.778.778,0,0,0-.435-.453.82.82,0,0,0-.64,0L2.678,18.158,1.305,15.389Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_20"
                    data-name="Vector Smart Object copy 20"
                    transform="translate(627 115)"
                  >
                    <g id="그룹_16" data-name="그룹 16">
                      <g
                        id="그룹_15"
                        data-name="그룹 15"
                        clipPath="url(#clipPath-7)"
                      >
                        <path
                          id="패스_35"
                          data-name="패스 35"
                          d="M34.574,13.186l-3.305,5.609q-.131-.232-.262-.455l-2.824-5.146a.924.924,0,0,0-.8-.448H24.491a.921.921,0,0,0-.8.459.852.852,0,0,0,.026.891l4.916,7.741-5.117,7.4a.855.855,0,0,0-.06.914.919.919,0,0,0,.812.474H27.1a.928.928,0,0,0,.793-.441l2.922-5.046.316-.5c.108.18.207.34.3.478L34.31,30.2a.93.93,0,0,0,.784.426H37.98a.92.92,0,0,0,.808-.467.851.851,0,0,0-.04-.9l-4.961-7.478,5.063-7.671a.856.856,0,0,0,.04-.9.92.92,0,0,0-.807-.466H35.367a.932.932,0,0,0-.793.441m3.04.691-4.9,7.417a.852.852,0,0,0-.005.97l4.8,7.23H35.247l-2.8-4.945c-.209-.329-.461-.75-.75-1.254A.591.591,0,0,0,31.183,23h-.068a.591.591,0,0,0-.513.291c-.03.052-.172.284-.8,1.275l-2.852,4.925H24.746l4.941-7.148a.851.851,0,0,0,.026-.971l-4.762-7.5h2.278l2.747,5.005c.244.417.486.851.718,1.288a.59.59,0,0,0,.523.308h.068a.591.591,0,0,0,.51-.286l3.722-6.316Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_36"
                          data-name="패스 36"
                          d="M1.772,18.955a.805.805,0,0,0,1.047.383l3.246-1.408,4.331,12.2A2.861,2.861,0,0,0,13.109,32l.113,0a2.86,2.86,0,0,0,2.662-2.065L23.023,5.1H37.286a.779.779,0,0,0,.792-.764V.764A.779.779,0,0,0,37.286,0H20.806A2.848,2.848,0,0,0,18.03,2.07L12.75,20.827,10.5,13.558a2.859,2.859,0,0,0-.691-1.117,2.939,2.939,0,0,0-3.224-.582L.467,14.512a.77.77,0,0,0-.416.426.74.74,0,0,0,.024.6Zm5.292-6.064A1.694,1.694,0,0,1,9.38,13.9l2.639,8.514a.8.8,0,0,0,1.515-.05L19.166,2.359a1.682,1.682,0,0,1,1.64-1.227H36.9V3.966H22.733a.785.785,0,0,0-.765.564L14.749,29.641a1.689,1.689,0,0,1-1.568,1.225h-.072a1.689,1.689,0,0,1-1.6-1.1L7.04,17.181a.778.778,0,0,0-.435-.453.82.82,0,0,0-.64,0L2.678,18.158,1.305,15.389Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_6"
                    data-name="Vector Smart Object copy 6"
                    transform="translate(183 51)"
                  >
                    <g id="그룹_18" data-name="그룹 18">
                      <g
                        id="그룹_17"
                        data-name="그룹 17"
                        clipPath="url(#clipPath-9)"
                      >
                        <path
                          id="패스_37"
                          data-name="패스 37"
                          d="M36.068,32.243H21.955a.938.938,0,0,0-.932.941v1.875a.938.938,0,0,0,.932.941H36.068A.938.938,0,0,0,37,35.058V33.185a.938.938,0,0,0-.932-.942M35.813,34.8H22.21V33.443h13.6Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_38"
                          data-name="패스 38"
                          d="M15.977,35.059V33.184a.938.938,0,0,0-.932-.941H.932A.938.938,0,0,0,0,33.185v1.873A.938.938,0,0,0,.932,36H15.045a.938.938,0,0,0,.932-.941M14.79,34.8H1.188V33.443h13.6Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_39"
                          data-name="패스 39"
                          d="M0,28.009V30.5a.94.94,0,0,0,.435.8.919.919,0,0,0,.9.052l13.68-6.629a.946.946,0,0,0,.012-1.693L1.347,16.153a.917.917,0,0,0-.906.042A.939.939,0,0,0,0,17v2.751a.952.952,0,0,0,.545.857L7.8,23.878.531,27.158A.948.948,0,0,0,0,28.009m1.187.167,7.635-3.447a.947.947,0,0,0-.013-1.708L1.187,19.581V17.413L14.03,23.869,1.187,30.091Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_40"
                          data-name="패스 40"
                          d="M16.063,3.695V.943a.939.939,0,0,0-.441-.8A.915.915,0,0,0,14.716.1L1.036,6.975a.947.947,0,0,0,.012,1.694L14.729,15.3a.919.919,0,0,0,.9-.052.939.939,0,0,0,.435-.8V11.956a.951.951,0,0,0-.544-.857L8.267,7.825l7.264-3.28a.947.947,0,0,0,.532-.851m-1.187-.168L7.241,6.974a.947.947,0,0,0,.012,1.708l7.623,3.441v1.915L2.033,7.815,14.876,1.36Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_41"
                          data-name="패스 41"
                          d="M21.385,11.955v2.493a.94.94,0,0,0,.435.8.919.919,0,0,0,.9.052L36.4,8.669a.946.946,0,0,0,.013-1.693L22.733.1a.917.917,0,0,0-.906.042.939.939,0,0,0-.441.8V3.695a.951.951,0,0,0,.545.857l7.251,3.273L21.917,11.1a.947.947,0,0,0-.532.851m1.187.168,7.635-3.447a.947.947,0,0,0-.013-1.708L22.573,3.527V1.36L35.416,7.815,22.573,14.038Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_42"
                          data-name="패스 42"
                          d="M36.559,16.2a.915.915,0,0,0-.906-.042l-13.68,6.876a.947.947,0,0,0,.012,1.694l13.68,6.628a.919.919,0,0,0,.9-.052A.94.94,0,0,0,37,30.5V28.009a.953.953,0,0,0-.544-.857L29.2,23.878,36.468,20.6A.948.948,0,0,0,37,19.748V17a.939.939,0,0,0-.441-.8m-.746,3.385-7.635,3.447a.947.947,0,0,0,.013,1.708l7.623,3.441v1.915L22.97,23.869l12.843-6.455Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_8"
                    data-name="Vector Smart Object copy 8"
                    transform="translate(120 93)"
                  >
                    <g id="그룹_20" data-name="그룹 20">
                      <g
                        id="그룹_19"
                        data-name="그룹 19"
                        clipPath="url(#clipPath-10)"
                      >
                        <path
                          id="패스_43"
                          data-name="패스 43"
                          d="M22.02,7.462H15.538V.98a.98.98,0,0,0-.98-.98H8.442a.98.98,0,0,0-.981.98V7.462H.98a.98.98,0,0,0-.98.98v6.116a.98.98,0,0,0,.98.98H7.462V22.02a.98.98,0,0,0,.981.98h6.116a.98.98,0,0,0,.98-.98V15.538H22.02a.98.98,0,0,0,.98-.98V8.442a.98.98,0,0,0-.98-.98m-.98,6.116H14.558a.98.98,0,0,0-.98.98V21.04H9.422V14.558a.98.98,0,0,0-.98-.98H1.96V9.422H8.442a.98.98,0,0,0,.98-.98V1.96h4.156V8.442a.98.98,0,0,0,.98.98H21.04Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_24"
                    data-name="Vector Smart Object copy 24"
                    transform="translate(362 48)"
                  >
                    <g id="그룹_22" data-name="그룹 22">
                      <g
                        id="그룹_21"
                        data-name="그룹 21"
                        clipPath="url(#clipPath-10)"
                      >
                        <path
                          id="패스_44"
                          data-name="패스 44"
                          d="M22.02,7.462H15.538V.98a.98.98,0,0,0-.98-.98H8.442a.98.98,0,0,0-.981.98V7.462H.98a.98.98,0,0,0-.98.98v6.116a.98.98,0,0,0,.98.98H7.462V22.02a.98.98,0,0,0,.981.98h6.116a.98.98,0,0,0,.98-.98V15.538H22.02a.98.98,0,0,0,.98-.98V8.442a.98.98,0,0,0-.98-.98m-.98,6.116H14.558a.98.98,0,0,0-.98.98V21.04H9.422V14.558a.98.98,0,0,0-.98-.98H1.96V9.422H8.442a.98.98,0,0,0,.98-.98V1.96h4.156V8.442a.98.98,0,0,0,.98.98H21.04Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_27"
                    data-name="Vector Smart Object copy 27"
                    transform="translate(481 330)"
                  >
                    <g id="그룹_24" data-name="그룹 24">
                      <g
                        id="그룹_23"
                        data-name="그룹 23"
                        clipPath="url(#clipPath-10)"
                      >
                        <path
                          id="패스_45"
                          data-name="패스 45"
                          d="M22.02,7.462H15.538V.98a.98.98,0,0,0-.98-.98H8.442a.98.98,0,0,0-.981.98V7.462H.98a.98.98,0,0,0-.98.98v6.116a.98.98,0,0,0,.98.98H7.462V22.02a.98.98,0,0,0,.981.98h6.116a.98.98,0,0,0,.98-.98V15.538H22.02a.98.98,0,0,0,.98-.98V8.442a.98.98,0,0,0-.98-.98m-.98,6.116H14.558a.98.98,0,0,0-.98.98V21.04H9.422V14.558a.98.98,0,0,0-.98-.98H1.96V9.422H8.442a.98.98,0,0,0,.98-.98V1.96h4.156V8.442a.98.98,0,0,0,.98.98H21.04Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_9"
                    data-name="Vector Smart Object copy 9"
                    transform="translate(590 170)"
                  >
                    <g id="그룹_26" data-name="그룹 26">
                      <g
                        id="그룹_25"
                        data-name="그룹 25"
                        clipPath="url(#clipPath-13)"
                      >
                        <path
                          id="패스_46"
                          data-name="패스 46"
                          d="M.895,7h19.21A.873.873,0,0,0,21,6.15V.85A.873.873,0,0,0,20.105,0H.895A.873.873,0,0,0,0,.85v5.3A.873.873,0,0,0,.895,7M1.79,1.7H19.21V5.3H1.79Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy"
                    data-name="Vector Smart Object copy"
                    transform="translate(106 165)"
                  >
                    <g id="그룹_28" data-name="그룹 28">
                      <g
                        id="그룹_27"
                        data-name="그룹 27"
                        clipPath="url(#clipPath-13)"
                      >
                        <path
                          id="패스_47"
                          data-name="패스 47"
                          d="M.895,7h19.21A.873.873,0,0,0,21,6.15V.85A.873.873,0,0,0,20.105,0H.895A.873.873,0,0,0,0,.85v5.3A.873.873,0,0,0,.895,7M1.79,1.7H19.21V5.3H1.79Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_3"
                    data-name="Vector Smart Object copy 3"
                  >
                    <g id="그룹_30" data-name="그룹 30">
                      <g
                        id="그룹_29"
                        data-name="그룹 29"
                        clipPath="url(#clipPath-15)"
                      >
                        <path
                          id="패스_48"
                          data-name="패스 48"
                          d="M369.7,351.163l.117.237a.687.687,0,0,0,.409.346.864.864,0,0,0,.389.051.832.832,0,0,0,.353-.124,1.1,1.1,0,0,0,.3-.281,1.6,1.6,0,0,0,.218-.424,1.456,1.456,0,0,0,.086-.418.962.962,0,0,0-.048-.36.727.727,0,0,0-.179-.281.836.836,0,0,0-.307-.186.826.826,0,0,0-.445-.038.752.752,0,0,0-.19.065l-.246.121.465-1.324-.211-.076-1.024,2.92.211.076Zm.272-.775a.923.923,0,0,1,.149-.273.751.751,0,0,1,.22-.19.683.683,0,0,1,.273-.084.719.719,0,0,1,.542.189.579.579,0,0,1,.14.227.792.792,0,0,1,.037.291,1.2,1.2,0,0,1-.07.338,1.51,1.51,0,0,1-.178.359.952.952,0,0,1-.233.241.611.611,0,0,1-.577.076.665.665,0,0,1-.24-.147.65.65,0,0,1-.15-.22.734.734,0,0,1-.054-.262.787.787,0,0,1,.046-.28Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_49"
                          data-name="패스 49"
                          d="M366.966,364.77l9.319,3.341a1.3,1.3,0,0,0,1.633-.841l6.334-18.053a1.317,1.317,0,0,0-.743-1.693l-25.9-9.285a1.3,1.3,0,0,0-1.633.841l-6.334,18.053a1.316,1.316,0,0,0,.743,1.693l9.63,3.452-8.566,7.162a.341.341,0,0,0-.045.476.332.332,0,0,0,.471.045l.154-.129,8.721-7.291,2.453.879-3.247,9.254h0a.339.339,0,0,0,.2.432.334.334,0,0,0,.427-.206h0l3.247-9.254,2.375.851L369,375.915l.053.217a.335.335,0,0,0,.405.247.339.339,0,0,0,.245-.409Zm-16.356-6.582a.639.639,0,0,1-.336-.829l6.334-18.053a.628.628,0,0,1,.778-.429l25.9,9.285a.639.639,0,0,1,.336.829l-6.334,18.053a.628.628,0,0,1-.778.429Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_50"
                          data-name="패스 50"
                          d="M364.537,344.69a.333.333,0,0,0-.6.067l-3.116,8.88-.552,1.573a.339.339,0,0,0,.2.432l1.4.5,11.7,4.194a.332.332,0,0,0,.373-.107.341.341,0,0,0,.022-.392Zm-2.755,10.7-.768-.275.328-.935.768.275Zm9.207,3.3-8.576-3.074.44-1.254a.339.339,0,0,0-.2-.432l-1.084-.389,2.773-7.9,7.476,12.009a2.979,2.979,0,0,0-.826,1.043m.635.228a2.307,2.307,0,0,1,.549-.694l.714,1.147Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_51"
                          data-name="패스 51"
                          d="M382.581,350.179a1.36,1.36,0,0,0-.768-1.749l-23.452-8.407a1.338,1.338,0,0,0-1.686.87l-5.36,15.278a1.36,1.36,0,0,0,.767,1.749l23.452,8.407a1.338,1.338,0,0,0,1.686-.87Zm-5.991,15.052a.671.671,0,0,1-.832.458l-23.452-8.408a.682.682,0,0,1-.36-.885l5.36-15.278a.671.671,0,0,1,.832-.458l23.452,8.408a.682.682,0,0,1,.36.885Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_52"
                          data-name="패스 52"
                          d="M368.349,358.844a1.56,1.56,0,0,0-1.168-.432,1.343,1.343,0,0,0-.542.163,1.438,1.438,0,0,0-.428.37,1.788,1.788,0,0,0-.282.518,1.707,1.707,0,0,0-.1.557,1.381,1.381,0,0,0,.1.525,1.249,1.249,0,0,0,.3.437,1.338,1.338,0,0,0,.486.29,1.46,1.46,0,0,0,.779.067.221.221,0,0,0,.161-.142l.1-.281a.221.221,0,0,0-.048-.226.214.214,0,0,0-.221-.058.772.772,0,0,1-.5-.011.616.616,0,0,1-.242-.148.553.553,0,0,1-.127-.209.718.718,0,0,1-.031-.266,1.146,1.146,0,0,1,.063-.307,1.086,1.086,0,0,1,.156-.3.778.778,0,0,1,.212-.2.6.6,0,0,1,.248-.084.638.638,0,0,1,.287.04.789.789,0,0,1,.374.28.215.215,0,0,0,.207.086.217.217,0,0,0,.172-.144l.106-.3a.222.222,0,0,0-.052-.23m-.733.1a.856.856,0,0,0-.387-.051.821.821,0,0,0-.339.116,1,1,0,0,0-.273.253,1.312,1.312,0,0,0-.189.357,1.377,1.377,0,0,0-.076.368.947.947,0,0,0,.042.35.778.778,0,0,0,.178.294.833.833,0,0,0,.328.2.921.921,0,0,0,.637.006l-.094.277a1.2,1.2,0,0,1-.574-.035l-.2-.09.095.053-.1-.036.105.038.094.034c-.031-.009-.062-.016-.094-.027a1.1,1.1,0,0,1-.392-.236,1.024,1.024,0,0,1-.245-.358,1.157,1.157,0,0,1-.081-.438,1.48,1.48,0,0,1,.088-.483,1.562,1.562,0,0,1,.246-.453,1.212,1.212,0,0,1,.362-.312,1.118,1.118,0,0,1,.453-.136,1.237,1.237,0,0,1,.515.075,1.312,1.312,0,0,1,.475.291l-.1.3a1.006,1.006,0,0,0-.479-.358"
                          fill="#fff"
                        />
                        <path
                          id="패스_53"
                          data-name="패스 53"
                          d="M369.887,351.2a.65.65,0,0,0,.15.22.665.665,0,0,0,.24.147.611.611,0,0,0,.577-.076.952.952,0,0,0,.233-.241,1.51,1.51,0,0,0,.178-.359,1.2,1.2,0,0,0,.07-.338.792.792,0,0,0-.037-.291.579.579,0,0,0-.14-.227.719.719,0,0,0-.542-.189.683.683,0,0,0-.273.084.751.751,0,0,0-.22.19.923.923,0,0,0-.149.273l-.093.265a.787.787,0,0,0-.046.28.737.737,0,0,0,.054.262m.3-.732a.7.7,0,0,1,.112-.207.527.527,0,0,1,.155-.134.459.459,0,0,1,.185-.057h0a.489.489,0,0,1,.211.031.408.408,0,0,1,.154.094.353.353,0,0,1,.086.139.566.566,0,0,1,.025.207.967.967,0,0,1-.057.273,1.286,1.286,0,0,1-.15.3.73.73,0,0,1-.177.185.42.42,0,0,1-.18.073.447.447,0,0,1-.355-.121.424.424,0,0,1-.1-.144.511.511,0,0,1-.037-.181.564.564,0,0,1,.033-.2Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_54"
                          data-name="패스 54"
                          d="M367.714,358.712a1.238,1.238,0,0,0-.515-.075,1.118,1.118,0,0,0-.453.136,1.212,1.212,0,0,0-.362.313,1.562,1.562,0,0,0-.246.453,1.484,1.484,0,0,0-.088.483,1.157,1.157,0,0,0,.081.438,1.024,1.024,0,0,0,.245.358,1.1,1.1,0,0,0,.392.236c.032.011.063.018.094.027l-.094-.034-.105-.038.1.036-.095-.053.2.09a1.2,1.2,0,0,0,.574.035l.094-.277a.921.921,0,0,1-.637-.007.833.833,0,0,1-.329-.2.778.778,0,0,1-.178-.294.944.944,0,0,1-.042-.35,1.371,1.371,0,0,1,.076-.368,1.312,1.312,0,0,1,.189-.357,1,1,0,0,1,.274-.253.818.818,0,0,1,.339-.116.854.854,0,0,1,.387.051,1,1,0,0,1,.479.358l.1-.3a1.312,1.312,0,0,0-.475-.291"
                          fill="#fff"
                        />
                        <path
                          id="패스_55"
                          data-name="패스 55"
                          d="M360.172,348.731a1.6,1.6,0,0,0-.244-.066,1.874,1.874,0,0,0-.249-.03,1.709,1.709,0,0,0-.244,0,1.192,1.192,0,0,0-.235.043.219.219,0,0,0-.145.138l-.11.313a.221.221,0,0,0,.053.23.216.216,0,0,0,.231.049.946.946,0,0,1,.686-.028c.12.043.24.112.192.377l-.524-.106a1.284,1.284,0,0,0-.791.05.906.906,0,0,0-.479.554.96.96,0,0,0-.056.369.841.841,0,0,0,.093.347.9.9,0,0,0,.233.283,1.155,1.155,0,0,0,.342.189,1.057,1.057,0,0,0,.594.042l.025-.006a.22.22,0,0,0,.143.177l.283.1a.217.217,0,0,0,.278-.134l.522-1.488a1.2,1.2,0,0,0,.026-.867.992.992,0,0,0-.624-.541m-.128,2.817-.279-.094.128-.364-.243.117a.826.826,0,0,1-.178.062.838.838,0,0,1-.471-.034.933.933,0,0,1-.277-.151.679.679,0,0,1-.175-.212.618.618,0,0,1-.068-.255.734.734,0,0,1,.043-.282.689.689,0,0,1,.361-.423,1.073,1.073,0,0,1,.655-.034l.73.148.028-.1c.11-.387.006-.64-.308-.753a1.106,1.106,0,0,0-.833.037l.106-.309a.983.983,0,0,1,.192-.035,1.451,1.451,0,0,1,.213,0,1.611,1.611,0,0,1,.22.026,1.388,1.388,0,0,1,.21.057.779.779,0,0,1,.493.416.986.986,0,0,1-.031.7Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_56"
                          data-name="패스 56"
                          d="M369.29,351.6l.247.089a.2.2,0,0,0,.183-.024.951.951,0,0,0,.431.3,1.082,1.082,0,0,0,.489.062,1.053,1.053,0,0,0,.445-.156,1.321,1.321,0,0,0,.357-.338,1.832,1.832,0,0,0,.25-.484,1.682,1.682,0,0,0,.1-.484,1.185,1.185,0,0,0-.061-.444.95.95,0,0,0-.234-.368,1.058,1.058,0,0,0-.388-.237,1.045,1.045,0,0,0-.562-.047l-.014,0,.3-.862a.207.207,0,0,0-.124-.264l-.247-.089a.2.2,0,0,0-.261.126l-1.037,2.956a.207.207,0,0,0,.124.264m1.117-3.126.211.076-.465,1.324.246-.121a.752.752,0,0,1,.19-.065.826.826,0,0,1,.445.038.839.839,0,0,1,.307.186.729.729,0,0,1,.179.281.961.961,0,0,1,.048.359,1.452,1.452,0,0,1-.086.418,1.6,1.6,0,0,1-.218.424,1.1,1.1,0,0,1-.3.281.833.833,0,0,1-.352.124.865.865,0,0,1-.389-.051.687.687,0,0,1-.409-.345l-.117-.237-.106.3-.211-.076Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_57"
                          data-name="패스 57"
                          d="M360.1,348.944a1.406,1.406,0,0,0-.21-.057,1.647,1.647,0,0,0-.22-.026,1.467,1.467,0,0,0-.213,0,.989.989,0,0,0-.192.035l-.106.31a1.106,1.106,0,0,1,.833-.037c.314.113.418.366.308.753l-.028.1-.731-.148a1.074,1.074,0,0,0-.656.034.691.691,0,0,0-.361.424.731.731,0,0,0-.043.282.619.619,0,0,0,.068.255.676.676,0,0,0,.176.212.937.937,0,0,0,.276.151.838.838,0,0,0,.471.034.8.8,0,0,0,.178-.061l.243-.117-.128.364.28.094.515-1.484a.986.986,0,0,0,.031-.7.78.78,0,0,0-.493-.416m.007,1.543a.961.961,0,0,1-.162.294.794.794,0,0,1-.232.2.7.7,0,0,1-.276.083.728.728,0,0,1-.3-.042.632.632,0,0,1-.186-.1.447.447,0,0,1-.119-.143.406.406,0,0,1-.046-.17.481.481,0,0,1,.028-.183.606.606,0,0,1,.107-.2.363.363,0,0,1,.156-.105.568.568,0,0,1,.213-.026,1.831,1.831,0,0,1,.28.037l.619.128Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_58"
                          data-name="패스 58"
                          d="M359.286,350.09a.566.566,0,0,0-.213.026.363.363,0,0,0-.156.105.6.6,0,0,0-.107.2.475.475,0,0,0-.028.183.4.4,0,0,0,.046.17.454.454,0,0,0,.119.143.638.638,0,0,0,.186.1.728.728,0,0,0,.3.042.7.7,0,0,0,.276-.083.792.792,0,0,0,.232-.2.961.961,0,0,0,.162-.294l.081-.231-.619-.128a1.824,1.824,0,0,0-.28-.037m.6.334a.73.73,0,0,1-.119.212.571.571,0,0,1-.166.141.482.482,0,0,1-.189.057h0a.5.5,0,0,1-.328-.095.231.231,0,0,1-.062-.073.18.18,0,0,1-.02-.077.249.249,0,0,1,.015-.1.372.372,0,0,1,.064-.123.137.137,0,0,1,.061-.041.354.354,0,0,1,.13-.014,1.629,1.629,0,0,1,.246.033Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_15"
                    data-name="Vector Smart Object copy 15"
                    transform="matrix(0.707, 0.707, -0.707, 0.707, 209, 339.944)"
                  >
                    <g id="그룹_32" data-name="그룹 32">
                      <g
                        id="그룹_31"
                        data-name="그룹 31"
                        clipPath="url(#clipPath-16)"
                      >
                        <path
                          id="패스_59"
                          data-name="패스 59"
                          d="M21.062,7.138h-6.2V.937A.937.937,0,0,0,13.925,0H8.075a.938.938,0,0,0-.938.937v6.2H.937A.937.937,0,0,0,0,8.075v5.85a.937.937,0,0,0,.937.937h6.2v6.2A.938.938,0,0,0,8.075,22h5.85a.937.937,0,0,0,.937-.937v-6.2h6.2A.937.937,0,0,0,22,13.925V8.075a.937.937,0,0,0-.937-.937m-.937,5.85h-6.2a.937.937,0,0,0-.937.937v6.2H9.013v-6.2a.937.937,0,0,0-.937-.937h-6.2V9.013h6.2a.937.937,0,0,0,.937-.937v-6.2h3.975v6.2a.937.937,0,0,0,.937.937h6.2Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_16"
                    data-name="Vector Smart Object copy 16"
                    transform="matrix(0.707, 0.707, -0.707, 0.707, 46, 329.444)"
                  >
                    <g id="그룹_34" data-name="그룹 34">
                      <g
                        id="그룹_33"
                        data-name="그룹 33"
                        clipPath="url(#clipPath-16)"
                      >
                        <path
                          id="패스_60"
                          data-name="패스 60"
                          d="M21.062,7.138h-6.2V.937A.937.937,0,0,0,13.925,0H8.075a.938.938,0,0,0-.938.937v6.2H.937A.937.937,0,0,0,0,8.075v5.85a.937.937,0,0,0,.937.937h6.2v6.2A.938.938,0,0,0,8.075,22h5.85a.937.937,0,0,0,.937-.937v-6.2h6.2A.937.937,0,0,0,22,13.925V8.075a.937.937,0,0,0-.937-.937m-.937,5.85h-6.2a.937.937,0,0,0-.937.937v6.2H9.013v-6.2a.937.937,0,0,0-.937-.937h-6.2V9.013h6.2a.937.937,0,0,0,.937-.937v-6.2h3.975v6.2a.937.937,0,0,0,.937.937h6.2Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g id="Vector_Smart_Object-3" data-name="Vector Smart Object">
                    <g id="그룹_36" data-name="그룹 36">
                      <g
                        id="그룹_35"
                        data-name="그룹 35"
                        clipPath="url(#clipPath-18)"
                      >
                        <path
                          id="패스_61"
                          data-name="패스 61"
                          d="M673.987,59.367l.146-.464a.942.942,0,0,0-.061-.714.918.918,0,0,0-.543-.458l-20.323-6.568,15.232-15.2a.939.939,0,0,0,.011-1.315l-.333-.343a24.346,24.346,0,0,0-34.741-.273,25.207,25.207,0,0,0-.315,35.244,24.346,24.346,0,0,0,34.741.273,25.054,25.054,0,0,0,6.185-10.187m-39.619,8.611a23.326,23.326,0,0,1,.293-32.614A22.529,22.529,0,0,1,666.5,35.3L650.838,50.919a.939.939,0,0,0-.249.879.925.925,0,0,0,.613.67l20.9,6.761a23.2,23.2,0,0,1-5.586,9,22.53,22.53,0,0,1-32.149-.25"
                          fill="#fff"
                        />
                        <path
                          id="패스_62"
                          data-name="패스 62"
                          d="M662.557,48.152a.938.938,0,0,0-.249.879.925.925,0,0,0,.613.67l15.586,5.042a.906.906,0,0,0,.922-.223.933.933,0,0,0,.23-.38l.1-.308a17.124,17.124,0,0,0-4-17.088l-.223-.23a.907.907,0,0,0-1.3-.011Zm15.623,4.533L664.925,48.4l9.93-9.907a15.246,15.246,0,0,1,3.324,14.2"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object-4"
                    data-name="Vector Smart Object"
                    transform="translate(102 16)"
                  >
                    <g id="그룹_38" data-name="그룹 38">
                      <g
                        id="그룹_37"
                        data-name="그룹 37"
                        clipPath="url(#clipPath-19)"
                      >
                        <path
                          id="패스_63"
                          data-name="패스 63"
                          d="M7.753,20.04a.554.554,0,0,0,.782-.021L15.7,12.466l7.861,2.627a.556.556,0,0,0,.5-.078l7.562-5.509.631.736a.554.554,0,0,0,.913-.106l1.759-3.413a.553.553,0,0,0-.666-.777l-3.651,1.2a.553.553,0,0,0-.359.376.551.551,0,0,0,.112.507l.539.63-7.262,5.291-7.924-2.648a.554.554,0,0,0-.577.144L7.731,19.259a.551.551,0,0,0,.022.781M33.321,7.419,32.558,8.9l-.317-.37a.542.542,0,0,0-.062-.113.554.554,0,0,0-.16-.147l-.281-.328Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_64"
                          data-name="패스 64"
                          d="M40.657,33.609,37.1,32.147a.553.553,0,0,0-.764.509l0,.9H34.252V12.975a.553.553,0,0,0-.552-.552l-3.935-.006a.553.553,0,0,0-.554.552V33.558H26.387l.028-15.978h0a.519.519,0,0,0-.006-.056c0-.018,0-.037-.006-.055a.473.473,0,0,0-.017-.056c-.005-.016-.008-.033-.015-.048a.564.564,0,0,0-.03-.056c-.007-.013-.013-.026-.021-.038a.515.515,0,0,0-.046-.056c-.007-.008-.013-.018-.021-.026a.541.541,0,0,0-.055-.046c-.009-.007-.017-.015-.027-.022a.587.587,0,0,0-.058-.032c-.012-.006-.023-.014-.036-.019a.549.549,0,0,0-.064-.02c-.013,0-.026-.009-.04-.012a.481.481,0,0,0-.06-.006c-.017,0-.034-.005-.051-.005H21.9a.553.553,0,0,0-.553.552v15.98H18.519V15.908a.553.553,0,0,0-.553-.552l-3.935.008a.553.553,0,0,0-.551.552V33.558H10.653V21.949A.553.553,0,0,0,10.1,21.4L6.17,21.376a.511.511,0,0,0-.393.16.553.553,0,0,0-.163.392v11.63H3.254V4.659l.9,0h0a.552.552,0,0,0,.553-.553A.548.548,0,0,0,4.669,3.9L3.223.345A.553.553,0,0,0,2.712,0h0A.554.554,0,0,0,2.2.342L.734,3.89a.552.552,0,0,0,.51.763l.9,0v28.9H.553a.552.552,0,1,0,0,1.1H2.148v1.784a.553.553,0,0,0,1.107,0V34.663H36.333l0,.9h0a.554.554,0,0,0,.761.512l3.563-1.443a.553.553,0,0,0,.345-.51h0a.553.553,0,0,0-.343-.511M3.249,3.554a.55.55,0,0,0-1.1,0H2.071l.635-1.539.627,1.543Zm6.3,30H6.72V22.484l2.826.015Zm7.866-11.88v11.88H14.586V16.467l2.826-.006Zm7.867,11.88H22.032l.421-1.757V18.131h2.854Zm7.865,0H30.319V13.522l2.826,0Zm4.294,1.184v-.1a.549.549,0,0,0,0-1.059v-.1l1.542.634Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_2"
                    data-name="Vector Smart Object copy 2"
                    transform="matrix(0, 1, -1, 0, 98, 269)"
                  >
                    <g id="그룹_40" data-name="그룹 40">
                      <g
                        id="그룹_39"
                        data-name="그룹 39"
                        clipPath="url(#clipPath-4)"
                      >
                        <path
                          id="패스_65"
                          data-name="패스 65"
                          d="M32.585,38.913V2.609A2.6,2.6,0,0,0,30.008,0H2.576A2.6,2.6,0,0,0,0,2.609v36.3a2.6,2.6,0,0,0,2.576,2.609H30.008a2.6,2.6,0,0,0,2.576-2.609m-31.6,0V2.609A1.6,1.6,0,0,1,2.576,1H30.008a1.6,1.6,0,0,1,1.59,1.61v36.3a1.6,1.6,0,0,1-1.59,1.61H2.576a1.6,1.6,0,0,1-1.59-1.61"
                          fill="#fff"
                        />
                        <path
                          id="패스_66"
                          data-name="패스 66"
                          d="M30.357,3.507a1.245,1.245,0,0,0-1.235-1.251H3.463A1.245,1.245,0,0,0,2.228,3.507V38.015a1.245,1.245,0,0,0,1.235,1.251H29.122a1.245,1.245,0,0,0,1.235-1.251Zm-.986,34.508a.251.251,0,0,1-.249.253H3.463a.251.251,0,0,1-.249-.253v-3.1H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.052,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,34.763v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m2.96-.851h-.884c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V29.387H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,29.239v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.851h-.884c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214v-4.35H22.272c.051,1.17.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.052,1.17.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884Zm-6.118-4.5v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m2.96-.851h-.884c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V18.6H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,18.457v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.851h-.884c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V13.212H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,13.064v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.851h-.884c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V8.1h9.6c.127,1.046.743,1.817,1.508,1.817s1.381-.772,1.508-1.817h.143c.127,1.046.743,1.817,1.508,1.817s1.381-.772,1.508-1.817h.142c.127,1.046.743,1.817,1.508,1.817S22.023,9.146,22.15,8.1h.142c.127,1.046.743,1.817,1.508,1.817s1.381-.772,1.508-1.817h.142c.127,1.046.743,1.817,1.508,1.817S28.34,9.146,28.467,8.1h.9ZM13.777,7.7V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.6h-.879V7c0-1.243-.673-2.216-1.533-2.216S25.425,5.757,25.425,7v.1h-.092V7c0-1.243-.673-2.216-1.533-2.216S22.267,5.757,22.267,7v.1h-.092V7c0-1.243-.674-2.216-1.533-2.216S19.108,5.757,19.108,7v.1h-.092V7c0-1.243-.674-2.216-1.533-2.216S15.95,5.757,15.95,7v.1h-.092V7c0-1.243-.673-2.216-1.533-2.216S12.791,5.757,12.791,7v.1H3.214V3.507a.251.251,0,0,1,.249-.253H29.122a.251.251,0,0,1,.249.253Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_2-2"
                    data-name="Vector Smart Object copy 2"
                  >
                    <g id="그룹_42" data-name="그룹 42">
                      <g
                        id="그룹_41"
                        data-name="그룹 41"
                        clipPath="url(#clipPath-21)"
                      >
                        <path
                          id="패스_67"
                          data-name="패스 67"
                          d="M637.987,364.367l.146-.464a.942.942,0,0,0-.061-.714.918.918,0,0,0-.543-.458l-20.323-6.568,15.232-15.2a.939.939,0,0,0,.011-1.315l-.333-.343a24.347,24.347,0,0,0-34.741-.273,25.207,25.207,0,0,0-.315,35.244,24.346,24.346,0,0,0,34.741.273,25.054,25.054,0,0,0,6.185-10.187m-39.619,8.611a23.326,23.326,0,0,1,.293-32.614A22.529,22.529,0,0,1,630.5,340.3l-15.659,15.621a.939.939,0,0,0-.249.879.925.925,0,0,0,.613.67l20.9,6.761a23.2,23.2,0,0,1-5.586,9,22.53,22.53,0,0,1-32.149-.25"
                          fill="#fff"
                        />
                        <path
                          id="패스_68"
                          data-name="패스 68"
                          d="M626.557,353.152a.938.938,0,0,0-.249.879.925.925,0,0,0,.613.67l15.586,5.042a.906.906,0,0,0,.922-.223.933.933,0,0,0,.23-.38l.1-.307a17.124,17.124,0,0,0-4-17.088l-.223-.23a.907.907,0,0,0-1.3-.011Zm15.623,4.533L628.925,353.4l9.93-9.907a15.246,15.246,0,0,1,3.324,14.2"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                </g>
                <g id="타이틀">
                  <text
                    id="MATHEMATICS"
                    transform="translate(124.429 246.178)"
                    fill="#ff6000"
                    fontSize="48.408"
                    fontFamily="TTOmniGothicH, '\32 10 OmniGothic'"
                    opacity="0.169"
                  >
                    <tspan x="0" y="0">
                      MATHEMATICS
                    </tspan>
                  </text>
                  <path
                    id="패스_74"
                    data-name="패스 74"
                    d="M80.475,11.788V-65.851H63.813v26.589H58.938V-65.674H43.162V10.9H58.938V-23.221h4.875V11.788Zm-68.333-7.8C28.007-8.6,39.44-27.918,39.44-57.786v-5.495H3.1v14.8H21.891C20.828-30.754,12.674-15.687-.089-6.027ZM161.748-23.93V-65.851h-18.08v3.191H124.878v11.344h18.789v2.127H124.878v9.749c-5.229.443-10.37.709-16.662.709V-64.7H90.135v39.617c15.6,0,31.286-.886,44.137-2.216L133.3-37.844h10.37V-23.93Zm0,35.717V-21.625H95.63V11.788ZM143.667-2.127H113.622V-7.711h30.045ZM245.413,11.788V1.95H194.452V-.266h50.075V-20.385H176.46v9.749h49.987v1.95H176.46V11.788Zm4.254-34.211V-33.856H219.711v-2.482h26.323v-10.1H234.955c.266-2.57.62-5.052.886-6.913l-17.46-.975-.532,7.888h-14.8l-.443-7.888-17.46.975c.266,1.861.532,4.343.8,6.913h-10.99v10.1h26.234v2.482H171.319v11.433Zm-4.7-32.7v-9.926H176.017v9.926Zm86.413,66.915V-65.851H313.391V11.788Zm-24.55-26.943c-8.6,1.861-21.36,2.659-31.109,2.659v-10.99h28.1V-63.724H258.176V-48.48h28.007v10.1H258.176V3.191c16.574.709,39-.975,50.164-3.634ZM413.365,11.788V-22.6h7.8V-38.554h-7.8v-27.3H395.373V11.788ZM382.079-4.7c4.166-5.584,6.47-14,6.47-25.7,0-23.4-9.129-33.768-24.284-33.768S339.891-53.8,339.891-30.488c0,23.4,9.217,33.768,24.373,33.768C371.8,3.279,377.913.709,382.079-4.7Zm-15.421-8.508a4.288,4.288,0,0,1-2.393.8c-3.279,0-6.736-3.634-6.736-18.08,0-14.181,3.457-17.992,6.736-17.992S371-44.669,371-30.4C371-19.853,369.139-14.8,366.657-13.206Z"
                    transform="translate(139.492 203.341)"
                    fill="#222"
                  />
                  <path
                    id="패스_75"
                    data-name="패스 75"
                    d="M78.06-22.6V-38.3h7.9V-54.642h-7.9v-12.8H59.634V-22.6ZM52.917-25.778V-66.532H35.308V-59H21.875v-7.534H4.357v40.754ZM77.424,2.632a12.551,12.551,0,0,0,2-6.989c0-10.257-9.984-17.7-35.127-17.7-25.233,0-35.218,7.443-35.218,17.609,0,10.257,9.984,17.609,35.218,17.609C63.083,13.161,73.7,9.077,77.424,2.632ZM35.308-39.574H21.875v-6.081H35.308ZM60.451-4.357c0,.817-.635,1.634-2.9,2.36-2.269.635-6.354,1-13.252,1C30.407-1,27.956-2.723,27.956-4.448c0-1.634,2.451-3.449,16.338-3.449C58.091-7.9,60.451-6.081,60.451-4.357ZM168.645,12.072V-67.44H151.581v27.23h-4.538V-67.258H130.886V11.164h16.157V-23.781h4.538V12.072ZM126.8,2.541v-67.8H111.1v19.515h-5.264V-65.262H89.224v67.8ZM111.1-12.98h-5.264V-30.5H111.1ZM251.425,11.709v-13.8H201.049V-14.7H182.623V11.709Zm-.454-21.784V-31.224h7.806V-47.653h-7.806V-67.44H233v57.365Zm-20.423-23.69c-8.078.454-17.518.908-27.23,1.271V-45.928h-17.7v14.069l-10.166.272v14.16c16.429-.454,39.393-1.452,55.1-2.632Zm-4.72-2.269a235.323,235.323,0,0,0,1.18-29.681H178.267v13.978h30.679a134.112,134.112,0,0,1-1,14.8Z"
                    transform="translate(218.659 305.557)"
                    fill="#fff"
                  />
                  <path
                    id="패스_76"
                    data-name="패스 76"
                    d="M16.54,1.582V-17.363H14.81V1.582ZM1.793-8.08l.8,1.35a7.445,7.445,0,0,0,4.831-4.2,7.491,7.491,0,0,0,4.831,3.987l.8-1.329C10.274-9.114,8.333-11.076,8.27-13.5h4.367v-1.392H8.27v-2.321H6.54v2.321h-4.3V-13.5h4.3C6.477-11.034,4.6-8.924,1.793-8.08ZM8.27-3.924V-7.363H6.54V-3.84c-1.941.063-3.713.063-5.316.063l.232,1.456a69.7,69.7,0,0,0,12.257-.823L13.565-4.43C11.878-4.156,10.042-4.03,8.27-3.924Zm29.747-7.11v-1.435H35.211v-4.873h-1.73V-5.886h1.73v-5.148ZM30.548-7.11l.907-1.35A6.453,6.453,0,0,1,26.877-14.3v-2.089h-1.73v1.941a6.944,6.944,0,0,1-4.7,6.5l.907,1.371a7.909,7.909,0,0,0,4.684-4.789A7.942,7.942,0,0,0,30.548-7.11ZM29.2-5.359c-3.861,0-6.245,1.266-6.245,3.46S25.337,1.54,29.2,1.54C33.017,1.54,35.422.3,35.422-1.9S33.017-5.359,29.2-5.359ZM29.2.19c-2.806,0-4.515-.738-4.515-2.089s1.709-2.11,4.515-2.11,4.494.759,4.494,2.11S32,.19,29.2.19ZM57.109-8.228V-9.641H54.388a23.716,23.716,0,0,0,.506-5.485V-16.5H42.109v1.413H53.185a22.481,22.481,0,0,1-.527,5.443H39.915v1.413ZM54.873-6.519H53.164V-4.03h-9.3V-6.519H42.152V1.308H54.873ZM43.86-2.679h9.3V-.084h-9.3Zm21.16-4.578L65.7-5.886c3.038-.57,5.781-2.067,6.962-4.388,1.181,2.321,3.9,3.819,6.941,4.388l.675-1.371c-3.671-.57-6.751-2.806-6.751-5.717H79.6v-1.392H73.523v-2.574H71.772v2.574h-6.1v1.392h6.1C71.772-10.063,68.692-7.827,65.021-7.257ZM81.244-.823V-2.257H73.523v-4.3H71.772v4.3h-7.7V-.823Zm3.207-10.19.612,1.371c3.1-.4,5.949-1.751,6.983-3.861,1.076,2.11,3.882,3.46,6.983,3.861l.612-1.371c-3.333-.4-6.308-1.983-6.477-4.093H99.05V-16.5H85.063v1.392h5.865C90.759-13,87.784-11.413,84.451-11.013Zm8.46,5.928V-7.11h7.679V-8.5H83.481V-7.11H91.16v2.025c-3.608.169-5.612,1.329-5.612,3.291C85.548.38,88,1.54,92.046,1.54S98.5.38,98.5-1.793C98.5-3.755,96.518-4.916,92.911-5.084Zm3.84,3.291c0,1.266-1.751,2-4.726,2s-4.726-.738-4.726-2,1.751-1.983,4.726-1.983S96.75-3.059,96.75-1.793Zm8.291-8.375h12.975v-1.392H106.772v-3.65H117.89V-16.6H105.042ZM120.02-6.92V-8.354H102.89V-6.92ZM111.434-5.3c-4.03,0-6.477,1.224-6.477,3.418S107.4,1.54,111.434,1.54s6.477-1.224,6.477-3.418S115.463-5.3,111.434-5.3Zm0,5.485c-2.975,0-4.726-.717-4.726-2.067s1.751-2.067,4.726-2.067,4.726.717,4.726,2.067S114.409.19,111.434.19Zm31.16-8.945.717-1.392c-3.439-.506-6.814-2.848-6.814-5.485v-1.055h-1.814v1.055c0,2.722-3.312,4.979-6.772,5.485l.7,1.392c2.932-.506,5.8-2.131,6.983-4.43C136.835-10.886,139.641-9.262,142.594-8.755Zm-6.181,3.481h7.743l-.021-1.435H127.046v1.435h7.637V1.582h1.73ZM146.5-13.966h11.16v-1.392h-4.726v-2.11H151.2v2.11h-4.7Zm14.62,3.27h2.806v-1.435h-2.806v-5.211h-1.73V-5.527h1.73ZM156.6-9.557c0-2.089-1.835-3.439-4.536-3.439-2.679,0-4.515,1.329-4.515,3.418s1.835,3.418,4.515,3.418C154.767-6.16,156.6-7.489,156.6-9.557Zm-7.405,0c0-1.266,1.1-2.089,2.869-2.089s2.89.8,2.89,2.067-1.118,2.089-2.89,2.089S149.2-8.291,149.2-9.557Zm11.92,5.063H148.839V-3.08h10.548V1.582h1.73Zm18.565-12.848v5.211h-3.8v1.413h3.8v7.236h1.751V-17.342ZM176.138-6.329,177-7.679a6.5,6.5,0,0,1-4.6-5.8v-.928h4.156v-1.413H166.455v1.413h4.219v.949a6.9,6.9,0,0,1-4.768,6.2l.907,1.35a8.02,8.02,0,0,0,4.768-4.7A7.807,7.807,0,0,0,176.138-6.329Zm5.823,7.468V-.274H171.075V-4.7h-1.751V1.139Zm5.485-10.97h12.721v-6.646H187.446Zm1.688-5.253h9.325v3.861h-9.325Zm13.27,8.8V-7.679H185.21v1.392h7.869v3.819h1.73V-6.287Zm-1.92,6.013h-11.35V-4.262H187.4v5.4h13.08Zm4.24-13.692h11.16v-1.392h-4.726v-2.11h-1.73v2.11h-4.7Zm14.62,3.27h2.806v-1.435h-2.806v-5.211h-1.73V-5.527h1.73ZM214.83-9.557c0-2.089-1.835-3.439-4.536-3.439-2.679,0-4.515,1.329-4.515,3.418s1.835,3.418,4.515,3.418C212.995-6.16,214.83-7.489,214.83-9.557Zm-7.405,0c0-1.266,1.1-2.089,2.869-2.089s2.89.8,2.89,2.067-1.118,2.089-2.89,2.089S207.425-8.291,207.425-9.557Zm11.92,5.063H207.066V-3.08h10.548V1.582h1.73Zm18.481-12.869V-6.181h-3.84v1.287h3.84v1.941h1.73V-17.363ZM230.125-10c2.764,0,4.662-1.287,4.662-3.312,0-1.983-1.9-3.291-4.662-3.291s-4.662,1.308-4.662,3.291C225.463-11.287,227.362-10,230.125-10Zm0-5.316c1.793,0,3.017.8,3.017,2,0,1.266-1.224,2.025-3.017,2.025s-3.017-.759-3.017-2.025C227.108-14.515,228.332-15.316,230.125-15.316Zm-.675,8.038v3.65h1.73V-7.363c1.709-.105,3.439-.3,5.127-.549l-.148-1.245a102.8,102.8,0,0,1-12.194.549l.232,1.435C225.8-7.173,227.572-7.194,229.45-7.278Zm10.591,8.418V-.274H228.4V-4.367h-1.73V1.139Z"
                    transform="translate(229.592 113.629)"
                    fill="#fff"
                  />
                </g>
                <rect
                  id="Rectangle_13"
                  data-name="Rectangle 13"
                  width="439.98"
                  height="46"
                  transform="translate(129.01 342.5)"
                  fill="#222"
                />
                <text
                  id="수학은_개념폴리아"
                  data-name="수학은 개념폴리아"
                  transform="translate(212.352 377.32)"
                  fill="#fff"
                  fontSize="36.3"
                  fontFamily="SpoqaHanSansNeo-Medium, Spoqa Han Sans Neo"
                  fontWeight="500"
                >
                  <tspan x="0" y="0">
                    수학은 개념폴리아
                  </tspan>
                </text>
                <a href="https://blog.naver.com/gnpolya23" target="_blank">
                  <g
                    transform="matrix(1, 0, 0, 1, 0, 0)"
                    filter="url(#사각형_22)"
                  >
                    <g
                      id="사각형_22-2"
                      data-name="사각형 22"
                      transform="translate(113 481)"
                      fill="#fff"
                      stroke="#4ddbd0"
                      strokeWidth="1"
                    >
                      <rect width="474" height="62" rx="20" stroke="none" />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="473"
                        height="61"
                        rx="19.5"
                        fill="none"
                      />
                    </g>
                  </g>
                </a>
                <a
                  href="https://form.office.naver.com/form/responseView.cmd?formkey=Yzc5OGJmZjMtMmEzOS00N2NhLTkyZjMtNjdlZjBhMTcwNzI4&sourceId=urlshare"
                  target="_blank"
                >
                  <g
                    transform="matrix(1, 0, 0, 1, 0, 0)"
                    filter="url(#사각형_23)"
                  >
                    <g
                      id="사각형_23-2"
                      data-name="사각형 23"
                      transform="translate(113 619)"
                      fill="#fff"
                      stroke="#4ddbd0"
                      strokeWidth="1"
                    >
                      <rect width="474" height="62" rx="20" stroke="none" />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="473"
                        height="61"
                        rx="19.5"
                        fill="none"
                      />
                    </g>
                  </g>
                </a>
                <a
                  href="https://form.office.naver.com/form/responseView.cmd?formkey=ZGFiZjAyMWUtZGYwNS00MWIwLWE3OWItNWNlNWYwMDkwZmI1&sourceId=urlshare"
                  target="_blank"
                >
                  <g
                    transform="matrix(1, 0, 0, 1, 0, 0)"
                    filter="url(#사각형_28)"
                  >
                    <g
                      id="사각형_28-2"
                      data-name="사각형 28"
                      transform="translate(113 757)"
                      fill="#fff"
                      stroke="#4ddbd0"
                      strokeWidth="1"
                    >
                      <rect width="474" height="62" rx="20" stroke="none" />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="473"
                        height="61"
                        rx="19.5"
                        fill="none"
                      />
                    </g>
                  </g>
                </a>
                <a
                  href="https://m.place.naver.com/place/1394387582/location?subtab=location&selected_place_id=1394387582"
                  target="_blank"
                >
                  <g
                    transform="matrix(1, 0, 0, 1, 0, 0)"
                    filter="url(#사각형_29)"
                  >
                    <g
                      id="사각형_29-2"
                      data-name="사각형 29"
                      transform="translate(113 895)"
                      fill="#fff"
                      stroke="#4ddbd0"
                      strokeWidth="1"
                    >
                      <rect width="474" height="62" rx="20" stroke="none" />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="473"
                        height="61"
                        rx="19.5"
                        fill="none"
                      />
                    </g>
                  </g>
                </a>
                <a href={qrData[branchId].links[0].href} target="_blank">
                  <text
                    id="방배관_BLOG_방문하기"
                    data-name="방배관 BLOG 방문하기"
                    transform="translate(215 520)"
                    fill="#707070"
                    fontSize="23"
                    fontFamily="SpoqaHanSansNeo-Medium, Spoqa Han Sans Neo"
                    fontWeight="500"
                  >
                    <tspan x="0" y="0">
                      {qrData[branchId].links[0].title}
                    </tspan>
                  </text>
                </a>
                <a href={qrData[branchId].links[1].href} target="_blank">
                  <text
                    id="방배관_입학테스트_예약"
                    data-name="방배관 입학테스트 예약"
                    transform="translate(169 658)"
                    fill="#707070"
                    fontSize="23"
                    fontFamily="SpoqaHanSansNeo-Medium, Spoqa Han Sans Neo"
                    fontWeight="500"
                  >
                    <tspan x="0" y="0">
                      {qrData[branchId].links[1].title}
                    </tspan>
                  </text>
                </a>
                <a href={qrData[branchId].links[2].href} target="_blank">
                  <text
                    id="설명회_참석_예약"
                    data-name="설명회 참석 예약"
                    transform="translate(271 796)"
                    fill="#707070"
                    fontSize="23"
                    fontFamily="SpoqaHanSansNeo-Medium, Spoqa Han Sans Neo"
                    fontWeight="500"
                  >
                    <tspan x="0" y="0">
                      {qrData[branchId].links[2].title}
                    </tspan>
                  </text>
                </a>
                <a href={qrData[branchId].links[3].href} target="_blank">
                  <text
                    id="방배관_위치안내"
                    data-name="방배관 위치안내"
                    transform="translate(274 934)"
                    fill="#707070"
                    fontSize="23"
                    fontFamily="SpoqaHanSansNeo-Medium, Spoqa Han Sans Neo"
                    fontWeight="500"
                  >
                    <tspan x="0" y="0">
                      {qrData[branchId].links[3].title}
                    </tspan>
                  </text>
                </a>
                <g
                  id="그룹_44"
                  data-name="그룹 44"
                  transform="matrix(0.899, 0.438, -0.438, 0.899, 246.732, 1056.574)"
                >
                  <g
                    id="그룹_43"
                    data-name="그룹 43"
                    transform="translate(0 0)"
                    clipPath="url(#clipPath-22)"
                  >
                    <path
                      id="패스_69"
                      data-name="패스 69"
                      d="M28.31,19.555c-.742-.363-4.343-2.13-5.015-2.368s-1.163-.363-1.654.364-1.905,2.368-2.325,2.844-.854.547-1.6.183a19.829,19.829,0,0,1-5.9-3.615,21.777,21.777,0,0,1-4.077-5.027c-.419-.73-.042-1.121.323-1.486.336-.336.729-.855,1.107-1.275.1-.126.182-.238.265-.35a7.883,7.883,0,0,0,.463-.87,1.313,1.313,0,0,0-.055-1.275c-.183-.364-1.654-3.95-2.27-5.406S6.36.069,5.925.069,5.014,0,4.524,0A2.711,2.711,0,0,0,2.563.91,8.154,8.154,0,0,0,0,6.989,9.283,9.283,0,0,0,.378,9.47,16.556,16.556,0,0,0,3,14.513c.364.476,5.072,8.067,12.523,11,7.466,2.9,7.466,1.933,8.812,1.807s4.343-1.751,4.944-3.459A6.014,6.014,0,0,0,29.71,20.4c-.182-.294-.672-.476-1.4-.84"
                      transform="translate(0 0)"
                      fill="#fff"
                      fillRule="evenodd"
                    />
                  </g>
                </g>
                <a href={qrData[branchId].links[4].href}>
                  <text
                    id="상_담_문_의"
                    data-name="상 담 문 의"
                    transform="translate(296 1084)"
                    fill="#222"
                    fontSize="25"
                    fontFamily="SpoqaHanSansNeo-Bold, Spoqa Han Sans Neo"
                    fontWeight="700"
                  >
                    <tspan x="0" y="0">
                      {qrData[branchId].links[4].title}
                    </tspan>
                  </text>
                </a>
                <path
                  id="패스_70"
                  data-name="패스 70"
                  d="M658.255,516.993l9.09,9.866-9.09,9.98"
                  transform="translate(-109.818 -14.916)"
                  fill="none"
                  stroke="#707070"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  id="패스_71"
                  data-name="패스 71"
                  d="M658.255,516.993l9.09,9.866-9.09,9.98"
                  transform="translate(-109.818 123.084)"
                  fill="none"
                  stroke="#707070"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  id="패스_72"
                  data-name="패스 72"
                  d="M658.255,516.993l9.09,9.866-9.09,9.98"
                  transform="translate(-109.818 261.084)"
                  fill="none"
                  stroke="#707070"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  id="패스_73"
                  data-name="패스 73"
                  d="M658.255,516.993l9.09,9.866-9.09,9.98"
                  transform="translate(-109.818 399.084)"
                  fill="none"
                  stroke="#707070"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </g>
            </svg>
          </Box>
        </Flex>
      </>
    )
  }

  if (branchId === "PlCd") {
    return (
      <>
        <Head>
          <title>{qrData[branchId].name}</title>
          <meta name="description" content="수학은 개념상상,개념폴리아" />
        </Head>
        <Flex justifyContent="center">
          <Box>
            {/* <img src="/assets/qrs/qrPlBb.svg"></img> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={vw && (vw * 100 > 700 ? "700" : "100vw")}
              height={vw && (vw * 100 > 700 ? "889" : "auto")}
              viewBox="0 0 700 1245"
            >
              <defs>
                <filter
                  id="Layer_1"
                  x="-9"
                  y="-6"
                  width="718"
                  height="469"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="3" />
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feFlood flood-opacity="0.161" />
                  <feComposite operator="in" in2="blur" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <filter
                  id="사각형_30"
                  x="70"
                  y="414"
                  width="558"
                  height="837"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="3" />
                  <feGaussianBlur stdDeviation="1" result="blur-2" />
                  <feFlood flood-opacity="0.161" />
                  <feComposite operator="in" in2="blur-2" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <filter
                  id="사각형_27"
                  x="197"
                  y="1042"
                  width="306"
                  height="69"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="3" result="blur-3" />
                  <feFlood flood-opacity="0.161" />
                  <feComposite operator="in" in2="blur-3" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <clipPath id="clip-path">
                  <rect
                    id="사각형_1"
                    data-name="사각형 1"
                    width="40"
                    height="53"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clip-path-2">
                  <rect
                    id="사각형_2"
                    data-name="사각형 2"
                    width="40.748"
                    height="52.027"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clip-path-4">
                  <rect
                    id="사각형_4"
                    data-name="사각형 4"
                    width="32.585"
                    height="41.522"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clip-path-6">
                  <rect
                    id="사각형_6"
                    data-name="사각형 6"
                    width="50"
                    height="44"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clip-path-7">
                  <rect
                    id="사각형_7"
                    data-name="사각형 7"
                    width="39"
                    height="32"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clip-path-9">
                  <rect
                    id="사각형_9"
                    data-name="사각형 9"
                    width="37"
                    height="36"
                    transform="translate(0 0)"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clip-path-10">
                  <rect
                    id="사각형_10"
                    data-name="사각형 10"
                    width="23"
                    height="23"
                    transform="translate(0 0)"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clip-path-13">
                  <rect
                    id="사각형_13"
                    data-name="사각형 13"
                    width="21"
                    height="7"
                    transform="translate(0 0)"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clip-path-15">
                  <rect
                    id="사각형_15"
                    data-name="사각형 15"
                    width="30"
                    height="32"
                    transform="translate(356.422 337.813) rotate(19.527)"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clip-path-16">
                  <rect
                    id="사각형_16"
                    data-name="사각형 16"
                    width="22"
                    height="22"
                    transform="translate(0 0)"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clip-path-18">
                  <rect
                    id="사각형_18"
                    data-name="사각형 18"
                    width="52.927"
                    height="49.811"
                    transform="matrix(0.713, -0.701, 0.701, 0.713, 615.848, 51.523)"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clip-path-19">
                  <rect
                    id="사각형_19"
                    data-name="사각형 19"
                    width="41"
                    height="37"
                    fill="none"
                  />
                </clipPath>
                <clipPath id="clip-path-21">
                  <rect
                    id="사각형_21"
                    data-name="사각형 21"
                    width="52.927"
                    height="49.811"
                    transform="matrix(0.713, -0.701, 0.701, 0.713, 579.848, 356.523)"
                    fill="none"
                  />
                </clipPath>
                <filter
                  id="사각형_22"
                  x="107"
                  y="478"
                  width="486"
                  height="74"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="3" />
                  <feGaussianBlur stdDeviation="2" result="blur-4" />
                  <feFlood flood-opacity="0.161" />
                  <feComposite operator="in" in2="blur-4" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <filter
                  id="사각형_23"
                  x="107"
                  y="616"
                  width="486"
                  height="74"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="3" />
                  <feGaussianBlur stdDeviation="2" result="blur-5" />
                  <feFlood flood-opacity="0.161" />
                  <feComposite operator="in" in2="blur-5" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <filter
                  id="사각형_28"
                  x="107"
                  y="754"
                  width="486"
                  height="74"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="3" />
                  <feGaussianBlur stdDeviation="2" result="blur-6" />
                  <feFlood flood-opacity="0.161" />
                  <feComposite operator="in" in2="blur-6" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <filter
                  id="사각형_29"
                  x="107"
                  y="892"
                  width="486"
                  height="74"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset dy="3" />
                  <feGaussianBlur stdDeviation="2" result="blur-7" />
                  <feFlood flood-opacity="0.161" />
                  <feComposite operator="in" in2="blur-7" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <clipPath id="clip-path-22">
                  <rect
                    id="사각형_31"
                    data-name="사각형 31"
                    width="29.818"
                    height="27.571"
                    fill="#fff"
                  />
                </clipPath>
                <clipPath id="clip-Canvas">
                  <rect width="700" height="1245" />
                </clipPath>
              </defs>
              <g id="Canvas" clip-path="url(#clip-Canvas)">
                <rect width="700" height="1245" fill="#f5f5f5" />
                <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Layer_1)">
                  <rect
                    id="Layer_1-2"
                    data-name="Layer 1"
                    width="700"
                    height="451"
                    transform="translate(0)"
                    fill="#fcad64"
                  />
                </g>
                <g
                  transform="matrix(1, 0, 0, 1, 0, 0)"
                  filter="url(#사각형_30)"
                >
                  <path
                    id="사각형_30-2"
                    data-name="사각형 30"
                    d="M12,0H540a12,12,0,0,1,12,12V831a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V12A12,12,0,0,1,12,0Z"
                    transform="translate(73 414)"
                    fill="#fff"
                  />
                </g>
                <g
                  transform="matrix(1, 0, 0, 1, 0, 0)"
                  filter="url(#사각형_27)"
                >
                  <rect
                    id="사각형_27-2"
                    data-name="사각형 27"
                    width="288"
                    height="51"
                    rx="25.5"
                    transform="translate(206 1050)"
                    fill="#fcad64"
                  />
                </g>
                <g id="배경_아이콘" data-name="배경 아이콘" opacity="0.38">
                  <g
                    id="Vector_Smart_Object"
                    data-name="Vector Smart Object"
                    transform="translate(527 71)"
                  >
                    <g id="그룹_2" data-name="그룹 2">
                      <g
                        id="그룹_1"
                        data-name="그룹 1"
                        clip-path="url(#clip-path)"
                      >
                        <path
                          id="패스_1"
                          data-name="패스 1"
                          d="M39.448,1.093H34.129A1.392,1.392,0,0,0,32.758,0H28.746a1.391,1.391,0,0,0-1.371,1.093H2.273A2.3,2.3,0,0,0,0,3.409V50.684A2.3,2.3,0,0,0,2.273,53H39.448A.557.557,0,0,0,40,52.438V1.655a.557.557,0,0,0-.551-.562M3.333,51.876H2.273A1.183,1.183,0,0,1,1.1,50.684V3.409a1.182,1.182,0,0,1,1.17-1.192h1.06ZM28.451,1.362a.275.275,0,0,1,.3-.238h4.012a.275.275,0,0,1,.3.238V7.333L31.036,6.1a.545.545,0,0,0-.567,0L28.451,7.333ZM38.9,51.876H4.436V2.217H27.348V8.324a.564.564,0,0,0,.28.489.545.545,0,0,0,.555-.007l2.57-1.568,2.57,1.568a.543.543,0,0,0,.555.007.564.564,0,0,0,.28-.489V2.217H38.9Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_2"
                          data-name="패스 2"
                          d="M32.686,38.309H30.97a9.558,9.558,0,0,0-.352-2.091.543.543,0,0,0-.031-.11,9.489,9.489,0,0,0-1.015-2.269.55.55,0,0,0-.064-.1,9.5,9.5,0,0,0-1.246-1.576c-.009-.01-.015-.021-.024-.03a.53.53,0,0,0-.048-.04,9.371,9.371,0,0,0-1.5-1.215.532.532,0,0,0-.092-.06,9.157,9.157,0,0,0-2.237-1.029.551.551,0,0,0-.111-.032,9.072,9.072,0,0,0-2-.346l.008-1.643a.557.557,0,0,0-.549-.565h0a.557.557,0,0,0-.551.559l-.009,1.65a9.383,9.383,0,0,0-8.705,8.9H10.532a.562.562,0,0,0,0,1.124h1.911a9.383,9.383,0,0,0,8.6,8.844l-.009,1.683a.557.557,0,0,0,.549.565h0a.557.557,0,0,0,.551-.559l.009-1.675a9.378,9.378,0,0,0,8.816-8.859h1.72a.562.562,0,0,0,0-1.124M21.053,47.15a8.268,8.268,0,0,1-7.5-7.718h7.545Zm.046-8.841H13.545a8.267,8.267,0,0,1,7.594-7.771Zm8.347-2.142-2.1,2.142H25.715l3.243-3.3a8.376,8.376,0,0,1,.488,1.161m-1.081-2.145-4.209,4.288h-1.2l4.879-4.97a8.306,8.306,0,0,1,.532.682m-6.123-3.485a8.017,8.017,0,0,1,.81.1l-.815.83Zm-.013,2.523,2.072-2.11a8.023,8.023,0,0,1,1.143.493L22.22,34.725Zm-.017,3.264,4.2-4.28q.329.238.634.506l-4.843,4.933Zm-.056,10.843.04-7.733H29.86a8.263,8.263,0,0,1-7.7,7.733M28.9,38.309l.86-.876a8.461,8.461,0,0,1,.1.876Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_3"
                          data-name="패스 3"
                          d="M19.659,14.037,16.97,22.749h1.057l.822-2.74h2.806l.845,2.74h1.092l-2.7-8.712Zm-.6,5.093.775-2.52c.152-.53.282-1.06.4-1.577h.024c.117.5.235,1.021.411,1.59l.775,2.508Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_4"
                          data-name="패스 4"
                          d="M29.687,14.037v8.712h1.022V18.664h3.827v4.085h1.033V14.037H34.536v3.645H30.708V14.037Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_5"
                          data-name="패스 5"
                          d="M7.483,10.973a.557.557,0,0,0,.551.562H35.688a.562.562,0,0,0,0-1.124H8.035a.557.557,0,0,0-.551.562"
                          fill="#fff"
                        />
                        <path
                          id="패스_6"
                          data-name="패스 6"
                          d="M14.915,18.922l.2,3.826h1l-.493-8.712h-1.3L12.907,18.25c-.352,1.1-.634,2.055-.834,2.934h-.035c-.2-.9-.47-1.861-.8-2.934L9.89,14.037h-1.3l-.551,8.712h.974l.212-3.736c.07-1.305.129-2.766.152-3.852H9.4c.223,1.034.54,2.159.916,3.387L11.592,22.7h.775l1.4-4.227c.4-1.2.728-2.288,1-3.309H14.8c-.012,1.086.059,2.547.117,3.761"
                          fill="#fff"
                        />
                        <path
                          id="패스_7"
                          data-name="패스 7"
                          d="M35.688,24.776H8.035a.562.562,0,0,0,0,1.124H35.688a.562.562,0,0,0,0-1.124"
                          fill="#fff"
                        />
                        <path
                          id="패스_8"
                          data-name="패스 8"
                          d="M26.387,22.749V14.993h2.419v-.956H22.947v.956h2.407v7.756Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_17"
                    data-name="Vector Smart Object copy 17"
                    transform="matrix(0, 1, -1, 0, 71, 172)"
                  >
                    <g id="그룹_4" data-name="그룹 4">
                      <g
                        id="그룹_3"
                        data-name="그룹 3"
                        clip-path="url(#clip-path-2)"
                      >
                        <path
                          id="패스_9"
                          data-name="패스 9"
                          d="M40.186,1.073H34.767A1.407,1.407,0,0,0,33.371,0H29.284a1.407,1.407,0,0,0-1.4,1.073H2.316A2.3,2.3,0,0,0,0,3.346V49.754a2.3,2.3,0,0,0,2.316,2.273h37.87a.557.557,0,0,0,.562-.551V1.624a.557.557,0,0,0-.562-.551M3.4,50.924H2.316a1.183,1.183,0,0,1-1.192-1.17V3.346a1.182,1.182,0,0,1,1.192-1.17H3.4ZM28.983,1.337a.278.278,0,0,1,.3-.234h4.087a.278.278,0,0,1,.3.234V7.2L31.616,5.989a.573.573,0,0,0-.577,0L28.983,7.2ZM39.624,50.924H4.519V2.176h23.34v6a.55.55,0,0,0,.285.48.574.574,0,0,0,.566-.007l2.618-1.539,2.618,1.539a.572.572,0,0,0,.566.007.55.55,0,0,0,.285-.48v-6h4.829Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_10"
                          data-name="패스 10"
                          d="M33.3,37.605H31.549a9.072,9.072,0,0,0-.359-2.052.518.518,0,0,0-.031-.108,9.151,9.151,0,0,0-1.034-2.227.538.538,0,0,0-.065-.1,9.388,9.388,0,0,0-1.27-1.547c-.009-.01-.015-.02-.025-.03a.535.535,0,0,0-.049-.039,9.489,9.489,0,0,0-1.53-1.193.544.544,0,0,0-.094-.059,9.5,9.5,0,0,0-2.279-1.01.577.577,0,0,0-.114-.032,9.559,9.559,0,0,0-2.036-.339l.009-1.613a.557.557,0,0,0-.559-.554h0a.557.557,0,0,0-.562.548l-.009,1.62a9.381,9.381,0,0,0-8.868,8.734H10.729a.552.552,0,1,0,0,1.1h1.947a9.379,9.379,0,0,0,8.766,8.682l-.009,1.653a.557.557,0,0,0,.559.555h0a.557.557,0,0,0,.562-.549l.009-1.644a9.384,9.384,0,0,0,8.981-8.7H33.3a.552.552,0,1,0,0-1.1M21.447,46.284A8.265,8.265,0,0,1,13.8,38.708h7.686Zm.047-8.679H13.8a8.265,8.265,0,0,1,7.736-7.628ZM30,35.5l-2.142,2.1H26.2l3.3-3.242A8.062,8.062,0,0,1,30,35.5m-1.1-2.106-4.288,4.209H23.383l4.97-4.879a8.2,8.2,0,0,1,.542.67m-6.237-3.421q.419.027.826.093l-.83.815Zm-.013,2.477,2.11-2.071a8.339,8.339,0,0,1,1.165.484l-3.284,3.223Zm-.017,3.2,4.281-4.2q.336.233.646.5l-4.933,4.842ZM22.57,46.3l.041-7.591h7.808A8.269,8.269,0,0,1,22.57,46.3m6.873-8.694.876-.86a8.016,8.016,0,0,1,.1.86Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_11"
                          data-name="패스 11"
                          d="M20.026,13.779l-2.739,8.552h1.076l.837-2.69H22.06l.861,2.69h1.113l-2.751-8.552Zm-.61,5,.789-2.474c.155-.521.287-1.041.407-1.548h.024c.12.495.239,1,.418,1.561l.789,2.462Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_12"
                          data-name="패스 12"
                          d="M30.242,13.779v8.552h1.041v-4.01h3.9v4.01h1.053V13.779H35.182v3.578h-3.9V13.779Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_13"
                          data-name="패스 13"
                          d="M7.623,10.772a.557.557,0,0,0,.562.551h28.17a.552.552,0,1,0,0-1.1H8.185a.557.557,0,0,0-.562.551"
                          fill="#fff"
                        />
                        <path
                          id="패스_14"
                          data-name="패스 14"
                          d="M15.194,18.575l.2,3.756h1.017l-.5-8.552H14.584l-1.435,4.136c-.359,1.079-.646,2.017-.849,2.88h-.036c-.2-.888-.478-1.827-.814-2.88l-1.375-4.136H8.747l-.562,8.552h.992l.215-3.667c.072-1.281.131-2.715.155-3.781h.024c.227,1.015.55,2.119.933,3.325l1.3,4.073H12.6l1.423-4.149c.407-1.18.742-2.246,1.017-3.248h.036c-.012,1.066.06,2.5.12,3.692"
                          fill="#fff"
                        />
                        <path
                          id="패스_15"
                          data-name="패스 15"
                          d="M36.355,24.321H8.185a.552.552,0,1,0,0,1.1h28.17a.552.552,0,1,0,0-1.1"
                          fill="#fff"
                        />
                        <path
                          id="패스_16"
                          data-name="패스 16"
                          d="M26.881,22.331V14.718h2.464v-.939H23.376v.939h2.452v7.613Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_18"
                    data-name="Vector Smart Object copy 18"
                    transform="matrix(0, 1, -1, 0, 316, 17)"
                  >
                    <g id="그룹_6" data-name="그룹 6">
                      <g
                        id="그룹_5"
                        data-name="그룹 5"
                        clip-path="url(#clip-path-2)"
                      >
                        <path
                          id="패스_17"
                          data-name="패스 17"
                          d="M40.186,1.073H34.767A1.407,1.407,0,0,0,33.371,0H29.284a1.407,1.407,0,0,0-1.4,1.073H2.316A2.3,2.3,0,0,0,0,3.346V49.754a2.3,2.3,0,0,0,2.316,2.273h37.87a.557.557,0,0,0,.562-.551V1.624a.557.557,0,0,0-.562-.551M3.4,50.924H2.316a1.183,1.183,0,0,1-1.192-1.17V3.346a1.182,1.182,0,0,1,1.192-1.17H3.4ZM28.983,1.337a.278.278,0,0,1,.3-.234h4.087a.278.278,0,0,1,.3.234V7.2L31.616,5.989a.573.573,0,0,0-.577,0L28.983,7.2ZM39.624,50.924H4.519V2.176h23.34v6a.55.55,0,0,0,.285.48.574.574,0,0,0,.566-.007l2.618-1.539,2.618,1.539a.572.572,0,0,0,.566.007.55.55,0,0,0,.285-.48v-6h4.829Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_18"
                          data-name="패스 18"
                          d="M33.3,37.605H31.549a9.072,9.072,0,0,0-.359-2.052.518.518,0,0,0-.031-.108,9.151,9.151,0,0,0-1.034-2.227.538.538,0,0,0-.065-.1,9.388,9.388,0,0,0-1.27-1.547c-.009-.01-.015-.02-.025-.03a.535.535,0,0,0-.049-.039,9.489,9.489,0,0,0-1.53-1.193.544.544,0,0,0-.094-.059,9.5,9.5,0,0,0-2.279-1.01.577.577,0,0,0-.114-.032,9.559,9.559,0,0,0-2.036-.339l.009-1.613a.557.557,0,0,0-.559-.554h0a.557.557,0,0,0-.562.548l-.009,1.62a9.381,9.381,0,0,0-8.868,8.734H10.729a.552.552,0,1,0,0,1.1h1.947a9.379,9.379,0,0,0,8.766,8.682l-.009,1.653a.557.557,0,0,0,.559.555h0a.557.557,0,0,0,.562-.549l.009-1.644a9.384,9.384,0,0,0,8.981-8.7H33.3a.552.552,0,1,0,0-1.1M21.447,46.284A8.265,8.265,0,0,1,13.8,38.708h7.686Zm.047-8.679H13.8a8.265,8.265,0,0,1,7.736-7.628ZM30,35.5l-2.142,2.1H26.2l3.3-3.242A8.062,8.062,0,0,1,30,35.5m-1.1-2.106-4.288,4.209H23.383l4.97-4.879a8.2,8.2,0,0,1,.542.67m-6.237-3.421q.419.027.826.093l-.83.815Zm-.013,2.477,2.11-2.071a8.339,8.339,0,0,1,1.165.484l-3.284,3.223Zm-.017,3.2,4.281-4.2q.336.233.646.5l-4.933,4.842ZM22.57,46.3l.041-7.591h7.808A8.269,8.269,0,0,1,22.57,46.3m6.873-8.694.876-.86a8.016,8.016,0,0,1,.1.86Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_19"
                          data-name="패스 19"
                          d="M20.026,13.779l-2.739,8.552h1.076l.837-2.69H22.06l.861,2.69h1.113l-2.751-8.552Zm-.61,5,.789-2.474c.155-.521.287-1.041.407-1.548h.024c.12.495.239,1,.418,1.561l.789,2.462Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_20"
                          data-name="패스 20"
                          d="M30.242,13.779v8.552h1.041v-4.01h3.9v4.01h1.053V13.779H35.182v3.578h-3.9V13.779Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_21"
                          data-name="패스 21"
                          d="M7.623,10.772a.557.557,0,0,0,.562.551h28.17a.552.552,0,1,0,0-1.1H8.185a.557.557,0,0,0-.562.551"
                          fill="#fff"
                        />
                        <path
                          id="패스_22"
                          data-name="패스 22"
                          d="M15.194,18.575l.2,3.756h1.017l-.5-8.552H14.584l-1.435,4.136c-.359,1.079-.646,2.017-.849,2.88h-.036c-.2-.888-.478-1.827-.814-2.88l-1.375-4.136H8.747l-.562,8.552h.992l.215-3.667c.072-1.281.131-2.715.155-3.781h.024c.227,1.015.55,2.119.933,3.325l1.3,4.073H12.6l1.423-4.149c.407-1.18.742-2.246,1.017-3.248h.036c-.012,1.066.06,2.5.12,3.692"
                          fill="#fff"
                        />
                        <path
                          id="패스_23"
                          data-name="패스 23"
                          d="M36.355,24.321H8.185a.552.552,0,1,0,0,1.1h28.17a.552.552,0,1,0,0-1.1"
                          fill="#fff"
                        />
                        <path
                          id="패스_24"
                          data-name="패스 24"
                          d="M26.881,22.331V14.718h2.464v-.939H23.376v.939h2.452v7.613Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object-2"
                    data-name="Vector Smart Object"
                    transform="matrix(0, 1, -1, 0, 72, 54)"
                  >
                    <g id="그룹_8" data-name="그룹 8">
                      <g
                        id="그룹_7"
                        data-name="그룹 7"
                        clip-path="url(#clip-path-4)"
                      >
                        <path
                          id="패스_25"
                          data-name="패스 25"
                          d="M32.585,38.913V2.609A2.6,2.6,0,0,0,30.008,0H2.576A2.6,2.6,0,0,0,0,2.609v36.3a2.6,2.6,0,0,0,2.576,2.609H30.008a2.6,2.6,0,0,0,2.576-2.609m-31.6,0V2.609A1.6,1.6,0,0,1,2.576,1H30.008a1.6,1.6,0,0,1,1.59,1.61v36.3a1.6,1.6,0,0,1-1.59,1.61H2.576a1.6,1.6,0,0,1-1.59-1.61"
                          fill="#fff"
                        />
                        <path
                          id="패스_26"
                          data-name="패스 26"
                          d="M30.357,3.507a1.245,1.245,0,0,0-1.235-1.251H3.463A1.245,1.245,0,0,0,2.228,3.507V38.015a1.245,1.245,0,0,0,1.235,1.251H29.122a1.245,1.245,0,0,0,1.235-1.251Zm-.986,34.508a.251.251,0,0,1-.249.253H3.463a.251.251,0,0,1-.249-.253v-3.1H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.052,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,34.763v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m2.96-.851h-.884c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V29.387H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,29.239v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.851h-.884c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214v-4.35H22.272c.051,1.17.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.052,1.17.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884Zm-6.118-4.5v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m2.96-.851h-.884c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V18.6H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,18.457v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.851h-.884c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V13.212H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,13.064v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.851h-.884c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V8.1h9.6c.127,1.046.743,1.817,1.508,1.817s1.381-.772,1.508-1.817h.143c.127,1.046.743,1.817,1.508,1.817s1.381-.772,1.508-1.817h.142c.127,1.046.743,1.817,1.508,1.817S22.023,9.146,22.15,8.1h.142c.127,1.046.743,1.817,1.508,1.817s1.381-.772,1.508-1.817h.142c.127,1.046.743,1.817,1.508,1.817S28.34,9.146,28.467,8.1h.9ZM13.777,7.7V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.6h-.879V7c0-1.243-.673-2.216-1.533-2.216S25.425,5.757,25.425,7v.1h-.092V7c0-1.243-.673-2.216-1.533-2.216S22.267,5.757,22.267,7v.1h-.092V7c0-1.243-.674-2.216-1.533-2.216S19.108,5.757,19.108,7v.1h-.092V7c0-1.243-.674-2.216-1.533-2.216S15.95,5.757,15.95,7v.1h-.092V7c0-1.243-.673-2.216-1.533-2.216S12.791,5.757,12.791,7v.1H3.214V3.507a.251.251,0,0,1,.249-.253H29.122a.251.251,0,0,1,.249.253Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_4"
                    data-name="Vector Smart Object copy 4"
                    transform="matrix(0, 1, -1, 0, 581, 273)"
                  >
                    <g id="그룹_10" data-name="그룹 10">
                      <g
                        id="그룹_9"
                        data-name="그룹 9"
                        clip-path="url(#clip-path-4)"
                      >
                        <path
                          id="패스_27"
                          data-name="패스 27"
                          d="M32.585,38.913V2.609A2.6,2.6,0,0,0,30.008,0H2.576A2.6,2.6,0,0,0,0,2.609v36.3a2.6,2.6,0,0,0,2.576,2.609H30.008a2.6,2.6,0,0,0,2.576-2.609m-31.6,0V2.609A1.6,1.6,0,0,1,2.576,1H30.008a1.6,1.6,0,0,1,1.59,1.61v36.3a1.6,1.6,0,0,1-1.59,1.61H2.576a1.6,1.6,0,0,1-1.59-1.61"
                          fill="#fff"
                        />
                        <path
                          id="패스_28"
                          data-name="패스 28"
                          d="M30.357,3.507a1.245,1.245,0,0,0-1.235-1.251H3.463A1.245,1.245,0,0,0,2.228,3.507V38.015a1.245,1.245,0,0,0,1.235,1.251H29.122a1.245,1.245,0,0,0,1.235-1.251Zm-.986,34.508a.251.251,0,0,1-.249.253H3.463a.251.251,0,0,1-.249-.253v-3.1H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.052,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,34.763v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m2.96-.851h-.884c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V29.387H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,29.239v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.851h-.884c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214v-4.35H22.272c.051,1.17.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.052,1.17.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884Zm-6.118-4.5v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m2.96-.851h-.884c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V18.6H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,18.457v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.851h-.884c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V13.212H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,13.064v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.851h-.884c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V8.1h9.6c.127,1.046.743,1.817,1.508,1.817s1.381-.772,1.508-1.817h.143c.127,1.046.743,1.817,1.508,1.817s1.381-.772,1.508-1.817h.142c.127,1.046.743,1.817,1.508,1.817S22.023,9.146,22.15,8.1h.142c.127,1.046.743,1.817,1.508,1.817s1.381-.772,1.508-1.817h.142c.127,1.046.743,1.817,1.508,1.817S28.34,9.146,28.467,8.1h.9ZM13.777,7.7V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.6h-.879V7c0-1.243-.673-2.216-1.533-2.216S25.425,5.757,25.425,7v.1h-.092V7c0-1.243-.673-2.216-1.533-2.216S22.267,5.757,22.267,7v.1h-.092V7c0-1.243-.674-2.216-1.533-2.216S19.108,5.757,19.108,7v.1h-.092V7c0-1.243-.674-2.216-1.533-2.216S15.95,5.757,15.95,7v.1h-.092V7c0-1.243-.673-2.216-1.533-2.216S12.791,5.757,12.791,7v.1H3.214V3.507a.251.251,0,0,1,.249-.253H29.122a.251.251,0,0,1,.249.253Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_29"
                    data-name="Vector Smart Object copy 29"
                    transform="translate(629 226)"
                  >
                    <g id="그룹_12" data-name="그룹 12">
                      <g
                        id="그룹_11"
                        data-name="그룹 11"
                        clip-path="url(#clip-path-6)"
                      >
                        <path
                          id="패스_29"
                          data-name="패스 29"
                          d="M6.254,37.668a1.726,1.726,0,1,0,1.775,1.725,1.752,1.752,0,0,0-1.775-1.725m0,2.247a.522.522,0,1,1,.537-.521.53.53,0,0,1-.537.521"
                          fill="#fff"
                        />
                        <path
                          id="패스_30"
                          data-name="패스 30"
                          d="M9.9,21.46H9.91l2.182-.024a.634.634,0,0,0,.2-.036l24.737.036,2.153.024h.007a.6.6,0,1,0,.007-1.2l-1.558-.017a12.269,12.269,0,0,0-.3-2.189l1.507-.377a.6.6,0,0,0,.445-.733.62.62,0,0,0-.754-.433l-1.525.382a12.388,12.388,0,0,0-.844-1.945l1.311-.722a.593.593,0,0,0,.234-.82.629.629,0,0,0-.844-.227l-1.327.731a12.812,12.812,0,0,0-1.326-1.662l1.1-1.057a.59.59,0,0,0,.006-.851.631.631,0,0,0-.875-.006L33.331,11.4a13.137,13.137,0,0,0-1.714-1.269l.794-1.323a.593.593,0,0,0-.222-.823.63.63,0,0,0-.847.216l-.8,1.328a13.268,13.268,0,0,0-1.986-.8l.415-1.486a.6.6,0,0,0-.436-.738.62.62,0,0,0-.759.423l-.416,1.49a13.365,13.365,0,0,0-2.131-.276l0-1.54a.61.61,0,0,0-.618-.6h0A.611.611,0,0,0,24,6.6l0,1.539a13.374,13.374,0,0,0-2.265.292l-.419-1.5a.621.621,0,0,0-.76-.423.6.6,0,0,0-.435.738l.42,1.5a13.089,13.089,0,0,0-1.977.807L17.746,8.2a.629.629,0,0,0-.847-.216.593.593,0,0,0-.223.823l.813,1.353a13.109,13.109,0,0,0-1.695,1.274l-1.148-1.1a.631.631,0,0,0-.875.006.59.59,0,0,0,.006.851l1.142,1.1A12.8,12.8,0,0,0,13.61,13.94l-1.385-.763a.628.628,0,0,0-.844.227.593.593,0,0,0,.233.82l1.372.756a12.331,12.331,0,0,0-.83,1.93l-1.6-.4a.62.62,0,0,0-.754.433.6.6,0,0,0,.445.733l1.586.4a12.374,12.374,0,0,0-.295,2.168L9.9,20.257a.6.6,0,1,0,.007,1.2m6.339-8.78a11.9,11.9,0,0,1,8.33-3.355H24.6a12.039,12.039,0,0,1,5.853,1.523l.009.007.011,0a11.76,11.76,0,0,1,4.308,4.146l0,.006.007.008a11.237,11.237,0,0,1,1.164,2.649.335.335,0,0,0,.049.175,11.1,11.1,0,0,1,.389,2.389L12.778,20.2a11.275,11.275,0,0,1,3.464-7.517"
                          fill="#fff"
                        />
                        <path
                          id="패스_31"
                          data-name="패스 31"
                          d="M3.909,15.4V15.4a20.192,20.192,0,0,0-.73,4.779l-1.685,0h0a.627.627,0,0,0-.437.175.593.593,0,0,0-.182.425L.86,29.231a.61.61,0,0,0,.618.6l3.391.005.019,0h0l.019,0,3.9.006.021,0h0l.02,0,3.9.006.019,0h0l.019,0,3.9.005.02,0h0l.02,0,3.9.006.019,0h0l.018,0,3.9.006.02,0h0l.02,0,3.9.006.018,0h0l.018,0,3.9.006.02,0h0l.02,0,3.9.005.018,0h0l.018,0,3.9.006.019,0h0l.019,0,3.9.006.017,0h0l.017,0,3.392.005h0a.628.628,0,0,0,.437-.176.592.592,0,0,0,.182-.425l.013-8.45a.593.593,0,0,0-.181-.426.629.629,0,0,0-.437-.177l-1.686,0a20.169,20.169,0,0,0-.716-4.782v-.005l0,0a20.381,20.381,0,0,0-2.109-4.974c-.007-.015-.013-.031-.021-.046a.64.64,0,0,0-.043-.058,21.027,21.027,0,0,0-3.271-4.156.589.589,0,0,0-.083-.1.607.607,0,0,0-.1-.078,21.487,21.487,0,0,0-4.271-3.194A.616.616,0,0,0,35.32,2.8a.61.61,0,0,0-.085-.037A21.627,21.627,0,0,0,30.187.727l-.028-.01-.024,0A21.943,21.943,0,0,0,24.618,0h-.033A21.933,21.933,0,0,0,19.1.7l-.022,0-.027.01a21.627,21.627,0,0,0-5.053,2.024.662.662,0,0,0-.089.039.6.6,0,0,0-.065.046A21.5,21.5,0,0,0,9.564,6a.6.6,0,0,0-.1.077.611.611,0,0,0-.084.1A21.023,21.023,0,0,0,6.1,10.32a.584.584,0,0,0-.046.061.491.491,0,0,0-.023.05,20.365,20.365,0,0,0-2.122,4.964l0,0m1.045.9,2.887.756A.631.631,0,0,0,8,17.073a.617.617,0,0,0,.6-.445.6.6,0,0,0-.437-.738l-2.888-.757a19.177,19.177,0,0,1,1.554-3.622l2.586,1.456a.632.632,0,0,0,.31.081.622.622,0,0,0,.536-.3.592.592,0,0,0-.225-.822L7.452,10.472a19.829,19.829,0,0,1,2.466-3.1l2.1,2.05a.632.632,0,0,0,.875,0,.59.59,0,0,0,0-.851l-2.1-2.05A20.254,20.254,0,0,1,14,4.131l1.488,2.513a.622.622,0,0,0,.537.3.631.631,0,0,0,.308-.08.593.593,0,0,0,.228-.822L15.067,3.528a20.374,20.374,0,0,1,3.73-1.5l.769,2.808a.617.617,0,0,0,.6.447.632.632,0,0,0,.16-.02.6.6,0,0,0,.439-.736l-.769-2.806a20.676,20.676,0,0,1,4-.5l0,2.9a.611.611,0,0,0,.618.6h0a.61.61,0,0,0,.619-.6l0-2.9a20.7,20.7,0,0,1,4,.515l-.778,2.8a.6.6,0,0,0,.437.738.646.646,0,0,0,.161.021.617.617,0,0,0,.6-.446l.778-2.806a20.392,20.392,0,0,1,3.726,1.509l-1.5,2.512a.593.593,0,0,0,.225.822.63.63,0,0,0,.31.081.623.623,0,0,0,.536-.3l1.5-2.509a20.255,20.255,0,0,1,3.194,2.4L36.312,8.6a.59.59,0,0,0,0,.851.632.632,0,0,0,.875,0l2.109-2.044a19.819,19.819,0,0,1,2.456,3.111l-2.586,1.447a.592.592,0,0,0-.228.821.63.63,0,0,0,.845.221l2.59-1.448a19.2,19.2,0,0,1,1.542,3.626l-2.891.748a.6.6,0,0,0-.439.736.617.617,0,0,0,.6.447.646.646,0,0,0,.159-.02l2.889-.748a19.032,19.032,0,0,1,.519,3.891l-2.988,0h0a.6.6,0,1,0,0,1.2l3.619.005h0l1.676,0L47.049,28.7l-2.172,0,0-2.915a.61.61,0,0,0-.618-.6h0a.61.61,0,0,0-.619.6l0,2.915-2.7,0,0-1.518a.61.61,0,0,0-.618-.6h0a.61.61,0,0,0-.619.6l0,1.518-2.7,0,0-2.915a.611.611,0,0,0-.618-.6h0a.61.61,0,0,0-.619.6l0,2.915-2.7,0,0-1.518a.61.61,0,0,0-.618-.6h0a.611.611,0,0,0-.619.6l0,1.518-2.7,0,0-2.915a.611.611,0,0,0-.618-.6h0a.61.61,0,0,0-.619.6l0,2.915-2.7,0,0-1.518a.61.61,0,0,0-.618-.6h0a.611.611,0,0,0-.619.6l0,1.518-2.7,0,0-2.915a.61.61,0,0,0-.618-.6h0a.61.61,0,0,0-.619.6l0,2.915-2.7,0,0-1.518a.611.611,0,0,0-.618-.6h0a.611.611,0,0,0-.619.6l0,1.518-2.7,0,0-2.915a.61.61,0,0,0-.618-.6h0a.611.611,0,0,0-.619.6l0,2.915-2.7,0,0-1.518a.611.611,0,0,0-.618-.6h0a.61.61,0,0,0-.619.6l0,1.518-2.7,0,0-2.915a.61.61,0,0,0-.618-.6h0a.61.61,0,0,0-.619.6l0,2.915-2.172,0,.011-7.246,1.676,0h0l3.62.005h0a.6.6,0,1,0,0-1.2l-2.988,0a19.042,19.042,0,0,1,.531-3.89"
                          fill="#fff"
                        />
                        <path
                          id="패스_32"
                          data-name="패스 32"
                          d="M0,33.142V43.4a.592.592,0,0,0,.181.425A.628.628,0,0,0,.619,44H49.381a.629.629,0,0,0,.438-.176A.593.593,0,0,0,50,43.4V33.143a.611.611,0,0,0-.619-.6H.619a.611.611,0,0,0-.619.6m1.238.6H3.75v3.122a.619.619,0,0,0,1.238,0V33.744H7.853v2.129a.619.619,0,0,0,1.238,0V33.744h2.865v3.122a.619.619,0,0,0,1.238,0V33.744h2.865v2.129a.619.619,0,0,0,1.238,0V33.744h2.865v3.121a.619.619,0,0,0,1.238,0V33.744h2.864v2.129a.619.619,0,0,0,1.238,0V33.744h2.865v3.121a.619.619,0,0,0,1.238,0V33.744h2.865v2.129a.619.619,0,0,0,1.238,0V33.745h2.865v3.121a.619.619,0,0,0,1.238,0V33.745h2.865v2.129a.619.619,0,0,0,1.238,0V33.745h2.864v3.121a.619.619,0,0,0,1.238,0V33.745h2.748V42.8H1.238Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_19"
                    data-name="Vector Smart Object copy 19"
                    transform="translate(431 29)"
                  >
                    <g id="그룹_14" data-name="그룹 14">
                      <g
                        id="그룹_13"
                        data-name="그룹 13"
                        clip-path="url(#clip-path-7)"
                      >
                        <path
                          id="패스_33"
                          data-name="패스 33"
                          d="M34.574,13.186l-3.305,5.609q-.131-.232-.262-.455l-2.824-5.146a.924.924,0,0,0-.8-.448H24.491a.921.921,0,0,0-.8.459.852.852,0,0,0,.026.891l4.916,7.741-5.117,7.4a.855.855,0,0,0-.06.914.919.919,0,0,0,.812.474H27.1a.928.928,0,0,0,.793-.441l2.922-5.046.316-.5c.108.18.207.34.3.478L34.31,30.2a.93.93,0,0,0,.784.426H37.98a.92.92,0,0,0,.808-.467.851.851,0,0,0-.04-.9l-4.961-7.478,5.063-7.671a.856.856,0,0,0,.04-.9.92.92,0,0,0-.807-.466H35.367a.932.932,0,0,0-.793.441m3.04.691-4.9,7.417a.852.852,0,0,0-.005.97l4.8,7.23H35.247l-2.8-4.945c-.209-.329-.461-.75-.75-1.254A.591.591,0,0,0,31.183,23h-.068a.591.591,0,0,0-.513.291c-.03.052-.172.284-.8,1.275l-2.852,4.925H24.746l4.941-7.148a.851.851,0,0,0,.026-.971l-4.762-7.5h2.278l2.747,5.005c.244.417.486.851.718,1.288a.59.59,0,0,0,.523.308h.068a.591.591,0,0,0,.51-.286l3.722-6.316Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_34"
                          data-name="패스 34"
                          d="M1.772,18.955a.805.805,0,0,0,1.047.383l3.246-1.408,4.331,12.2A2.861,2.861,0,0,0,13.109,32l.113,0a2.86,2.86,0,0,0,2.662-2.065L23.023,5.1H37.286a.779.779,0,0,0,.792-.764V.764A.779.779,0,0,0,37.286,0H20.806A2.848,2.848,0,0,0,18.03,2.07L12.75,20.827,10.5,13.558a2.859,2.859,0,0,0-.691-1.117,2.939,2.939,0,0,0-3.224-.582L.467,14.512a.77.77,0,0,0-.416.426.74.74,0,0,0,.024.6Zm5.292-6.064A1.694,1.694,0,0,1,9.38,13.9l2.639,8.514a.8.8,0,0,0,1.515-.05L19.166,2.359a1.682,1.682,0,0,1,1.64-1.227H36.9V3.966H22.733a.785.785,0,0,0-.765.564L14.749,29.641a1.689,1.689,0,0,1-1.568,1.225h-.072a1.689,1.689,0,0,1-1.6-1.1L7.04,17.181a.778.778,0,0,0-.435-.453.82.82,0,0,0-.64,0L2.678,18.158,1.305,15.389Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_20"
                    data-name="Vector Smart Object copy 20"
                    transform="translate(627 115)"
                  >
                    <g id="그룹_16" data-name="그룹 16">
                      <g
                        id="그룹_15"
                        data-name="그룹 15"
                        clip-path="url(#clip-path-7)"
                      >
                        <path
                          id="패스_35"
                          data-name="패스 35"
                          d="M34.574,13.186l-3.305,5.609q-.131-.232-.262-.455l-2.824-5.146a.924.924,0,0,0-.8-.448H24.491a.921.921,0,0,0-.8.459.852.852,0,0,0,.026.891l4.916,7.741-5.117,7.4a.855.855,0,0,0-.06.914.919.919,0,0,0,.812.474H27.1a.928.928,0,0,0,.793-.441l2.922-5.046.316-.5c.108.18.207.34.3.478L34.31,30.2a.93.93,0,0,0,.784.426H37.98a.92.92,0,0,0,.808-.467.851.851,0,0,0-.04-.9l-4.961-7.478,5.063-7.671a.856.856,0,0,0,.04-.9.92.92,0,0,0-.807-.466H35.367a.932.932,0,0,0-.793.441m3.04.691-4.9,7.417a.852.852,0,0,0-.005.97l4.8,7.23H35.247l-2.8-4.945c-.209-.329-.461-.75-.75-1.254A.591.591,0,0,0,31.183,23h-.068a.591.591,0,0,0-.513.291c-.03.052-.172.284-.8,1.275l-2.852,4.925H24.746l4.941-7.148a.851.851,0,0,0,.026-.971l-4.762-7.5h2.278l2.747,5.005c.244.417.486.851.718,1.288a.59.59,0,0,0,.523.308h.068a.591.591,0,0,0,.51-.286l3.722-6.316Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_36"
                          data-name="패스 36"
                          d="M1.772,18.955a.805.805,0,0,0,1.047.383l3.246-1.408,4.331,12.2A2.861,2.861,0,0,0,13.109,32l.113,0a2.86,2.86,0,0,0,2.662-2.065L23.023,5.1H37.286a.779.779,0,0,0,.792-.764V.764A.779.779,0,0,0,37.286,0H20.806A2.848,2.848,0,0,0,18.03,2.07L12.75,20.827,10.5,13.558a2.859,2.859,0,0,0-.691-1.117,2.939,2.939,0,0,0-3.224-.582L.467,14.512a.77.77,0,0,0-.416.426.74.74,0,0,0,.024.6Zm5.292-6.064A1.694,1.694,0,0,1,9.38,13.9l2.639,8.514a.8.8,0,0,0,1.515-.05L19.166,2.359a1.682,1.682,0,0,1,1.64-1.227H36.9V3.966H22.733a.785.785,0,0,0-.765.564L14.749,29.641a1.689,1.689,0,0,1-1.568,1.225h-.072a1.689,1.689,0,0,1-1.6-1.1L7.04,17.181a.778.778,0,0,0-.435-.453.82.82,0,0,0-.64,0L2.678,18.158,1.305,15.389Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_6"
                    data-name="Vector Smart Object copy 6"
                    transform="translate(183 51)"
                  >
                    <g id="그룹_18" data-name="그룹 18">
                      <g
                        id="그룹_17"
                        data-name="그룹 17"
                        clip-path="url(#clip-path-9)"
                      >
                        <path
                          id="패스_37"
                          data-name="패스 37"
                          d="M36.068,32.243H21.955a.938.938,0,0,0-.932.941v1.875a.938.938,0,0,0,.932.941H36.068A.938.938,0,0,0,37,35.058V33.185a.938.938,0,0,0-.932-.942M35.813,34.8H22.21V33.443h13.6Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_38"
                          data-name="패스 38"
                          d="M15.977,35.059V33.184a.938.938,0,0,0-.932-.941H.932A.938.938,0,0,0,0,33.185v1.873A.938.938,0,0,0,.932,36H15.045a.938.938,0,0,0,.932-.941M14.79,34.8H1.188V33.443h13.6Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_39"
                          data-name="패스 39"
                          d="M0,28.009V30.5a.94.94,0,0,0,.435.8.919.919,0,0,0,.9.052l13.68-6.629a.946.946,0,0,0,.012-1.693L1.347,16.153a.917.917,0,0,0-.906.042A.939.939,0,0,0,0,17v2.751a.952.952,0,0,0,.545.857L7.8,23.878.531,27.158A.948.948,0,0,0,0,28.009m1.187.167,7.635-3.447a.947.947,0,0,0-.013-1.708L1.187,19.581V17.413L14.03,23.869,1.187,30.091Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_40"
                          data-name="패스 40"
                          d="M16.063,3.695V.943a.939.939,0,0,0-.441-.8A.915.915,0,0,0,14.716.1L1.036,6.975a.947.947,0,0,0,.012,1.694L14.729,15.3a.919.919,0,0,0,.9-.052.939.939,0,0,0,.435-.8V11.956a.951.951,0,0,0-.544-.857L8.267,7.825l7.264-3.28a.947.947,0,0,0,.532-.851m-1.187-.168L7.241,6.974a.947.947,0,0,0,.012,1.708l7.623,3.441v1.915L2.033,7.815,14.876,1.36Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_41"
                          data-name="패스 41"
                          d="M21.385,11.955v2.493a.94.94,0,0,0,.435.8.919.919,0,0,0,.9.052L36.4,8.669a.946.946,0,0,0,.013-1.693L22.733.1a.917.917,0,0,0-.906.042.939.939,0,0,0-.441.8V3.695a.951.951,0,0,0,.545.857l7.251,3.273L21.917,11.1a.947.947,0,0,0-.532.851m1.187.168,7.635-3.447a.947.947,0,0,0-.013-1.708L22.573,3.527V1.36L35.416,7.815,22.573,14.038Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_42"
                          data-name="패스 42"
                          d="M36.559,16.2a.915.915,0,0,0-.906-.042l-13.68,6.876a.947.947,0,0,0,.012,1.694l13.68,6.628a.919.919,0,0,0,.9-.052A.94.94,0,0,0,37,30.5V28.009a.953.953,0,0,0-.544-.857L29.2,23.878,36.468,20.6A.948.948,0,0,0,37,19.748V17a.939.939,0,0,0-.441-.8m-.746,3.385-7.635,3.447a.947.947,0,0,0,.013,1.708l7.623,3.441v1.915L22.97,23.869l12.843-6.455Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_8"
                    data-name="Vector Smart Object copy 8"
                    transform="translate(120 93)"
                  >
                    <g id="그룹_20" data-name="그룹 20">
                      <g
                        id="그룹_19"
                        data-name="그룹 19"
                        clip-path="url(#clip-path-10)"
                      >
                        <path
                          id="패스_43"
                          data-name="패스 43"
                          d="M22.02,7.462H15.538V.98a.98.98,0,0,0-.98-.98H8.442a.98.98,0,0,0-.981.98V7.462H.98a.98.98,0,0,0-.98.98v6.116a.98.98,0,0,0,.98.98H7.462V22.02a.98.98,0,0,0,.981.98h6.116a.98.98,0,0,0,.98-.98V15.538H22.02a.98.98,0,0,0,.98-.98V8.442a.98.98,0,0,0-.98-.98m-.98,6.116H14.558a.98.98,0,0,0-.98.98V21.04H9.422V14.558a.98.98,0,0,0-.98-.98H1.96V9.422H8.442a.98.98,0,0,0,.98-.98V1.96h4.156V8.442a.98.98,0,0,0,.98.98H21.04Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_24"
                    data-name="Vector Smart Object copy 24"
                    transform="translate(362 48)"
                  >
                    <g id="그룹_22" data-name="그룹 22">
                      <g
                        id="그룹_21"
                        data-name="그룹 21"
                        clip-path="url(#clip-path-10)"
                      >
                        <path
                          id="패스_44"
                          data-name="패스 44"
                          d="M22.02,7.462H15.538V.98a.98.98,0,0,0-.98-.98H8.442a.98.98,0,0,0-.981.98V7.462H.98a.98.98,0,0,0-.98.98v6.116a.98.98,0,0,0,.98.98H7.462V22.02a.98.98,0,0,0,.981.98h6.116a.98.98,0,0,0,.98-.98V15.538H22.02a.98.98,0,0,0,.98-.98V8.442a.98.98,0,0,0-.98-.98m-.98,6.116H14.558a.98.98,0,0,0-.98.98V21.04H9.422V14.558a.98.98,0,0,0-.98-.98H1.96V9.422H8.442a.98.98,0,0,0,.98-.98V1.96h4.156V8.442a.98.98,0,0,0,.98.98H21.04Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_27"
                    data-name="Vector Smart Object copy 27"
                    transform="translate(481 330)"
                  >
                    <g id="그룹_24" data-name="그룹 24">
                      <g
                        id="그룹_23"
                        data-name="그룹 23"
                        clip-path="url(#clip-path-10)"
                      >
                        <path
                          id="패스_45"
                          data-name="패스 45"
                          d="M22.02,7.462H15.538V.98a.98.98,0,0,0-.98-.98H8.442a.98.98,0,0,0-.981.98V7.462H.98a.98.98,0,0,0-.98.98v6.116a.98.98,0,0,0,.98.98H7.462V22.02a.98.98,0,0,0,.981.98h6.116a.98.98,0,0,0,.98-.98V15.538H22.02a.98.98,0,0,0,.98-.98V8.442a.98.98,0,0,0-.98-.98m-.98,6.116H14.558a.98.98,0,0,0-.98.98V21.04H9.422V14.558a.98.98,0,0,0-.98-.98H1.96V9.422H8.442a.98.98,0,0,0,.98-.98V1.96h4.156V8.442a.98.98,0,0,0,.98.98H21.04Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_9"
                    data-name="Vector Smart Object copy 9"
                    transform="translate(590 170)"
                  >
                    <g id="그룹_26" data-name="그룹 26">
                      <g
                        id="그룹_25"
                        data-name="그룹 25"
                        clip-path="url(#clip-path-13)"
                      >
                        <path
                          id="패스_46"
                          data-name="패스 46"
                          d="M.895,7h19.21A.873.873,0,0,0,21,6.15V.85A.873.873,0,0,0,20.105,0H.895A.873.873,0,0,0,0,.85v5.3A.873.873,0,0,0,.895,7M1.79,1.7H19.21V5.3H1.79Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy"
                    data-name="Vector Smart Object copy"
                    transform="translate(106 165)"
                  >
                    <g id="그룹_28" data-name="그룹 28">
                      <g
                        id="그룹_27"
                        data-name="그룹 27"
                        clip-path="url(#clip-path-13)"
                      >
                        <path
                          id="패스_47"
                          data-name="패스 47"
                          d="M.895,7h19.21A.873.873,0,0,0,21,6.15V.85A.873.873,0,0,0,20.105,0H.895A.873.873,0,0,0,0,.85v5.3A.873.873,0,0,0,.895,7M1.79,1.7H19.21V5.3H1.79Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_3"
                    data-name="Vector Smart Object copy 3"
                  >
                    <g id="그룹_30" data-name="그룹 30">
                      <g
                        id="그룹_29"
                        data-name="그룹 29"
                        clip-path="url(#clip-path-15)"
                      >
                        <path
                          id="패스_48"
                          data-name="패스 48"
                          d="M369.7,351.163l.117.237a.687.687,0,0,0,.409.346.864.864,0,0,0,.389.051.832.832,0,0,0,.353-.124,1.1,1.1,0,0,0,.3-.281,1.6,1.6,0,0,0,.218-.424,1.456,1.456,0,0,0,.086-.418.962.962,0,0,0-.048-.36.727.727,0,0,0-.179-.281.836.836,0,0,0-.307-.186.826.826,0,0,0-.445-.038.752.752,0,0,0-.19.065l-.246.121.465-1.324-.211-.076-1.024,2.92.211.076Zm.272-.775a.923.923,0,0,1,.149-.273.751.751,0,0,1,.22-.19.683.683,0,0,1,.273-.084.719.719,0,0,1,.542.189.579.579,0,0,1,.14.227.792.792,0,0,1,.037.291,1.2,1.2,0,0,1-.07.338,1.51,1.51,0,0,1-.178.359.952.952,0,0,1-.233.241.611.611,0,0,1-.577.076.665.665,0,0,1-.24-.147.65.65,0,0,1-.15-.22.734.734,0,0,1-.054-.262.787.787,0,0,1,.046-.28Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_49"
                          data-name="패스 49"
                          d="M366.966,364.77l9.319,3.341a1.3,1.3,0,0,0,1.633-.841l6.334-18.053a1.317,1.317,0,0,0-.743-1.693l-25.9-9.285a1.3,1.3,0,0,0-1.633.841l-6.334,18.053a1.316,1.316,0,0,0,.743,1.693l9.63,3.452-8.566,7.162a.341.341,0,0,0-.045.476.332.332,0,0,0,.471.045l.154-.129,8.721-7.291,2.453.879-3.247,9.254h0a.339.339,0,0,0,.2.432.334.334,0,0,0,.427-.206h0l3.247-9.254,2.375.851L369,375.915l.053.217a.335.335,0,0,0,.405.247.339.339,0,0,0,.245-.409Zm-16.356-6.582a.639.639,0,0,1-.336-.829l6.334-18.053a.628.628,0,0,1,.778-.429l25.9,9.285a.639.639,0,0,1,.336.829l-6.334,18.053a.628.628,0,0,1-.778.429Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_50"
                          data-name="패스 50"
                          d="M364.537,344.69a.333.333,0,0,0-.6.067l-3.116,8.88-.552,1.573a.339.339,0,0,0,.2.432l1.4.5,11.7,4.194a.332.332,0,0,0,.373-.107.341.341,0,0,0,.022-.392Zm-2.755,10.7-.768-.275.328-.935.768.275Zm9.207,3.3-8.576-3.074.44-1.254a.339.339,0,0,0-.2-.432l-1.084-.389,2.773-7.9,7.476,12.009a2.979,2.979,0,0,0-.826,1.043m.635.228a2.307,2.307,0,0,1,.549-.694l.714,1.147Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_51"
                          data-name="패스 51"
                          d="M382.581,350.179a1.36,1.36,0,0,0-.768-1.749l-23.452-8.407a1.338,1.338,0,0,0-1.686.87l-5.36,15.278a1.36,1.36,0,0,0,.767,1.749l23.452,8.407a1.338,1.338,0,0,0,1.686-.87Zm-5.991,15.052a.671.671,0,0,1-.832.458l-23.452-8.408a.682.682,0,0,1-.36-.885l5.36-15.278a.671.671,0,0,1,.832-.458l23.452,8.408a.682.682,0,0,1,.36.885Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_52"
                          data-name="패스 52"
                          d="M368.349,358.844a1.56,1.56,0,0,0-1.168-.432,1.343,1.343,0,0,0-.542.163,1.438,1.438,0,0,0-.428.37,1.788,1.788,0,0,0-.282.518,1.707,1.707,0,0,0-.1.557,1.381,1.381,0,0,0,.1.525,1.249,1.249,0,0,0,.3.437,1.338,1.338,0,0,0,.486.29,1.46,1.46,0,0,0,.779.067.221.221,0,0,0,.161-.142l.1-.281a.221.221,0,0,0-.048-.226.214.214,0,0,0-.221-.058.772.772,0,0,1-.5-.011.616.616,0,0,1-.242-.148.553.553,0,0,1-.127-.209.718.718,0,0,1-.031-.266,1.146,1.146,0,0,1,.063-.307,1.086,1.086,0,0,1,.156-.3.778.778,0,0,1,.212-.2.6.6,0,0,1,.248-.084.638.638,0,0,1,.287.04.789.789,0,0,1,.374.28.215.215,0,0,0,.207.086.217.217,0,0,0,.172-.144l.106-.3a.222.222,0,0,0-.052-.23m-.733.1a.856.856,0,0,0-.387-.051.821.821,0,0,0-.339.116,1,1,0,0,0-.273.253,1.312,1.312,0,0,0-.189.357,1.377,1.377,0,0,0-.076.368.947.947,0,0,0,.042.35.778.778,0,0,0,.178.294.833.833,0,0,0,.328.2.921.921,0,0,0,.637.006l-.094.277a1.2,1.2,0,0,1-.574-.035l-.2-.09.095.053-.1-.036.105.038.094.034c-.031-.009-.062-.016-.094-.027a1.1,1.1,0,0,1-.392-.236,1.024,1.024,0,0,1-.245-.358,1.157,1.157,0,0,1-.081-.438,1.48,1.48,0,0,1,.088-.483,1.562,1.562,0,0,1,.246-.453,1.212,1.212,0,0,1,.362-.312,1.118,1.118,0,0,1,.453-.136,1.237,1.237,0,0,1,.515.075,1.312,1.312,0,0,1,.475.291l-.1.3a1.006,1.006,0,0,0-.479-.358"
                          fill="#fff"
                        />
                        <path
                          id="패스_53"
                          data-name="패스 53"
                          d="M369.887,351.2a.65.65,0,0,0,.15.22.665.665,0,0,0,.24.147.611.611,0,0,0,.577-.076.952.952,0,0,0,.233-.241,1.51,1.51,0,0,0,.178-.359,1.2,1.2,0,0,0,.07-.338.792.792,0,0,0-.037-.291.579.579,0,0,0-.14-.227.719.719,0,0,0-.542-.189.683.683,0,0,0-.273.084.751.751,0,0,0-.22.19.923.923,0,0,0-.149.273l-.093.265a.787.787,0,0,0-.046.28.737.737,0,0,0,.054.262m.3-.732a.7.7,0,0,1,.112-.207.527.527,0,0,1,.155-.134.459.459,0,0,1,.185-.057h0a.489.489,0,0,1,.211.031.408.408,0,0,1,.154.094.353.353,0,0,1,.086.139.566.566,0,0,1,.025.207.967.967,0,0,1-.057.273,1.286,1.286,0,0,1-.15.3.73.73,0,0,1-.177.185.42.42,0,0,1-.18.073.447.447,0,0,1-.355-.121.424.424,0,0,1-.1-.144.511.511,0,0,1-.037-.181.564.564,0,0,1,.033-.2Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_54"
                          data-name="패스 54"
                          d="M367.714,358.712a1.238,1.238,0,0,0-.515-.075,1.118,1.118,0,0,0-.453.136,1.212,1.212,0,0,0-.362.313,1.562,1.562,0,0,0-.246.453,1.484,1.484,0,0,0-.088.483,1.157,1.157,0,0,0,.081.438,1.024,1.024,0,0,0,.245.358,1.1,1.1,0,0,0,.392.236c.032.011.063.018.094.027l-.094-.034-.105-.038.1.036-.095-.053.2.09a1.2,1.2,0,0,0,.574.035l.094-.277a.921.921,0,0,1-.637-.007.833.833,0,0,1-.329-.2.778.778,0,0,1-.178-.294.944.944,0,0,1-.042-.35,1.371,1.371,0,0,1,.076-.368,1.312,1.312,0,0,1,.189-.357,1,1,0,0,1,.274-.253.818.818,0,0,1,.339-.116.854.854,0,0,1,.387.051,1,1,0,0,1,.479.358l.1-.3a1.312,1.312,0,0,0-.475-.291"
                          fill="#fff"
                        />
                        <path
                          id="패스_55"
                          data-name="패스 55"
                          d="M360.172,348.731a1.6,1.6,0,0,0-.244-.066,1.874,1.874,0,0,0-.249-.03,1.709,1.709,0,0,0-.244,0,1.192,1.192,0,0,0-.235.043.219.219,0,0,0-.145.138l-.11.313a.221.221,0,0,0,.053.23.216.216,0,0,0,.231.049.946.946,0,0,1,.686-.028c.12.043.24.112.192.377l-.524-.106a1.284,1.284,0,0,0-.791.05.906.906,0,0,0-.479.554.96.96,0,0,0-.056.369.841.841,0,0,0,.093.347.9.9,0,0,0,.233.283,1.155,1.155,0,0,0,.342.189,1.057,1.057,0,0,0,.594.042l.025-.006a.22.22,0,0,0,.143.177l.283.1a.217.217,0,0,0,.278-.134l.522-1.488a1.2,1.2,0,0,0,.026-.867.992.992,0,0,0-.624-.541m-.128,2.817-.279-.094.128-.364-.243.117a.826.826,0,0,1-.178.062.838.838,0,0,1-.471-.034.933.933,0,0,1-.277-.151.679.679,0,0,1-.175-.212.618.618,0,0,1-.068-.255.734.734,0,0,1,.043-.282.689.689,0,0,1,.361-.423,1.073,1.073,0,0,1,.655-.034l.73.148.028-.1c.11-.387.006-.64-.308-.753a1.106,1.106,0,0,0-.833.037l.106-.309a.983.983,0,0,1,.192-.035,1.451,1.451,0,0,1,.213,0,1.611,1.611,0,0,1,.22.026,1.388,1.388,0,0,1,.21.057.779.779,0,0,1,.493.416.986.986,0,0,1-.031.7Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_56"
                          data-name="패스 56"
                          d="M369.29,351.6l.247.089a.2.2,0,0,0,.183-.024.951.951,0,0,0,.431.3,1.082,1.082,0,0,0,.489.062,1.053,1.053,0,0,0,.445-.156,1.321,1.321,0,0,0,.357-.338,1.832,1.832,0,0,0,.25-.484,1.682,1.682,0,0,0,.1-.484,1.185,1.185,0,0,0-.061-.444.95.95,0,0,0-.234-.368,1.058,1.058,0,0,0-.388-.237,1.045,1.045,0,0,0-.562-.047l-.014,0,.3-.862a.207.207,0,0,0-.124-.264l-.247-.089a.2.2,0,0,0-.261.126l-1.037,2.956a.207.207,0,0,0,.124.264m1.117-3.126.211.076-.465,1.324.246-.121a.752.752,0,0,1,.19-.065.826.826,0,0,1,.445.038.839.839,0,0,1,.307.186.729.729,0,0,1,.179.281.961.961,0,0,1,.048.359,1.452,1.452,0,0,1-.086.418,1.6,1.6,0,0,1-.218.424,1.1,1.1,0,0,1-.3.281.833.833,0,0,1-.352.124.865.865,0,0,1-.389-.051.687.687,0,0,1-.409-.345l-.117-.237-.106.3-.211-.076Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_57"
                          data-name="패스 57"
                          d="M360.1,348.944a1.406,1.406,0,0,0-.21-.057,1.647,1.647,0,0,0-.22-.026,1.467,1.467,0,0,0-.213,0,.989.989,0,0,0-.192.035l-.106.31a1.106,1.106,0,0,1,.833-.037c.314.113.418.366.308.753l-.028.1-.731-.148a1.074,1.074,0,0,0-.656.034.691.691,0,0,0-.361.424.731.731,0,0,0-.043.282.619.619,0,0,0,.068.255.676.676,0,0,0,.176.212.937.937,0,0,0,.276.151.838.838,0,0,0,.471.034.8.8,0,0,0,.178-.061l.243-.117-.128.364.28.094.515-1.484a.986.986,0,0,0,.031-.7.78.78,0,0,0-.493-.416m.007,1.543a.961.961,0,0,1-.162.294.794.794,0,0,1-.232.2.7.7,0,0,1-.276.083.728.728,0,0,1-.3-.042.632.632,0,0,1-.186-.1.447.447,0,0,1-.119-.143.406.406,0,0,1-.046-.17.481.481,0,0,1,.028-.183.606.606,0,0,1,.107-.2.363.363,0,0,1,.156-.105.568.568,0,0,1,.213-.026,1.831,1.831,0,0,1,.28.037l.619.128Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_58"
                          data-name="패스 58"
                          d="M359.286,350.09a.566.566,0,0,0-.213.026.363.363,0,0,0-.156.105.6.6,0,0,0-.107.2.475.475,0,0,0-.028.183.4.4,0,0,0,.046.17.454.454,0,0,0,.119.143.638.638,0,0,0,.186.1.728.728,0,0,0,.3.042.7.7,0,0,0,.276-.083.792.792,0,0,0,.232-.2.961.961,0,0,0,.162-.294l.081-.231-.619-.128a1.824,1.824,0,0,0-.28-.037m.6.334a.73.73,0,0,1-.119.212.571.571,0,0,1-.166.141.482.482,0,0,1-.189.057h0a.5.5,0,0,1-.328-.095.231.231,0,0,1-.062-.073.18.18,0,0,1-.02-.077.249.249,0,0,1,.015-.1.372.372,0,0,1,.064-.123.137.137,0,0,1,.061-.041.354.354,0,0,1,.13-.014,1.629,1.629,0,0,1,.246.033Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_15"
                    data-name="Vector Smart Object copy 15"
                    transform="matrix(0.707, 0.707, -0.707, 0.707, 209, 339.944)"
                  >
                    <g id="그룹_32" data-name="그룹 32">
                      <g
                        id="그룹_31"
                        data-name="그룹 31"
                        clip-path="url(#clip-path-16)"
                      >
                        <path
                          id="패스_59"
                          data-name="패스 59"
                          d="M21.062,7.138h-6.2V.937A.937.937,0,0,0,13.925,0H8.075a.938.938,0,0,0-.938.937v6.2H.937A.937.937,0,0,0,0,8.075v5.85a.937.937,0,0,0,.937.937h6.2v6.2A.938.938,0,0,0,8.075,22h5.85a.937.937,0,0,0,.937-.937v-6.2h6.2A.937.937,0,0,0,22,13.925V8.075a.937.937,0,0,0-.937-.937m-.937,5.85h-6.2a.937.937,0,0,0-.937.937v6.2H9.013v-6.2a.937.937,0,0,0-.937-.937h-6.2V9.013h6.2a.937.937,0,0,0,.937-.937v-6.2h3.975v6.2a.937.937,0,0,0,.937.937h6.2Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_16"
                    data-name="Vector Smart Object copy 16"
                    transform="matrix(0.707, 0.707, -0.707, 0.707, 46, 329.444)"
                  >
                    <g id="그룹_34" data-name="그룹 34">
                      <g
                        id="그룹_33"
                        data-name="그룹 33"
                        clip-path="url(#clip-path-16)"
                      >
                        <path
                          id="패스_60"
                          data-name="패스 60"
                          d="M21.062,7.138h-6.2V.937A.937.937,0,0,0,13.925,0H8.075a.938.938,0,0,0-.938.937v6.2H.937A.937.937,0,0,0,0,8.075v5.85a.937.937,0,0,0,.937.937h6.2v6.2A.938.938,0,0,0,8.075,22h5.85a.937.937,0,0,0,.937-.937v-6.2h6.2A.937.937,0,0,0,22,13.925V8.075a.937.937,0,0,0-.937-.937m-.937,5.85h-6.2a.937.937,0,0,0-.937.937v6.2H9.013v-6.2a.937.937,0,0,0-.937-.937h-6.2V9.013h6.2a.937.937,0,0,0,.937-.937v-6.2h3.975v6.2a.937.937,0,0,0,.937.937h6.2Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g id="Vector_Smart_Object-3" data-name="Vector Smart Object">
                    <g id="그룹_36" data-name="그룹 36">
                      <g
                        id="그룹_35"
                        data-name="그룹 35"
                        clip-path="url(#clip-path-18)"
                      >
                        <path
                          id="패스_61"
                          data-name="패스 61"
                          d="M673.987,59.367l.146-.464a.942.942,0,0,0-.061-.714.918.918,0,0,0-.543-.458l-20.323-6.568,15.232-15.2a.939.939,0,0,0,.011-1.315l-.333-.343a24.346,24.346,0,0,0-34.741-.273,25.207,25.207,0,0,0-.315,35.244,24.346,24.346,0,0,0,34.741.273,25.054,25.054,0,0,0,6.185-10.187m-39.619,8.611a23.326,23.326,0,0,1,.293-32.614A22.529,22.529,0,0,1,666.5,35.3L650.838,50.919a.939.939,0,0,0-.249.879.925.925,0,0,0,.613.67l20.9,6.761a23.2,23.2,0,0,1-5.586,9,22.53,22.53,0,0,1-32.149-.25"
                          fill="#fff"
                        />
                        <path
                          id="패스_62"
                          data-name="패스 62"
                          d="M662.557,48.152a.938.938,0,0,0-.249.879.925.925,0,0,0,.613.67l15.586,5.042a.906.906,0,0,0,.922-.223.933.933,0,0,0,.23-.38l.1-.308a17.124,17.124,0,0,0-4-17.088l-.223-.23a.907.907,0,0,0-1.3-.011Zm15.623,4.533L664.925,48.4l9.93-9.907a15.246,15.246,0,0,1,3.324,14.2"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object-4"
                    data-name="Vector Smart Object"
                    transform="translate(102 16)"
                  >
                    <g id="그룹_38" data-name="그룹 38">
                      <g
                        id="그룹_37"
                        data-name="그룹 37"
                        clip-path="url(#clip-path-19)"
                      >
                        <path
                          id="패스_63"
                          data-name="패스 63"
                          d="M7.753,20.04a.554.554,0,0,0,.782-.021L15.7,12.466l7.861,2.627a.556.556,0,0,0,.5-.078l7.562-5.509.631.736a.554.554,0,0,0,.913-.106l1.759-3.413a.553.553,0,0,0-.666-.777l-3.651,1.2a.553.553,0,0,0-.359.376.551.551,0,0,0,.112.507l.539.63-7.262,5.291-7.924-2.648a.554.554,0,0,0-.577.144L7.731,19.259a.551.551,0,0,0,.022.781M33.321,7.419,32.558,8.9l-.317-.37a.542.542,0,0,0-.062-.113.554.554,0,0,0-.16-.147l-.281-.328Z"
                          fill="#fff"
                        />
                        <path
                          id="패스_64"
                          data-name="패스 64"
                          d="M40.657,33.609,37.1,32.147a.553.553,0,0,0-.764.509l0,.9H34.252V12.975a.553.553,0,0,0-.552-.552l-3.935-.006a.553.553,0,0,0-.554.552V33.558H26.387l.028-15.978h0a.519.519,0,0,0-.006-.056c0-.018,0-.037-.006-.055a.473.473,0,0,0-.017-.056c-.005-.016-.008-.033-.015-.048a.564.564,0,0,0-.03-.056c-.007-.013-.013-.026-.021-.038a.515.515,0,0,0-.046-.056c-.007-.008-.013-.018-.021-.026a.541.541,0,0,0-.055-.046c-.009-.007-.017-.015-.027-.022a.587.587,0,0,0-.058-.032c-.012-.006-.023-.014-.036-.019a.549.549,0,0,0-.064-.02c-.013,0-.026-.009-.04-.012a.481.481,0,0,0-.06-.006c-.017,0-.034-.005-.051-.005H21.9a.553.553,0,0,0-.553.552v15.98H18.519V15.908a.553.553,0,0,0-.553-.552l-3.935.008a.553.553,0,0,0-.551.552V33.558H10.653V21.949A.553.553,0,0,0,10.1,21.4L6.17,21.376a.511.511,0,0,0-.393.16.553.553,0,0,0-.163.392v11.63H3.254V4.659l.9,0h0a.552.552,0,0,0,.553-.553A.548.548,0,0,0,4.669,3.9L3.223.345A.553.553,0,0,0,2.712,0h0A.554.554,0,0,0,2.2.342L.734,3.89a.552.552,0,0,0,.51.763l.9,0v28.9H.553a.552.552,0,1,0,0,1.1H2.148v1.784a.553.553,0,0,0,1.107,0V34.663H36.333l0,.9h0a.554.554,0,0,0,.761.512l3.563-1.443a.553.553,0,0,0,.345-.51h0a.553.553,0,0,0-.343-.511M3.249,3.554a.55.55,0,0,0-1.1,0H2.071l.635-1.539.627,1.543Zm6.3,30H6.72V22.484l2.826.015Zm7.866-11.88v11.88H14.586V16.467l2.826-.006Zm7.867,11.88H22.032l.421-1.757V18.131h2.854Zm7.865,0H30.319V13.522l2.826,0Zm4.294,1.184v-.1a.549.549,0,0,0,0-1.059v-.1l1.542.634Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_2"
                    data-name="Vector Smart Object copy 2"
                    transform="matrix(0, 1, -1, 0, 98, 269)"
                  >
                    <g id="그룹_40" data-name="그룹 40">
                      <g
                        id="그룹_39"
                        data-name="그룹 39"
                        clip-path="url(#clip-path-4)"
                      >
                        <path
                          id="패스_65"
                          data-name="패스 65"
                          d="M32.585,38.913V2.609A2.6,2.6,0,0,0,30.008,0H2.576A2.6,2.6,0,0,0,0,2.609v36.3a2.6,2.6,0,0,0,2.576,2.609H30.008a2.6,2.6,0,0,0,2.576-2.609m-31.6,0V2.609A1.6,1.6,0,0,1,2.576,1H30.008a1.6,1.6,0,0,1,1.59,1.61v36.3a1.6,1.6,0,0,1-1.59,1.61H2.576a1.6,1.6,0,0,1-1.59-1.61"
                          fill="#fff"
                        />
                        <path
                          id="패스_66"
                          data-name="패스 66"
                          d="M30.357,3.507a1.245,1.245,0,0,0-1.235-1.251H3.463A1.245,1.245,0,0,0,2.228,3.507V38.015a1.245,1.245,0,0,0,1.235,1.251H29.122a1.245,1.245,0,0,0,1.235-1.251Zm-.986,34.508a.251.251,0,0,1-.249.253H3.463a.251.251,0,0,1-.249-.253v-3.1H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.052,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,34.763v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m2.96-.851h-.884c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V29.387H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,29.239v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.218.547-1.218s.547.462.547,1.218v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.851h-.884c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214v-4.35H22.272c.051,1.17.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.052,1.17.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884Zm-6.118-4.5v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.218-.547,1.218s-.547-.462-.547-1.218m2.96-.851h-.884c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V18.6H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,18.457v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.851h-.884c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.17-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V13.212H12.8c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.1c.051,1.171.7,2.068,1.528,2.068s1.477-.9,1.528-2.068h.884ZM13.777,13.064v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0v-.7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.851h-.884c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.052-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068h-.1c-.051-1.171-.7-2.068-1.528-2.068s-1.477.9-1.528,2.068H3.214V8.1h9.6c.127,1.046.743,1.817,1.508,1.817s1.381-.772,1.508-1.817h.143c.127,1.046.743,1.817,1.508,1.817s1.381-.772,1.508-1.817h.142c.127,1.046.743,1.817,1.508,1.817S22.023,9.146,22.15,8.1h.142c.127,1.046.743,1.817,1.508,1.817s1.381-.772,1.508-1.817h.142c.127,1.046.743,1.817,1.508,1.817S28.34,9.146,28.467,8.1h.9ZM13.777,7.7V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.355,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m3.159,0V7c0-.755.354-1.217.547-1.217s.547.462.547,1.217v.7c0,.755-.354,1.217-.547,1.217s-.547-.462-.547-1.217m2.96-.6h-.879V7c0-1.243-.673-2.216-1.533-2.216S25.425,5.757,25.425,7v.1h-.092V7c0-1.243-.673-2.216-1.533-2.216S22.267,5.757,22.267,7v.1h-.092V7c0-1.243-.674-2.216-1.533-2.216S19.108,5.757,19.108,7v.1h-.092V7c0-1.243-.674-2.216-1.533-2.216S15.95,5.757,15.95,7v.1h-.092V7c0-1.243-.673-2.216-1.533-2.216S12.791,5.757,12.791,7v.1H3.214V3.507a.251.251,0,0,1,.249-.253H29.122a.251.251,0,0,1,.249.253Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Vector_Smart_Object_copy_2-2"
                    data-name="Vector Smart Object copy 2"
                  >
                    <g id="그룹_42" data-name="그룹 42">
                      <g
                        id="그룹_41"
                        data-name="그룹 41"
                        clip-path="url(#clip-path-21)"
                      >
                        <path
                          id="패스_67"
                          data-name="패스 67"
                          d="M637.987,364.367l.146-.464a.942.942,0,0,0-.061-.714.918.918,0,0,0-.543-.458l-20.323-6.568,15.232-15.2a.939.939,0,0,0,.011-1.315l-.333-.343a24.347,24.347,0,0,0-34.741-.273,25.207,25.207,0,0,0-.315,35.244,24.346,24.346,0,0,0,34.741.273,25.054,25.054,0,0,0,6.185-10.187m-39.619,8.611a23.326,23.326,0,0,1,.293-32.614A22.529,22.529,0,0,1,630.5,340.3l-15.659,15.621a.939.939,0,0,0-.249.879.925.925,0,0,0,.613.67l20.9,6.761a23.2,23.2,0,0,1-5.586,9,22.53,22.53,0,0,1-32.149-.25"
                          fill="#fff"
                        />
                        <path
                          id="패스_68"
                          data-name="패스 68"
                          d="M626.557,353.152a.938.938,0,0,0-.249.879.925.925,0,0,0,.613.67l15.586,5.042a.906.906,0,0,0,.922-.223.933.933,0,0,0,.23-.38l.1-.307a17.124,17.124,0,0,0-4-17.088l-.223-.23a.907.907,0,0,0-1.3-.011Zm15.623,4.533L628.925,353.4l9.93-9.907a15.246,15.246,0,0,1,3.324,14.2"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                </g>
                <text
                  id="MATHEMATICS"
                  transform="translate(166.982 249.738)"
                  fill="#fff"
                  font-size="48.408"
                  font-family="TTOmniGothicH, '\32 10 OmniGothic \30 50'"
                  opacity="0.245"
                >
                  <tspan x="0" y="0">
                    MATHEMATICS
                  </tspan>
                </text>
                <rect
                  id="Rectangle_13"
                  data-name="Rectangle 13"
                  width="439.98"
                  height="46"
                  transform="translate(129.01 342.5)"
                  fill="#222"
                />
                <text
                  id="수학은_개념폴리아"
                  data-name="수학은 개념폴리아"
                  transform="translate(212.352 377.32)"
                  fill="#fff"
                  font-size="36.3"
                  font-family="SpoqaHanSansNeo-Medium, Spoqa Han Sans Neo"
                  font-weight="500"
                >
                  <tspan x="0" y="0">
                    수학은 개념폴리아
                  </tspan>
                </text>
                <a href={qrData[branchId].links[0].href} target="_blank">
                  <g
                    id="구성_요소_1_1"
                    data-name="구성 요소 1 – 1"
                    transform="translate(113 481)"
                  >
                    <g
                      transform="matrix(1, 0, 0, 1, -113, -481)"
                      filter="url(#사각형_22)"
                    >
                      <g
                        id="사각형_22-2"
                        data-name="사각형 22"
                        transform="translate(113 481)"
                        fill="#fff"
                        stroke="#fcad64"
                        stroke-width="1"
                      >
                        <rect width="474" height="62" rx="20" stroke="none" />
                        <rect
                          x="0.5"
                          y="0.5"
                          width="473"
                          height="61"
                          rx="19.5"
                          fill="none"
                        />
                      </g>
                    </g>
                  </g>
                </a>
                <a href={qrData[branchId].links[1].href} target="_blank">
                  <g
                    transform="matrix(1, 0, 0, 1, 0, 0)"
                    filter="url(#사각형_23)"
                  >
                    <g
                      id="사각형_23-2"
                      data-name="사각형 23"
                      transform="translate(113 619)"
                      fill="#fff"
                      stroke="#fcad64"
                      stroke-width="1"
                    >
                      <rect width="474" height="62" rx="20" stroke="none" />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="473"
                        height="61"
                        rx="19.5"
                        fill="none"
                      />
                    </g>
                  </g>
                </a>
                <a href={qrData[branchId].links[2].href} target="_blank">
                  <g
                    transform="matrix(1, 0, 0, 1, 0, 0)"
                    filter="url(#사각형_28)"
                  >
                    <g
                      id="사각형_28-2"
                      data-name="사각형 28"
                      transform="translate(113 757)"
                      fill="#fff"
                      stroke="#fcad64"
                      stroke-width="1"
                    >
                      <rect width="474" height="62" rx="20" stroke="none" />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="473"
                        height="61"
                        rx="19.5"
                        fill="none"
                      />
                    </g>
                  </g>
                </a>
                <a href={qrData[branchId].links[3].href} target="_blank">
                  <g
                    transform="matrix(1, 0, 0, 1, 0, 0)"
                    filter="url(#사각형_29)"
                  >
                    <g
                      id="사각형_29-2"
                      data-name="사각형 29"
                      transform="translate(113 895)"
                      fill="#fff"
                      stroke="#fcad64"
                      stroke-width="1"
                    >
                      <rect width="474" height="62" rx="20" stroke="none" />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="473"
                        height="61"
                        rx="19.5"
                        fill="none"
                      />
                    </g>
                  </g>
                </a>
                <a href={qrData[branchId].links[0].href} target="_blank">
                  <text
                    id="삼성청담관_BLOG_방문하기"
                    data-name="삼성청담관 BLOG 방문하기"
                    transform="translate(219 519)"
                    fill="#707070"
                    font-size="23"
                    font-family="SpoqaHanSansNeo-Medium, Spoqa Han Sans Neo"
                    font-weight="500"
                  >
                    <tspan x="0" y="0">
                      삼성청담관 BLOG 방문하기
                    </tspan>
                  </text>
                </a>
                <path
                  id="패스_75"
                  data-name="패스 75"
                  d="M63.566-20.35V-31.228h6.512v-13.32H63.566V-54.982H48.544V-20.35ZM48.4-32.116C37.74-35.446,32.412-40.552,32.412-48.47v-6.142H16.872v6.142c0,7.844-7.178,13.838-17.76,18.13L7.7-19.684A34.323,34.323,0,0,0,24.568-30.932,28.092,28.092,0,0,0,40.774-20.646ZM63.566,9.842V-18.426H8.436V9.842ZM48.544-1.776H23.458V-6.808H48.544Zm87.172-17.316v-35.89H120.694v6.142H111.37v12.654h9.324v17.094ZM119.51-31.376c-10.73-3.33-16.058-8.436-16.058-16.354v-6.882H87.912v6.882c0,7.844-7.03,13.69-17.686,18.056l8.584,10.73A34.994,34.994,0,0,0,95.682-30.192,27.227,27.227,0,0,0,111.814-19.98ZM135.124,1.85a10.726,10.726,0,0,0,1.7-5.772c0-8.362-8.584-14.726-29.008-14.726S78.81-12.284,78.81-4c0,8.362,8.584,14.726,29.008,14.726C123.136,10.73,131.868,7.178,135.124,1.85ZM121.36-3.922c0,.666-.518,1.48-2.516,2.072s-5.4,1.036-11.026,1.036C96.5-.814,94.2-2.59,94.2-4S96.5-7.178,107.818-7.178,121.36-5.4,121.36-3.922Zm84.656-13.1V-54.982H190.994V-43.29h-4.662v-7.1h-13.1v-6.068H157.472v6.068h-13.32v11.322H157.1c-2.146,6.512-8.584,10.508-15.54,13.32l8.066,9.4a35.323,35.323,0,0,0,15.836-11.47c3.774,4.81,9.028,7.992,15.54,9.99l6.956-9.472c-6.882-2.368-12.654-5.7-14.43-11.766h11.1v8.14h6.364V-17.02ZM205.5,2.738a10.059,10.059,0,0,0,1.7-5.624c0-8.362-8.584-13.69-29.082-13.69-20.424,0-29.008,5.328-29.008,13.616s8.584,13.616,29.008,13.616C193.436,10.656,202.316,7.7,205.5,2.738ZM191.216-1.85c-1.11.962-4.736,1.7-13.1,1.7C166.8-.148,164.5-1.554,164.5-2.96c0-1.332,2.294-2.812,13.616-2.812s13.616,1.48,13.616,2.886A1.4,1.4,0,0,1,191.216-1.85Zm82.954-18.5V-31.228h6.808v-13.32H274.17V-54.982H259.148V-20.35ZM254.93-35.372A201.026,201.026,0,0,1,229.844-33.6v-8.658h23.088V-53.946h-38.11V-21.9c14.43,0,32.042-.518,41.292-2.294ZM274.17,9.842V-18.426H219.336V9.842ZM259.148-1.776H234.432V-6.808h24.716ZM345.58,9.546V-1.7H304.51V-11.988H289.488V9.546Zm-.37-17.76V-25.456h6.364V-38.85H345.21V-54.982H330.558V-8.214ZM328.56-27.528c-6.586.37-14.282.74-22.2,1.036V-37.444H291.93v11.47l-8.288.222v11.544c13.394-.37,32.116-1.184,44.918-2.146Zm-3.848-1.85a191.847,191.847,0,0,0,.962-24.2H285.936v11.4h25.012a109.334,109.334,0,0,1-.814,12.062Z"
                  transform="translate(175 297)"
                  fill="#fff"
                />
                <a href={qrData[branchId].links[1].href} target="_blank">
                  <text
                    id="삼성청담관_입학테스트_예약"
                    data-name="삼성청담관 입학테스트 예약"
                    transform="translate(218 657)"
                    fill="#707070"
                    font-size="23"
                    font-family="SpoqaHanSansNeo-Medium, Spoqa Han Sans Neo"
                    font-weight="500"
                  >
                    <tspan x="0" y="0">
                      삼성청담관 입학테스트 예약
                    </tspan>
                  </text>
                </a>
                <a href={qrData[branchId].links[2].href} target="_blank">
                  <text
                    id="설명회_참석_예약"
                    data-name="설명회 참석 예약"
                    transform="translate(271 795)"
                    fill="#707070"
                    font-size="23"
                    font-family="SpoqaHanSansNeo-Medium, Spoqa Han Sans Neo"
                    font-weight="500"
                  >
                    <tspan x="0" y="0">
                      설명회 참석 예약
                    </tspan>
                  </text>
                </a>
                <a href={qrData[branchId].links[3].href} target="_blank">
                  <text
                    id="삼성청담관_위치안내"
                    data-name="삼성청담관 위치안내"
                    transform="translate(252 933)"
                    fill="#707070"
                    font-size="23"
                    font-family="SpoqaHanSansNeo-Medium, Spoqa Han Sans Neo"
                    font-weight="500"
                  >
                    <tspan x="0" y="0">
                      삼성청담관 위치안내
                    </tspan>
                  </text>
                </a>
                <a href={qrData[branchId].links[4].href} target="_blank">
                  <g
                    id="그룹_44"
                    data-name="그룹 44"
                    transform="matrix(0.899, 0.438, -0.438, 0.899, 246.732, 1056.574)"
                  >
                    <g
                      id="그룹_43"
                      data-name="그룹 43"
                      transform="translate(0 0)"
                      clip-path="url(#clip-path-22)"
                    >
                      <path
                        id="패스_69"
                        data-name="패스 69"
                        d="M28.31,19.555c-.742-.363-4.343-2.13-5.015-2.368s-1.163-.363-1.654.364-1.905,2.368-2.325,2.844-.854.547-1.6.183a19.829,19.829,0,0,1-5.9-3.615,21.777,21.777,0,0,1-4.077-5.027c-.419-.73-.042-1.121.323-1.486.336-.336.729-.855,1.107-1.275.1-.126.182-.238.265-.35a7.883,7.883,0,0,0,.463-.87,1.313,1.313,0,0,0-.055-1.275c-.183-.364-1.654-3.95-2.27-5.406S6.36.069,5.925.069,5.014,0,4.524,0A2.711,2.711,0,0,0,2.563.91,8.154,8.154,0,0,0,0,6.989,9.283,9.283,0,0,0,.378,9.47,16.556,16.556,0,0,0,3,14.513c.364.476,5.072,8.067,12.523,11,7.466,2.9,7.466,1.933,8.812,1.807s4.343-1.751,4.944-3.459A6.014,6.014,0,0,0,29.71,20.4c-.182-.294-.672-.476-1.4-.84"
                        transform="translate(0 0)"
                        fill="#fff"
                        fill-rule="evenodd"
                      />
                    </g>
                  </g>
                </a>
                <a href={qrData[branchId].links[4].href} target="_blank">
                  <text
                    id="상_담_문_의"
                    data-name="상 담 문 의"
                    transform="translate(296 1084)"
                    fill="#222"
                    font-size="25"
                    font-family="SpoqaHanSansNeo-Bold, Spoqa Han Sans Neo"
                    font-weight="700"
                  >
                    <tspan x="0" y="0">
                      상 담 문 의
                    </tspan>
                  </text>
                </a>
                <path
                  id="패스_70"
                  data-name="패스 70"
                  d="M658.255,516.993l9.09,9.866-9.09,9.98"
                  transform="translate(-109.818 -14.916)"
                  fill="none"
                  stroke="#707070"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="패스_71"
                  data-name="패스 71"
                  d="M658.255,516.993l9.09,9.866-9.09,9.98"
                  transform="translate(-109.818 123.084)"
                  fill="none"
                  stroke="#707070"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="패스_72"
                  data-name="패스 72"
                  d="M658.255,516.993l9.09,9.866-9.09,9.98"
                  transform="translate(-109.818 261.084)"
                  fill="none"
                  stroke="#707070"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="패스_73"
                  data-name="패스 73"
                  d="M658.255,516.993l9.09,9.866-9.09,9.98"
                  transform="translate(-109.818 399.084)"
                  fill="none"
                  stroke="#707070"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="패스_74"
                  data-name="패스 74"
                  d="M79.9,11.7V-65.384H63.36v26.4H58.52V-65.208H42.856V10.824H58.52v-33.88h4.84V11.7ZM12.056,3.96c15.752-12.5,27.1-31.68,27.1-61.336v-5.456H3.08v14.7H21.736C20.68-30.536,12.584-15.576-.088-5.984ZM160.6-23.76V-65.384H142.648v3.168H123.992v11.264h18.656v2.112H123.992v9.68c-5.192.44-10.3.7-16.544.7V-64.24H89.5V-24.9c15.488,0,31.064-.88,43.824-2.2l-.968-10.472h10.3V-23.76Zm0,35.464V-21.472H94.952V11.7ZM142.648-2.112H112.816V-7.656h29.832ZM243.672,11.7V1.936h-50.6v-2.2h49.72V-20.24H175.208v9.68H224.84v1.936H175.208V11.7ZM247.9-22.264V-33.616H218.152V-36.08h26.136V-46.112h-11c.264-2.552.616-5.016.88-6.864l-17.336-.968-.528,7.832h-14.7l-.44-7.832-17.336.968c.264,1.848.528,4.312.792,6.864H173.712V-36.08H199.76v2.464H170.1v11.352Zm-4.664-32.472v-9.856H174.768v9.856Zm85.8,66.44V-65.384H311.168V11.7ZM304.656-15.048c-8.536,1.848-21.208,2.64-30.888,2.64V-23.32h27.9V-63.272h-45.32v15.136h27.808V-38.1H256.344V3.168c16.456.7,38.72-.968,49.808-3.608ZM410.432,11.7V-22.44h7.744V-38.28h-7.744v-27.1H392.568V11.7ZM379.368-4.664c4.136-5.544,6.424-13.9,6.424-25.52,0-23.232-9.064-33.528-24.112-33.528s-24.2,10.3-24.2,33.44c0,23.232,9.152,33.528,24.2,33.528C369.16,3.256,375.232.7,379.368-4.664Zm-15.312-8.448a4.258,4.258,0,0,1-2.376.792c-3.256,0-6.688-3.608-6.688-17.952,0-14.08,3.432-17.864,6.688-17.864s6.688,3.784,6.688,17.952C368.368-19.712,366.52-14.7,364.056-13.112Z"
                  transform="translate(141 210)"
                  fill="#543c26"
                />
                <text
                  id="최상급_초중등_수학전문학원"
                  data-name="최상급 초중등 수학전문학원"
                  transform="translate(239 118)"
                  fill="#fff"
                  font-size="21"
                  font-family="SpoqaHanSansNeo-Regular, Spoqa Han Sans Neo"
                >
                  <tspan x="0" y="0">
                    최상급 초중등 수학전문학원
                  </tspan>
                </text>
              </g>
            </svg>
          </Box>
        </Flex>
      </>
    )
  }

  if (branchId === "PlSj") {
    return (
      <>
        <Flex justifyContent={"center"} width="100%" bgColor="#181615">
          <Box width="100%" maxWidth="800px">
            <Image src={"/assets/images/qr_plsj_1.png"} width="100%" />
          </Box>
        </Flex>
        <Flex justifyContent={"center"} width="100%" bgColor="#de152e">
          <Box width="100%" maxWidth="800px">
            <Image src={"/assets/images/qr_plsj_2.png"} width="100%" />
          </Box>
        </Flex>
        <Flex justifyContent={"center"} width="100%" bgColor="#de152e">
          <Box width="100%" maxWidth="800px">
            <a href="https://forms.gle/UUZwBs2og3UL6xR36" target="_blank">
              <Image src={"/assets/images/qr_plsj_btn1.png"} width="100%" />
            </a>
          </Box>
        </Flex>
        <Box height="30px" bgColor="#de152e" />
        <Flex justifyContent={"center"} width="100%" bgColor="#181615">
          <Box width="100%" maxWidth="800px">
            <Image src={"/assets/images/qr_plsj_3.png"} width="100%" />
          </Box>
        </Flex>
        <Flex justifyContent={"center"} width="100%" bgColor="#de152e">
          <Box width="100%" maxWidth="800px">
            <Image src={"/assets/images/qr_plsj_4.png"} width="100%" />
          </Box>
        </Flex>
        <Flex justifyContent={"center"} width="100%">
          <Box width="100%" maxWidth="800px">
            <Image src={"/assets/images/qr_plsj_5.png"} width="100%" />
          </Box>
        </Flex>
        <Flex justifyContent={"center"} width="100%">
          <Box width="100%" maxWidth="800px">
            <a href="https://forms.gle/UUZwBs2og3UL6xR36" target="_blank">
              <Image src={"/assets/images/qr_plsj_btn2.png"} width="100%" />
            </a>
          </Box>
        </Flex>
        <Flex justifyContent={"center"} width="100%">
          <Box width="100%" maxWidth="800px">
            <Image src={"/assets/images/qr_plsj_btn3.png"} width="100%" />
          </Box>
        </Flex>
        <Box height="15px" />
        <Flex justifyContent={"center"} width="100%">
          <a href="https://blog.naver.com/gnpolyasuji" target="_blank">
            <Image src={"/assets/images/qr_plsj_icon_blog.png"} width="30px" />
          </a>
          <Box width="30px" />
          <a href="https://www.instagram.com/gnpolyasuji/" target="_blank">
            <Image src={"/assets/images/qr_plsj_icon_insta.png"} width="30px" />
          </a>
        </Flex>
        <Box height="50px" />
      </>
    )
  }
}
