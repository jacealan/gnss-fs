import dbConnect from "@/lib/mongooseConnect"
import Gstv from "@/models/gstv"

import moment from "moment-timezone"

export default async function handler(req: any, res: any) {
  const {
    // query: { teamId },
    body: { gstv1, gstv2, gstv3, gstv4 },
    method,
  } = req

  await dbConnect()

  switch (method) {
    // case "POST" /* MAKE BRANCH */:
    //   // console.log("POST")
    //   try {
    //     const isOrder = await Gstv.findOne({ order: order })
    //     if (isOrder) {
    //       console.log(`there is ${order}`)
    //       return res.status(400).json({ success: false })
    //     }

    //     let gstv = new Gstv({
    //       order,
    //       link,
    //       title,
    //       description,
    //       attachment,
    //       timezoneOffset,
    //     })
    //     gstv.save().then(() => console.log(`Saved ${order} `))
    //     if (gstv) {
    //       return res.status(200).json({ success: true, data: gstv })
    //     }
    //     return res.status(400).json({ success: false })
    //   } catch (error) {
    //     console.log(error)
    //     return res.status(400).json({ success: false })
    //   }

    case "PUT" /* UPDATE BRANCH */:
      // console.log("PUT")
      try {
        const gstv1db = await Gstv.findOneAndUpdate(
          { order: 1 },
          { link: gstv1 }
        )
        const gstv2db = await Gstv.findOneAndUpdate(
          { order: 2 },
          { link: gstv2 }
        )
        const gstv3db = await Gstv.findOneAndUpdate(
          { order: 3 },
          { link: gstv3 }
        )
        const gstv4db = await Gstv.findOneAndUpdate(
          { order: 4 },
          { link: gstv4 }
        )
        // console.log(gstv1db)

        const updatedTime: string = moment().tz("Asia/Seoul").format("a hh:mm")
        const discordMessage = {
          content: `개상tv of HOMEPAGE is Updated at ${updatedTime}\nno. 1 : ${gstv1}\nno. 2 : ${gstv2}\nno. 3 : ${gstv3}\nno. 4 : ${gstv4}`,
        }
        await fetch(process.env.DISCORD_WEBHOOKURL_SCHEDULE ?? "", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(discordMessage),
        })
        // console.log(discordMessage)

        res.status(200).json({ success: true, data: [gstv1db] })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      return res.status(400).json({ success: false })
  }
}
