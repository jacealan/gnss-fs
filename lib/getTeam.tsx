export default async function getTeam(teamId: string | string[]) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/team/${teamId}`)
  const resData = await res.json()
  return resData.data
}
