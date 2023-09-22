import { userAgent } from "next/server"
import dbConnect from "@/lib/mongooseConnect"
import User from "@/models/user"
import Event from "@/models/event"

// import moment from "moment"
import moment from "moment-timezone"

export default async function handler(req: any, res: any) {
  const {
    // query: { id },
    body: {
      eventObjectId,
      createdBy,
      createdFrom,
      teamId,
      category,
      title,
      onDate,
      isDeleted,
      deletedBy,
      timezoneOffset,
    },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case "POST" /* CREATE EVENT */:
      try {
        let event = new Event({
          createdBy,
          createdFrom,
          teamId,
          category,
          title,
          onDate,
          timezoneOffset,
        })
        console.log(event)
        event.onDate.setTime(event.onDate.getTime() + timezoneOffset)
        event.save()

        if (event) {
          return res.status(200).json({ success: true, data: event })
        }
        return res.status(400).json({ success: false })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false })
      }

    case "PUT" /* UPDATE */:
      try {
        const event = await Event.findOneAndUpdate(
          { _id: eventObjectId },
          { title, onDate }
        )
        res.status(200).json({ success: true, data: event })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case "DELETE" /* DELETE */:
      try {
        console.log(eventObjectId)
        const event = await Event.findOneAndUpdate(
          { _id: eventObjectId },
          { isDeleted: true, deletedBy: deletedBy }
        )
        res.status(200).json({ success: true, data: event })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      return res.status(400).json({ success: false })
  }
}
