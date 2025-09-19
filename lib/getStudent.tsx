export default async function getStudent(
  teamId: string | string[],
  schoolYear: string | string[]
) {
  let res
  console.log(teamId, schoolYear)

  if (schoolYear == "") {
    res = await fetch(`/api/team/${teamId}/student`)
  } else {
    res = await fetch(`/api/team/${teamId}/student/${schoolYear}`)
  }
  const resData = await res.json()
  return resData.data
}
