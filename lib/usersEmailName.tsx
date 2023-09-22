export default async function usersEmailName() {
  const res = await fetch("/api/user")
  const resData = await res.json()
  const emailName: any = {}

  if (resData.success) {
    for (const one of resData.data) {
      // console.log(one, one.teamId)
      emailName[one.email] = one.name
      // idTitle[one.teamId] = one.title
    }
  }
  return emailName
}
