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
  console.log(body)

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
      spreadsheetId: "1_d6eRWxwWG1FEtunSWPtm2KhJsURDKsfgJwOsBon_k0",
      range: "student!A4:AA",
      // valueInputOption: "USER_ENTERED",
      // requestBody: {
      //   values: [
      //     body.name,
      //     body.email,
      //     body.isComing,
      //     body.foodOption,
      //     body.favSong,
      //     body.note,
      //   ],
    })
    const students = await response.data.values
    let result = null

    if (students) {
      for (let student of students) {
        if (student[1] === body.name && student[2] === body.password) {
          result = {
            branchId: body.branchId,
            name: body.name,
            title1: student[17],
            link1: student[18],
            title2: student[19],
            link2: student[20],
            title3: student[21],
            link3: student[22],
            title4: student[23],
            link4: student[24],
          }
          console.log(result)
        }
      }

      if (result) {
        return res.status(200).json({
          data: result,
        })
      } else {
        return res.status(500).send({
          message: "우리 학원 학생이 아닙니다",
        })
      }
    }

    return res.status(500).send({
      message: "우리 학원 학생이 아닙니다",
    })
  } catch (e: any) {
    console.log(e.message)
    return res.status(500).send({
      message: "Something went wrong",
    })
  }
}
