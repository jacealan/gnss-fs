import dbConnect from "@/lib/mongooseConnect"
import Team from "@/models/team"

export default async function handler(req: any, res: any) {
  const {
    // query: { teamId },
    // body: { teamId },
    // method,
  } = req

  await dbConnect()

  try {
    const teams = await Team.find({}, "teamId title members")
    // console.log(teams)
    if (teams) {
      res.status(200).json({ success: true, data: teams })
    } else {
      return res.status(400).json({ success: false })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false })
  }
}
