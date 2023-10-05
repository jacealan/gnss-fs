import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import getBranch from "@/lib/getBranch"

export default function Branch() {
  const router = useRouter()
  const { branchId: branchId, yearId: targetId } = router.query
  // const branch = branches[branchId as keyof typeof branches]
  const [branch, setBranch] = useState<any>(null)

  useEffect(() => {
    // if (teamId !== "" && teamId !== undefined) getTeam(teamId)
    if (branchId) {
      const _ = async () => {
        setBranch(await getBranch(branchId))
      }
      _()
    }

    if (branchId === "PlSj") router.push("/branch/PlSj/qr")
  }, [branchId])

  console.log(branch)

  return <>{branchId}</>
}
