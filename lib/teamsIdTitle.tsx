export default async function teamsIdTitle() {
  const res = await fetch("/api/team")
  const resData = await res.json()
  const idTitle: any = { All: "전관" }

  if (resData.success) {
    for (const one of resData.data) {
      // console.log(one, one.teamId)
      idTitle[one.teamId] = one.title
    }
  }
  return idTitle
}
