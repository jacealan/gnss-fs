// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { google } from "googleapis"
import dbConnect from "@/lib/mongooseConnect"

type Data = {
  [key: string]: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).send({
      message: "Only POST requests are allowed",
    })
  }

  const body = req.body

  let spreadsheetId = ""
  switch (body.branchId) {
    case "PlDs":
      spreadsheetId = "1doHkPEAVsECnKATopNWHG4DR5IHDPNRiP0uc8fj62oU"
      break
    case "PlDt":
      spreadsheetId = "1X83Ge2hxQe35IEzKU1NoN1drLUePgjvAt-LHAbIMcWk"
      break
    case "PlBb":
      spreadsheetId = "1jRd4v5wvCIUB_JYTcEmaOowBOV4vNvVo4ir4o2wlbvM"
      break
    case "PlCd":
      spreadsheetId = "1KXHBo-Mp4YAJ5G7SuFDLLBQ5I58bT2XAkHnXN-m8uNo"
      break
    case "PlSj":
      spreadsheetId = "1V7R78rk1cS4nAnaFXNbr8sn1PR-TrTJELh4_wwPlEhc"
      break
    case "PlSc":
      spreadsheetId = "1UPvs84EyiT-CGhkmU0Kgd_ujikkWwmgKtNXORbXB1FI"
      break
    case "SsSc":
      spreadsheetId = "1UPvs84EyiT-CGhkmU0Kgd_ujikkWwmgKtNXORbXB1FI"
      break
    case "PlJs":
      spreadsheetId = "13xCKr92K4n2dhUPx_vQW4ZjRi-kMrwYfr3bSZhPJma4"
      break
    case "SsJs":
      spreadsheetId = "13xCKr92K4n2dhUPx_vQW4ZjRi-kMrwYfr3bSZhPJma4"
      break
    default:
      spreadsheetId = ""
  }

  // console.log(body)

  try {
    // prepare auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({
      auth,
      version: "v4",
    })

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: "teacher!A4:I",
    })
    const teachers = await response.data.values
    let result = null

    if (teachers) {
      for (let teacher of teachers) {
        if (
          teacher[1] === body.name &&
          teacher[8] === body.password &&
          body.password.length >= 8
        ) {
          result = {
            branchId: body.branchId,
            teamId: teacher[0],
            name: body.name,
          }
          // console.log(result)
        }
      }

      if (result) {
        return res.status(200).json(result)
      } else {
        return res.status(500).send({
          message: "이름, 비밀번호를 확인하세요",
        })
      }
    }

    return res.status(500).send({
      message: "이름, 비밀번호를 확인하세요",
    })
  } catch (e: any) {
    // console.log(e.message)
    return res.status(500).send({
      message: "Something went wrong",
    })
  }
}
