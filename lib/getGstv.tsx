export default async function getGstv() {
  const res = await fetch(`/api/gstv`)
  const resData = await res.json()
  return resData.data
}
