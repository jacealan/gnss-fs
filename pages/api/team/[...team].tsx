import dbConnect from "@/lib/mongooseConnect"
import Team from "@/models/team"

export default async function handler(req: any, res: any) {
  const {
    // query: { teamId },
    body: { teamId },
    method,
  } = req

  await dbConnect()

  switch (method) {
    // case "GET":
    //   try {
    //     const team = await Team.findOne({ teamId })
    //     console.log(team)
    //     res.status(200).json({ success: true, data: team })
    //   } catch (error) {
    //     console.log(error)
    //     return res.status(400).json({ success: false })
    //   }

    // case "POST" /* MAKE TEAM */:
    //   try {
    //     // console.log(email, name, phone, intraPhone, provider, teams)
    //     // console.log(typeof teams)
    //     const isMember = await User.findOne({ email: email })
    //     console.log(isMember)
    //     // console.log(isMember._id.toString())
    //     if (isMember) {
    //       console.log(`there is ${email}`)
    //       return res.status(400).json({ success: false })
    //     }
    //     console.log(email)
    //     const nauser = await NAUser.findOne({ email: email })
    //     console.log(nauser)
    //     console.log(1)
    //     let user = new User({
    //       email,
    //       name,
    //       phone,
    //       intraPhone,
    //       provider,
    //       id_token,
    //       naUserObjectId: nauser._id,
    //       teams,
    //     })
    //     user.save().then(() => console.log(`Saved ${email} `))

    //     if (user) {
    //       return res.status(200).json({ success: true, data: user })
    //     }
    //     return res.status(400).json({ success: false })
    //   } catch (error) {
    //     console.log(error)
    //     return res.status(400).json({ success: false })
    //   }

    // case "PUT" /* LOGIN */:
    //   console.log(email, id_token)
    //   try {
    //     const user = await User.findOne({ email: email })
    //     user.id_token = id_token
    //     // console.log(user)
    //     await user.save()
    //     res.status(200).json({ success: true, data: user })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    //   break

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
