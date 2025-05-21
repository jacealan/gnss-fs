import { useEffect } from "react"
import { useRouter } from "next/router"

export default function Page0() {
  const router = useRouter()
  const {
    query: { teamId },
  } = router
  // console.log(router.pathname)

  useEffect(() => {
    // console.log(router.asPath)
    if (teamId !== "teamId") router.push(`${router.asPath}/0`)
  }, [teamId, router])
}
