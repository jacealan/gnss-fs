import mongoose from "mongoose"
import User from "@/models/user"
import Team from "@/models/team"

mongoose.set("debug", JSON.parse(process.env.MONGOOSE_DEBUG ?? ""))

const { Schema } = mongoose
const BranchSchema = new mongoose.Schema(
  {
    updatedBy: { type: String, required: true },
    updatedFrom: { type: String, required: true },
    branchId: { type: String, required: true },

    branchTitle: { type: String },
    concept: { type: String, default: "수학실력과 학습습관을 잡다" },
    brand: { type: String, default: "" },
    location: { type: String, default: "" },
    area: { type: String, default: "" },
    target: { type: String, default: "" },
    blog: { type: String, default: "" },

    target0: { type: String, default: "" },
    target0Phone: { type: String, default: "" },
    target0Address: { type: String, default: "" },

    target0ScheduleTitle: { type: String, default: "" },
    target0ScheduleMonth: { type: String, default: "" },
    target0ScheduleLink: { type: String, default: "" },
    target0CounselBooking: { type: String, default: "" },
    target0ScheduleHead0: { type: String, default: "" },
    target0ScheduleImage0: { type: String, default: "" },
    target0ScheduleHead1: { type: String, default: "" },
    target0ScheduleImage1: { type: String, default: "" },
    target0ScheduleHead2: { type: String, default: "" },
    target0ScheduleImage2: { type: String, default: "" },
    target0ScheduleHead3: { type: String, default: "" },
    target0ScheduleImage3: { type: String, default: "" },
    target0ScheduleHead4: { type: String, default: "" },
    target0ScheduleImage4: { type: String, default: "" },
    target0ScheduleHead5: { type: String, default: "" },
    target0ScheduleImage5: { type: String, default: "" },
    target0ScheduleHead6: { type: String, default: "" },
    target0ScheduleImage6: { type: String, default: "" },
    target0ScheduleHead7: { type: String, default: "" },
    target0ScheduleImage7: { type: String, default: "" },
    target0ScheduleHead8: { type: String, default: "" },
    target0ScheduleImage8: { type: String, default: "" },
    target0ScheduleHead9: { type: String, default: "" },
    target0ScheduleImage9: { type: String, default: "" },

    target0KeynoteTitle: { type: String, default: "" },
    target0KeynoteMonth: { type: String, default: "" },
    target0KeynoteLink: { type: String, default: "" },
    target0KeynoteBooking: { type: String, default: "" },
    target0KeynoteHead0: { type: String, default: "" },
    target0KeynoteImage0: { type: String, default: "" },
    target0KeynoteHead1: { type: String, default: "" },
    target0KeynoteImage1: { type: String, default: "" },
    target0KeynoteHead2: { type: String, default: "" },
    target0KeynoteImage2: { type: String, default: "" },
    target0KeynoteHead3: { type: String, default: "" },
    target0KeynoteImage3: { type: String, default: "" },
    target0KeynoteHead4: { type: String, default: "" },
    target0KeynoteImage4: { type: String, default: "" },
    target0KeynoteHead5: { type: String, default: "" },
    target0KeynoteImage5: { type: String, default: "" },
    target0KeynoteHead6: { type: String, default: "" },
    target0KeynoteImage6: { type: String, default: "" },
    target0KeynoteHead7: { type: String, default: "" },
    target0KeynoteImage7: { type: String, default: "" },
    target0KeynoteHead8: { type: String, default: "" },
    target0KeynoteImage8: { type: String, default: "" },
    target0KeynoteHead9: { type: String, default: "" },
    target0KeynoteImage9: { type: String, default: "" },

    target0KeynoteTopic0: { type: String, default: "" },
    target0KeynoteTopic1: { type: String, default: "" },
    target0KeynoteTopic2: { type: String, default: "" },
    target0KeynoteTopic3: { type: String, default: "" },
    target0KeynoteTopic4: { type: String, default: "" },
    target0KeynoteTopic5: { type: String, default: "" },
    target0KeynoteTopic6: { type: String, default: "" },
    target0KeynoteTopic7: { type: String, default: "" },
    target0KeynoteTopic8: { type: String, default: "" },
    target0KeynoteTopic9: { type: String, default: "" },

    target1: { type: String, default: "" },
    target1Phone: { type: String, default: "" },
    target1Address: { type: String, default: "" },

    target1ScheduleTitle: { type: String, default: "" },
    target1ScheduleMonth: { type: String, default: "" },
    target1ScheduleLink: { type: String, default: "" },
    targetCounselBooking: { type: String, default: "" },
    target1ScheduleHead0: { type: String, default: "" },
    target1ScheduleImage0: { type: String, default: "" },
    target1ScheduleHead1: { type: String, default: "" },
    target1ScheduleImage1: { type: String, default: "" },
    target1ScheduleHead2: { type: String, default: "" },
    target1ScheduleImage2: { type: String, default: "" },
    target1ScheduleHead3: { type: String, default: "" },
    target1ScheduleImage3: { type: String, default: "" },
    target1ScheduleHead4: { type: String, default: "" },
    target1ScheduleImage4: { type: String, default: "" },
    target1ScheduleHead5: { type: String, default: "" },
    target1ScheduleImage5: { type: String, default: "" },
    target1ScheduleHead6: { type: String, default: "" },
    target1ScheduleImage6: { type: String, default: "" },
    target1ScheduleHead7: { type: String, default: "" },
    target1ScheduleImage7: { type: String, default: "" },
    target1ScheduleHead8: { type: String, default: "" },
    target1ScheduleImage8: { type: String, default: "" },
    target1ScheduleHead9: { type: String, default: "" },
    target1ScheduleImage9: { type: String, default: "" },

    target1KeynoteTitle: { type: String, default: "" },
    target1KeynoteMonth: { type: String, default: "" },
    target1KeynoteLink: { type: String, default: "" },
    target1KeynoteBooking: { type: String, default: "" },
    target1KeynoteHead0: { type: String, default: "" },
    target1KeynoteImage0: { type: String, default: "" },
    target1KeynoteHead1: { type: String, default: "" },
    target1KeynoteImage1: { type: String, default: "" },
    target1KeynoteHead2: { type: String, default: "" },
    target1KeynoteImage2: { type: String, default: "" },
    target1KeynoteHead3: { type: String, default: "" },
    target1KeynoteImage3: { type: String, default: "" },
    target1KeynoteHead4: { type: String, default: "" },
    target1KeynoteImage4: { type: String, default: "" },
    target1KeynoteHead5: { type: String, default: "" },
    target1KeynoteImage5: { type: String, default: "" },
    target1KeynoteHead6: { type: String, default: "" },
    target1KeynoteImage6: { type: String, default: "" },
    target1KeynoteHead7: { type: String, default: "" },
    target1KeynoteImage7: { type: String, default: "" },
    target1KeynoteHead8: { type: String, default: "" },
    target1KeynoteImage8: { type: String, default: "" },
    target1KeynoteHead9: { type: String, default: "" },
    target1KeynoteImage9: { type: String, default: "" },

    target1KeynoteTopic0: { type: String, default: "" },
    target1KeynoteTopic1: { type: String, default: "" },
    target1KeynoteTopic2: { type: String, default: "" },
    target1KeynoteTopic3: { type: String, default: "" },
    target1KeynoteTopic4: { type: String, default: "" },
    target1KeynoteTopic5: { type: String, default: "" },
    target1KeynoteTopic6: { type: String, default: "" },
    target1KeynoteTopic7: { type: String, default: "" },
    target1KeynoteTopic8: { type: String, default: "" },
    target1KeynoteTopic9: { type: String, default: "" },

    timezoneOffset: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true }
)

export default mongoose.models.Branch ||
  mongoose.model("Branch", BranchSchema, "branches") // schemaName, schemaObject, collectionName
