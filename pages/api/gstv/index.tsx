import dbConnect from "@/lib/mongooseConnect"
import Gstv from "@/models/gstv"

export default async function handler(req: any, res: any) {
  const {
    // query: { teamId },
    // body: { teamId },
    // method,
  } = req

  await dbConnect()
  // console.log(1)

  try {
    const gstvs = await Gstv.find({})
    // console.log(teams)
    if (gstvs) {
      res.status(200).json({ success: true, data: gstvs })
    } else {
      return res.status(400).json({ success: false })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false })
  }
}
