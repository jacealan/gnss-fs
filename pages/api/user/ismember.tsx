import dbConnect from "@/lib/mongooseConnect"
import User from "@/models/user"

export default async function handler(req: any, res: any) {
  const {
    body: { email },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case "POST" /* Get a model by its ID */:
      try {
        const user = await User.findOne({ email: email })

        if (user) {
          return res.status(200).json({ success: true, data: user })
        }
        return res.status(400).json({ success: false })
      } catch (error) {
        return res.status(400).json({ success: false })
      }

    default:
      return res.status(400).json({ success: false })
  }
}
