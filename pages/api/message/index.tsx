import { userAgent } from "next/server"
import dbConnect from "@/lib/mongooseConnect"
import User from "@/models/user"
import Message from "@/models/message"
import Team from "@/models/team"

import moment from "moment-timezone"

export default async function handler(req: any, res: any) {
  const {
    // query: { id },
    body: {
      createdBy,
      createdFrom,
      toTeamId,
      toUserEmail,
      category,
      message,
      isRead,
      isDeleted,
      timezoneOffset,
    },
    method,
  } = req

  await dbConnect()

  // const webhookURL = ""
  // const msg = {
  //   // "username": "프로필 이름",
  //   // "avatar_url": "프로필 사진",
  //   content: "내용",
  // }
  // fetch(webhookURL, {
  //   method: "POST",
  //   headers: {
  //     "content-type": "application/json",
  //   },
  //   body: JSON.stringify(msg),
  // })

  switch (method) {
    case "POST" /* CREATE MESSAGE */:
      try {
        let newMessage = new Message({
          createdBy,
          createdFrom,
          toTeamId,
          toUserEmail,
          category,
          message,
          isRead,
          isDeleted,
          timezoneOffset,
        })

        newMessage.save()

        if (newMessage) {
          // if (toTeamId === "gnBiz") {
          const createdUser = await User.findOne({ email: createdBy })
          const messageBy: string = createdUser.name
          const messageByIntraPhone: string = createdUser.intraPhone
          const messageFrom: string =
            (await Team.findOne({ teamId: createdFrom }))["title"] ?? ""
          const messageTime: string = moment()
            .tz("Asia/Seoul")
            .format("a hh:mm")
          const discordMessage = {
            content: `[${messageFrom}] (${messageBy}/${messageByIntraPhone}) ${messageTime} ${
              toTeamId === "gnGa" ? "→ 경영지원부" : ""
            }\n${message}`,
          }
          // console.log(discordMessage)
          if (toTeamId === "gnGa") {
            fetch(process.env.DISCORD_WEBHOOKURL_GNGA ?? "", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(discordMessage),
            })
          }
          if (toTeamId === "gnBiz") {
            fetch(process.env.DISCORD_WEBHOOKURL ?? "", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(discordMessage),
            })
          }
          // }

          return res.status(200).json({ success: true, data: newMessage })
        }
      } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false })
      }

    default:
      return res.status(400).json({ success: false })
  }
}
