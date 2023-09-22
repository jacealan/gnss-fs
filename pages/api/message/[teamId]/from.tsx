import moment from "moment-timezone"

import dbConnect from "@/lib/mongooseConnect"
import Team from "@/models/team"
import Message from "@/models/message"

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
    const messages = await Message.find({
      createdFrom: teamId,
      createdAt: {
        $gte: moment(moment().subtract(10, "days")),
      },
    }).sort({ createdAt: -1 })
    // console.log(messages)
    if (messages) {
      res.status(200).json({ success: true, data: messages })
    } else {
      return res.status(400).json({ success: false })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false })
  }
}
