import dbConnect from "@/lib/mongooseConnect"
import Branch from "@/models/branch"
import User from "@/models/user"

import moment from "moment-timezone"

export default async function handler(req: any, res: any) {
  const {
    // query: { teamId },
    body: {
      updatedBy,
      updatedFrom,
      branchId,
      branchTitle,

      studentNoticeTitle,
      studentNotice,
      studentNoticeDate,

      timezoneOffset,
    },
    method,
  } = req

  console.log(branchId, studentNoticeTitle, studentNotice)

  await dbConnect()

  switch (method) {
    case "PUT" /* UPDATE BRANCH */:
      console.log("PUT")
      console.log(branchId, studentNoticeTitle, studentNotice)
      console.log(studentNoticeDate)
      try {
        const branch = await Branch.findOneAndUpdate(
          { branchId: branchId },
          {
            updatedBy,
            updatedFrom,
            branchId,

            studentNoticeTitle,
            studentNotice,
            studentNoticeDate,

            timezoneOffset,
          }
        )
        // console.log(branch)

        // // const updatedUser = await User.findOne({ email: updatedBy })
        // const updatedUserName: string = updatedUser.name
        // const updatedUserIntraPhone: string = updatedUser.intraPhone
        // const updatedTime: string = moment().tz("Asia/Seoul").format("a hh:mm")
        // const discordMessage = {
        //   content: `[${branchTitle}] 학습보고서 공지사항 is Updated by ${updatedUserName}/${updatedUserIntraPhone}) at ${updatedTime}`,
        // }
        // await fetch(process.env.DISCORD_WEBHOOKURL_SCHEDULE ?? "", {
        //   method: "POST",
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   body: JSON.stringify(discordMessage),
        // })
        // console.log(discordMessage)

        res.status(200).json({ success: true, data: branch })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      return res.status(400).json({ success: false })
  }
}
