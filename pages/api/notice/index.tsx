import { userAgent } from "next/server"
import dbConnect from "@/lib/mongooseConnect"
import User from "@/models/user"
import Notice from "@/models/notice"

// import moment from "moment"
import moment from "moment-timezone"

export default async function handler(req: any, res: any) {
  const {
    // query: { id },
    body: {
      noticeObjectId,
      deletedBy,
      createdBy,
      createdFrom,
      teamId,
      title,
      description,
      startDate,
      endDate,
      timezoneOffset,
    },
    method,
  } = req

  await dbConnect()

  switch (method) {
    // case "GET" /* READ NOTICE */:
    //   try {
    //   } catch (error) {
    //     console.log(error)
    //     return res.status(400).json({ success: false })
    //   }
    //   break

    case "POST" /* CREATE NOTICE */:
      try {
        let notice = new Notice({
          createdBy,
          createdFrom,
          teamId,
          title,
          description,
          startDate,
          endDate,
          timezoneOffset,
        })

        notice.startDate.setTime(notice.startDate.getTime() + timezoneOffset)
        notice.endDate.setTime(notice.endDate.getTime() + timezoneOffset)
        // console.log(moment(notice.startDate).tz("Asia/Seoul").format())
        notice.save()
        // notice.save().then(() => console.log(`Saved ${title} `))
        // console.log(notice)

        if (notice) {
          return res.status(200).json({ success: true, data: notice })
        }
        return res.status(400).json({ success: false })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false })
      }

    case "PUT" /* UPDATE */:
      try {
        const notice = await Notice.findOneAndUpdate(
          { _id: noticeObjectId },
          { title, startDate, endDate, description }
        )
        res.status(200).json({ success: true, data: notice })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    // case "DELETE" /* Delete a model by its ID */:
    //   try {
    //     const deletedPet = await Pet.deleteOne({ _id: id })
    //     if (!deletedPet) {
    //       return res.status(400).json({ success: false })
    //     }
    //     res.status(200).json({ success: true, data: {} })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    //   break
    case "DELETE" /* DELETE */:
      try {
        console.log(noticeObjectId, deletedBy)
        const notice = await Notice.findOneAndUpdate(
          { _id: noticeObjectId },
          { isDeleted: true, deletedBy: deletedBy }
        )
        res.status(200).json({ success: true, data: notice })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      return res.status(400).json({ success: false })
  }
}
