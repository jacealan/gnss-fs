export default async function getBranch(branchId: string | string[]) {
  const res = await fetch(`/api/branch/${branchId}`)
  const resData = await res.json()
  return resData.data
}
