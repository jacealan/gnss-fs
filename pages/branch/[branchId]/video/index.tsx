import { GetServerSidePropsContext } from "next"

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { branchId } = context.query

  if (!branchId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  // https://gnss.co.kr/branch/PlCd/student
  // https://gnss.co.kr/branch/PlSc/student -> SPSc
  // https://gnss.co.kr/branch/PlBb/student
  // https://gnss.co.kr/branch/PlJs/student -> SPJs
  // https://gnss.co.kr/branch/PlSd/student
  // https://gnss.co.kr/branch/PlSj/student
  // https://gnss.co.kr/branch/PlDt/student
  // https://gnss.co.kr/branch/PlDs/student
  let videoTeamId

  if (branchId === "PlSc") videoTeamId = "SPSc"
  if (branchId === "PlJs") videoTeamId = "SPJs"
  if (["PlCd", "PlBb", "PlSd", "PlSj", "PlDt", "PlDs"].includes(branchId)) {
    videoTeamId = branchId
  }


  return {
    redirect: {
      destination: `https://class.gnbiz.mywire.org/${videoTeamId || ""}/v`,
      permanent: false,
    },
  }
}

export default function TestPage() {
  return null
}
