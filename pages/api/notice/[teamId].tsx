import moment from "moment-timezone"

import dbConnect from "@/lib/mongooseConnect"
import Team from "@/models/team"
import Notice from "@/models/notice"

export default async function handler(req: any, res: any) {
  const {
    query: { teamId },
    // body: { teamId },
    // method,
  } = req
  // console.log(req.query)
  await dbConnect()

  const today = new Date()
  // console.log(moment(moment().format("YYYY-MM-DD")).toString())

  try {
    const notices =
      teamId === "all"
        ? await Notice.find({
            endDate: {
              $gte: moment(moment().subtract(10, "days").format("YYYY-MM-DD")),
            },
            isDeleted: {
              $eq: false,
            },
          }).sort({ startDate: -1 })
        : await Notice.find({
            $or: [{ teamId: teamId }, { teamId: "All" }],
            endDate: {
              $gte: moment(moment().subtract(10, "days").format("YYYY-MM-DD")),
            },
            isDeleted: {
              $eq: false,
            },
          }).sort({ startDate: -1 })
    // console.log(notices)
    if (notices) {
      res.status(200).json({ success: true, data: notices })
    } else {
      return res.status(400).json({ success: false })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false })
  }
}
