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
      spreadsheetId = "1hA1oYxBYIV7W64OEhEyi-B5z048oK_eprRI47VdHVJo"
      break
    case "PlDt":
      spreadsheetId = "1ug8j5nCM6mhEcSGdnPJSeMAtK3VqqdP_sCB15-9MOx0"
      break
    case "PlBb":
      spreadsheetId = "1fYvBo-Dmv-xnUsPgnwmWkD8hwyP2ZU__sHQvcWIViOA"
      break
    case "PlCd":
      spreadsheetId = "1nJ4r9jvmXm7112kyaEiwl-A-ANfHHnVTV6kAhAX8lOk"
      break
    // case "PlSj":
    //   spreadsheetId = "1V7R78rk1cS4nAnaFXNbr8sn1PR-TrTJELh4_wwPlEhc"
    //   break
    case "PlSc":
      spreadsheetId = "11pWutAZn0gSkyCPKJHXvTHa08xxtmalyN3VOqx15gU8"
      break
    case "SsSc":
      spreadsheetId = "11pWutAZn0gSkyCPKJHXvTHa08xxtmalyN3VOqx15gU8"
      break
    case "PlJs":
      spreadsheetId = "12q5I0SSi6lvM4Tux3rUS9OabXt_Mv7Lk5pj8ekLQS3s"
      break
    case "SsJs":
      spreadsheetId = "12q5I0SSi6lvM4Tux3rUS9OabXt_Mv7Lk5pj8ekLQS3s"
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
      range: "log!A2:AE",
    })
    const logs = await response.data.values
    let result: any = []
    // let columnTitle = [
    //   "관ID teamId",
    //   "수업일 date",
    //   "반ID classId",
    //   "학생ID studentId",
    //   "학년 schoolYear",
    //   "출생년 birthYear",
    //   "수업종류 kindBy",
    //   "개강/입반 startDate",
    //   "종강일 endDate",
    //   "과정1강사 sbj1Teacher",
    //   "과정1 sbj1Contents",
    //   "과정1출결 sbj1Attendance",
    //   "과정1보충일 sbj1Supplement",
    //   "과정1보충메모 sbj1SplMemo",
    //   "과정1숙제 sbj1HW",
    //   "과정1시험 sbj1TestNo",
    //   "과정1단원 sbj1TestTitle",
    //   "과정1점수 sbj1TestScore",
    //   "과정1평균 sbj1Average",
    //   "과정1코멘트 sbj1Comment",
    //   "과정2강사 sbj2Teacher",
    //   "과정2 sbj2Contents",
    //   "과정2출결 sbj2Attendance",
    //   "과정2보충일 sbj2Supplement",
    //   "과정2보충메모 sbj2SplMemo",
    //   "과정2숙제 sjb2HW",
    //   "과정2시험 sbj2TestNo",
    //   "과정2단원 test2Title",
    //   "과정2점수 sbj2TestScore",
    //   "과정2평균 sbj2Average",
    //   "과정2코멘트 sbj2Comment",
    // ]

    if (logs) {
      for (let log of logs) {
        if (
          (log[9] && log[9].includes(body.name)) ||
          (log[20] && log[20].includes(body.name))
        ) {
          const logLength = log.length
          if (logLength < 31) {
            for (let i = 0; i < 31 - logLength; i++) {
              log.push("")
            }
          }
          result.push(log)
        }
      }
      // console.log(result)

      if (result) {
        return res.status(200).json(result)
      } else {
        return res.status(500).send({
          message: "ERROR 500",
        })
      }
    }

    return res.status(500).send({
      message: "Something went wrong",
    })
  } catch (e: any) {
    console.log(e.message)
    return res.status(500).send({
      message: "Something went wrong",
    })
  }
}
