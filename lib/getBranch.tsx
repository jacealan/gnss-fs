export default async function getBranch(branchId: string | string[]) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/branch/${branchId}`
  )
  const resData = await res.json()
  return resData.data
}
