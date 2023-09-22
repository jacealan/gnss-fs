export default async function branchesIdTitle() {
  const res = await fetch("/api/branch")
  const resData = await res.json()
  const idTitle: any = { All: "전관" }

  if (resData.success) {
    for (const one of resData.data) {
      // console.log(one, one.teamId)
      idTitle[one.branchId] = one.branchTitle
    }
  }
  return idTitle
}
