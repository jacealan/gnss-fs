export default async function getTeam(teamId: string | string[]) {
  const res = await fetch(`/api/team/${teamId}`)
  const resData = await res.json()
  return resData.data
}
