import dbConnect from "@/lib/mongooseConnect"
import User from "@/models/user"

export default async function handler(req: any, res: any) {
  const {
    // query: { teamId },
    // body: { teamId },
    // method,
  } = req

  await dbConnect()

  try {
    const users = await User.find({}, "email name intraPhone phone")
    // console.log(users)
    if (users) {
      res.status(200).json({ success: true, data: users })
    } else {
      return res.status(400).json({ success: false })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false })
  }
}
