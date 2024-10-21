import dbConnect from "@/lib/mongooseConnect"
import Team from "@/models/team"

export default async function handler(req: any, res: any) {
  const {
    query: { teamId },
    // body: { teamId },
    // method,
  } = req

  await dbConnect()

  try {
    const team = await Team.findOne({ teamId })
    if (team) {
      res.status(200).json({ success: true, data: team })
    } else {
      return res.status(400).json({ success: false })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false })
  }
}
