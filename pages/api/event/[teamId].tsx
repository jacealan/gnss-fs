import moment from "moment-timezone"

import dbConnect from "@/lib/mongooseConnect"
import Team from "@/models/team"
import Event from "@/models/event"

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
    let events

    if (teamId === "holiday") {
      events = await Event.find({
        category: "holiday",
        isDeleted: {
          $eq: false,
        },
      }).sort({ onDate: 1 })
    } else if (teamId === "mocktest") {
      events = await Event.find({
        category: "mocktest",
        isDeleted: {
          $eq: false,
        },
      }).sort({ onDate: 1 })
    } else if (teamId === "univtest") {
      events = await Event.find({
        category: "univtest",
        isDeleted: {
          $eq: false,
        },
      }).sort({ onDate: 1 })
    } else {
      events = await Event.find({
        category: {
          $eq: "",
        },
        teamId: teamId,
        isDeleted: {
          $eq: false,
        },
        // onDate: {
        //   $gte: moment(moment().subtract(10, "days").format("YYYY-MM-DD")),
        // },
      }).sort({ onDate: -1 })
    }
    if (events) {
      res.status(200).json({ success: true, data: events })
    } else {
      return res.status(400).json({ success: false })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false })
  }
}
