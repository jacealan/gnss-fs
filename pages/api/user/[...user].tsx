import { userAgent } from "next/server"
import dbConnect from "@/lib/mongooseConnect"
import User from "@/models/user"
import NAUser from "@/models/naUser"
import Team from "@/models/team"

export default async function handler(req: any, res: any) {
  const {
    // query: { id },
    body: { email, name, phone, intraPhone, provider, id_token, teams },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case "POST" /* SIGNUP */:
      try {
        // console.log(email, name, phone, intraPhone, provider, teams)
        // console.log(typeof teams)
        const isMember = await User.findOne({ email: email })
        // console.log(isMember)
        // console.log(isMember._id.toString())
        if (isMember) {
          console.log(`there is ${email}`)
          return res.status(400).json({ success: false })
        }
        // console.log(email)
        const nauser = await NAUser.findOne({ email: email })
        // console.log(nauser)
        // console.log(1)
        let user = new User({
          email,
          name,
          phone,
          intraPhone,
          provider,
          id_token,
          naUserObjectId: nauser._id,
          teams,
        })
        user.save().then(async () => {
          console.log(`Saved ${email} `)
          for (const team of teams) {
            await Team.updateOne(
              { teamId: team.teamId },
              {
                $push: {
                  members: {
                    userId: user._id,
                    userEmail: email,
                    userName: name,
                    userIntraPhone: intraPhone,
                  },
                },
              }
            )
          }
        })

        if (user) {
          return res.status(200).json({ success: true, data: user })
        }
        return res.status(400).json({ success: false })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false })
      }

    case "PUT" /* LOGIN */:
      // console.log(email, id_token)
      try {
        const user = await User.findOne({ email: email })
        if (id_token) user.id_token = id_token

        if (name && intraPhone) {
          user.name = name
          user.intraPhone = intraPhone
          user.phone = phone
        }
        // console.log(user)
        await user.save()
        res.status(200).json({ success: true, data: user })
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

    default:
      return res.status(400).json({ success: false })
  }
}
