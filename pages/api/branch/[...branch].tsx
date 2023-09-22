import dbConnect from "@/lib/mongooseConnect"
import Branch from "@/models/branch"

export default async function handler(req: any, res: any) {
  const {
    // query: { teamId },
    body: {
      updatedBy,
      updatedFrom,
      branchId,

      branchTitle,
      concept,
      brand,
      location,
      area,
      target,
      blog,

      target0,
      target0Phone,
      target0Address,

      target0ScheduleTitle,
      target0ScheduleMonth,
      target0ScheduleLink,
      target0CounselBooking,
      target0ScheduleHead0,
      target0ScheduleImage0,
      target0ScheduleHead1,
      target0ScheduleImage1,
      target0ScheduleHead2,
      target0ScheduleImage2,
      target0ScheduleHead3,
      target0ScheduleImage3,
      target0ScheduleHead4,
      target0ScheduleImage4,
      target0ScheduleHead5,
      target0ScheduleImage5,
      target0ScheduleHead6,
      target0ScheduleImage6,
      target0ScheduleHead7,
      target0ScheduleImage7,
      target0ScheduleHead8,
      target0ScheduleImage8,
      target0ScheduleHead9,
      target0ScheduleImage9,

      target0KeynoteTitle,
      target0KeynoteMonth,
      target0KeynoteLink,
      target0KeynoteBooking,
      target0KeynoteHead0,
      target0KeynoteImage0,
      target0KeynoteHead1,
      target0KeynoteImage1,
      target0KeynoteHead2,
      target0KeynoteImage2,
      target0KeynoteHead3,
      target0KeynoteImage3,
      target0KeynoteHead4,
      target0KeynoteImage4,
      target0KeynoteHead5,
      target0KeynoteImage5,
      target0KeynoteHead6,
      target0KeynoteImage6,
      target0KeynoteHead7,
      target0KeynoteImage7,
      target0KeynoteHead8,
      target0KeynoteImage8,
      target0KeynoteHead9,
      target0KeynoteImage9,

      target0KeynoteTopic0,
      target0KeynoteTopic1,
      target0KeynoteTopic2,
      target0KeynoteTopic3,
      target0KeynoteTopic4,
      target0KeynoteTopic5,
      target0KeynoteTopic6,
      target0KeynoteTopic7,
      target0KeynoteTopic8,
      target0KeynoteTopic9,

      target1,
      target1Phone,
      target1Address,

      target1ScheduleTitle,
      target1ScheduleMonth,
      target1ScheduleLink,
      targetCounselBooking,
      target1ScheduleHead0,
      target1ScheduleImage0,
      target1ScheduleHead1,
      target1ScheduleImage1,
      target1ScheduleHead2,
      target1ScheduleImage2,
      target1ScheduleHead3,
      target1ScheduleImage3,
      target1ScheduleHead4,
      target1ScheduleImage4,
      target1ScheduleHead5,
      target1ScheduleImage5,
      target1ScheduleHead6,
      target1ScheduleImage6,
      target1ScheduleHead7,
      target1ScheduleImage7,
      target1ScheduleHead8,
      target1ScheduleImage8,
      target1ScheduleHead9,
      target1ScheduleImage9,

      target1KeynoteTitle,
      target1KeynoteMonth,
      target1KeynoteLink,
      target1KeynoteBooking,
      target1KeynoteHead0,
      target1KeynoteImage0,
      target1KeynoteHead1,
      target1KeynoteImage1,
      target1KeynoteHead2,
      target1KeynoteImage2,
      target1KeynoteHead3,
      target1KeynoteImage3,
      target1KeynoteHead4,
      target1KeynoteImage4,
      target1KeynoteHead5,
      target1KeynoteImage5,
      target1KeynoteHead6,
      target1KeynoteImage6,
      target1KeynoteHead7,
      target1KeynoteImage7,
      target1KeynoteHead8,
      target1KeynoteImage8,
      target1KeynoteHead9,
      target1KeynoteImage9,

      target1KeynoteTopic0,
      target1KeynoteTopic1,
      target1KeynoteTopic2,
      target1KeynoteTopic3,
      target1KeynoteTopic4,
      target1KeynoteTopic5,
      target1KeynoteTopic6,
      target1KeynoteTopic7,
      target1KeynoteTopic8,
      target1KeynoteTopic9,

      timezoneOffset,
    },
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

    case "POST" /* MAKE BRANCH */:
      console.log("POST")
      try {
        const isBranch = await Branch.findOne({ branchId: branchId })
        if (isBranch) {
          console.log(`there is ${branchId}`)
          return res.status(400).json({ success: false })
        }
        //     console.log(email)
        //     const nauser = await NAUser.findOne({ email: email })
        //     console.log(nauser)
        //     console.log(1)

        let branch = new Branch({
          updatedBy,
          updatedFrom,
          branchId,

          branchTitle,
          concept,
          brand,
          location,
          area,
          target,
          blog,

          target0,
          target0Phone,
          target0Address,

          target0ScheduleTitle,
          target0ScheduleMonth,
          target0ScheduleLink,
          target0CounselBooking,
          target0ScheduleHead0,
          target0ScheduleImage0,
          target0ScheduleHead1,
          target0ScheduleImage1,
          target0ScheduleHead2,
          target0ScheduleImage2,
          target0ScheduleHead3,
          target0ScheduleImage3,
          target0ScheduleHead4,
          target0ScheduleImage4,
          target0ScheduleHead5,
          target0ScheduleImage5,
          target0ScheduleHead6,
          target0ScheduleImage6,
          target0ScheduleHead7,
          target0ScheduleImage7,
          target0ScheduleHead8,
          target0ScheduleImage8,
          target0ScheduleHead9,
          target0ScheduleImage9,

          target0KeynoteTitle,
          target0KeynoteMonth,
          target0KeynoteLink,
          target0KeynoteBooking,
          target0KeynoteHead0,
          target0KeynoteImage0,
          target0KeynoteHead1,
          target0KeynoteImage1,
          target0KeynoteHead2,
          target0KeynoteImage2,
          target0KeynoteHead3,
          target0KeynoteImage3,
          target0KeynoteHead4,
          target0KeynoteImage4,
          target0KeynoteHead5,
          target0KeynoteImage5,
          target0KeynoteHead6,
          target0KeynoteImage6,
          target0KeynoteHead7,
          target0KeynoteImage7,
          target0KeynoteHead8,
          target0KeynoteImage8,
          target0KeynoteHead9,
          target0KeynoteImage9,

          target0KeynoteTopic0,
          target0KeynoteTopic1,
          target0KeynoteTopic2,
          target0KeynoteTopic3,
          target0KeynoteTopic4,
          target0KeynoteTopic5,
          target0KeynoteTopic6,
          target0KeynoteTopic7,
          target0KeynoteTopic8,
          target0KeynoteTopic9,

          target1,
          target1Phone,
          target1Address,

          target1ScheduleTitle,
          target1ScheduleMonth,
          target1ScheduleLink,
          targetCounselBooking,
          target1ScheduleHead0,
          target1ScheduleImage0,
          target1ScheduleHead1,
          target1ScheduleImage1,
          target1ScheduleHead2,
          target1ScheduleImage2,
          target1ScheduleHead3,
          target1ScheduleImage3,
          target1ScheduleHead4,
          target1ScheduleImage4,
          target1ScheduleHead5,
          target1ScheduleImage5,
          target1ScheduleHead6,
          target1ScheduleImage6,
          target1ScheduleHead7,
          target1ScheduleImage7,
          target1ScheduleHead8,
          target1ScheduleImage8,
          target1ScheduleHead9,
          target1ScheduleImage9,

          target1KeynoteTitle,
          target1KeynoteMonth,
          target1KeynoteLink,
          target1KeynoteBooking,
          target1KeynoteHead0,
          target1KeynoteImage0,
          target1KeynoteHead1,
          target1KeynoteImage1,
          target1KeynoteHead2,
          target1KeynoteImage2,
          target1KeynoteHead3,
          target1KeynoteImage3,
          target1KeynoteHead4,
          target1KeynoteImage4,
          target1KeynoteHead5,
          target1KeynoteImage5,
          target1KeynoteHead6,
          target1KeynoteImage6,
          target1KeynoteHead7,
          target1KeynoteImage7,
          target1KeynoteHead8,
          target1KeynoteImage8,
          target1KeynoteHead9,
          target1KeynoteImage9,

          target1KeynoteTopic0,
          target1KeynoteTopic1,
          target1KeynoteTopic2,
          target1KeynoteTopic3,
          target1KeynoteTopic4,
          target1KeynoteTopic5,
          target1KeynoteTopic6,
          target1KeynoteTopic7,
          target1KeynoteTopic8,
          target1KeynoteTopic9,

          timezoneOffset,
        })
        branch.save().then(() => console.log(`Saved ${branchId} `))
        if (branch) {
          return res.status(200).json({ success: true, data: branch })
        }
        return res.status(400).json({ success: false })
      } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false })
      }

    case "PUT" /* UPDATE BRANCH */:
      console.log("PUT")
      try {
        const branch = await Branch.findOneAndUpdate(
          { branchId: branchId },
          {
            updatedBy,
            updatedFrom,
            branchId,

            branchTitle,
            concept,
            brand,
            location,
            area,
            target,
            blog,

            target0,
            target0Phone,
            target0Address,

            target0ScheduleTitle,
            target0ScheduleMonth,
            target0ScheduleLink,
            target0CounselBooking,
            target0ScheduleHead0,
            target0ScheduleImage0,
            target0ScheduleHead1,
            target0ScheduleImage1,
            target0ScheduleHead2,
            target0ScheduleImage2,
            target0ScheduleHead3,
            target0ScheduleImage3,
            target0ScheduleHead4,
            target0ScheduleImage4,
            target0ScheduleHead5,
            target0ScheduleImage5,
            target0ScheduleHead6,
            target0ScheduleImage6,
            target0ScheduleHead7,
            target0ScheduleImage7,
            target0ScheduleHead8,
            target0ScheduleImage8,
            target0ScheduleHead9,
            target0ScheduleImage9,

            target0KeynoteTitle,
            target0KeynoteMonth,
            target0KeynoteLink,
            target0KeynoteBooking,
            target0KeynoteHead0,
            target0KeynoteImage0,
            target0KeynoteHead1,
            target0KeynoteImage1,
            target0KeynoteHead2,
            target0KeynoteImage2,
            target0KeynoteHead3,
            target0KeynoteImage3,
            target0KeynoteHead4,
            target0KeynoteImage4,
            target0KeynoteHead5,
            target0KeynoteImage5,
            target0KeynoteHead6,
            target0KeynoteImage6,
            target0KeynoteHead7,
            target0KeynoteImage7,
            target0KeynoteHead8,
            target0KeynoteImage8,
            target0KeynoteHead9,
            target0KeynoteImage9,

            target0KeynoteTopic0,
            target0KeynoteTopic1,
            target0KeynoteTopic2,
            target0KeynoteTopic3,
            target0KeynoteTopic4,
            target0KeynoteTopic5,
            target0KeynoteTopic6,
            target0KeynoteTopic7,
            target0KeynoteTopic8,
            target0KeynoteTopic9,

            target1,
            target1Phone,
            target1Address,

            target1ScheduleTitle,
            target1ScheduleMonth,
            target1ScheduleLink,
            targetCounselBooking,
            target1ScheduleHead0,
            target1ScheduleImage0,
            target1ScheduleHead1,
            target1ScheduleImage1,
            target1ScheduleHead2,
            target1ScheduleImage2,
            target1ScheduleHead3,
            target1ScheduleImage3,
            target1ScheduleHead4,
            target1ScheduleImage4,
            target1ScheduleHead5,
            target1ScheduleImage5,
            target1ScheduleHead6,
            target1ScheduleImage6,
            target1ScheduleHead7,
            target1ScheduleImage7,
            target1ScheduleHead8,
            target1ScheduleImage8,
            target1ScheduleHead9,
            target1ScheduleImage9,

            target1KeynoteTitle,
            target1KeynoteMonth,
            target1KeynoteLink,
            target1KeynoteBooking,
            target1KeynoteHead0,
            target1KeynoteImage0,
            target1KeynoteHead1,
            target1KeynoteImage1,
            target1KeynoteHead2,
            target1KeynoteImage2,
            target1KeynoteHead3,
            target1KeynoteImage3,
            target1KeynoteHead4,
            target1KeynoteImage4,
            target1KeynoteHead5,
            target1KeynoteImage5,
            target1KeynoteHead6,
            target1KeynoteImage6,
            target1KeynoteHead7,
            target1KeynoteImage7,
            target1KeynoteHead8,
            target1KeynoteImage8,
            target1KeynoteHead9,
            target1KeynoteImage9,

            target1KeynoteTopic0,
            target1KeynoteTopic1,
            target1KeynoteTopic2,
            target1KeynoteTopic3,
            target1KeynoteTopic4,
            target1KeynoteTopic5,
            target1KeynoteTopic6,
            target1KeynoteTopic7,
            target1KeynoteTopic8,
            target1KeynoteTopic9,

            timezoneOffset,
          }
        )
        console.log(branch)
        res.status(200).json({ success: true, data: branch })
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
