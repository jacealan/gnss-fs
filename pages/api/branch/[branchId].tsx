import dbConnect from "@/lib/mongooseConnect"
import Branch from "@/models/branch"

export default async function handler(req: any, res: any) {
  const {
    query: { branchId },
    // body: { teamId },
    // method,
  } = req

  await dbConnect()

  try {
    const branch = await Branch.findOne({ branchId })
    if (branch) {
      res.status(200).json({ success: true, data: branch })
    } else {
      return res.status(400).json({ success: false })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false })
  }
}
