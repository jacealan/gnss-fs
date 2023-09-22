import dbConnect from "@/lib/mongooseConnect"
import Branch from "@/models/branch"

export default async function handler(req: any, res: any) {
  const {
    // query: { teamId },
    // body: { teamId },
    // method,
  } = req

  await dbConnect()

  try {
    const branches = await Branch.find({})
    // console.log(teams)
    if (branches) {
      res.status(200).json({ success: true, data: branches })
    } else {
      return res.status(400).json({ success: false })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false })
  }
}
