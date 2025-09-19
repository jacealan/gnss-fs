import moment from "moment-timezone"

import dbConnect from "@/lib/mongooseConnect"
import Team from "@/models/team"
import Student from "@/models/student"

export default async function handler(req: any, res: any) {
  const {
    query: { teamId, schoolYear },
    // body: { teamId },
    // method,
  } = req
  // console.log(req.query)
  await dbConnect()
  // console.log(daysAgo, typeof daysAgo)
  const today = new Date()
  const thisYear = today.getFullYear()
  const birthYear = thisYear - parseInt(schoolYear) - 6
  // console.log(teamId, birthYear)

  try {
    const students = await Student.find({
      teamId: teamId,
      birthYear: birthYear,
      out: false,
    }).sort({ name: -1 })
    // console.log(students)
    if (students) {
      res.status(200).json({ success: true, data: students })
    } else {
      return res.status(400).json({ success: false })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false })
  }
}
