import mongoose from "mongoose"
import User from "@/models/user"
import Branch from "@/models/branch"

mongoose.set("debug", JSON.parse(process.env.MONGOOSE_DEBUG ?? ""))

const { Schema } = mongoose
const TeamSchema = new mongoose.Schema(
  {
    // info
    teamId: { type: String },
    title: { type: String },
    brand: { type: String },
    area: { type: String },
    location: { type: String },
    isElementSchool: { type: Boolean },
    isMiddleSchool: { type: Boolean },
    isHighSchool: { type: Boolean },
    // phone, address
    phone: { type: String },
    address: { type: String },
    phoneElement: { type: String },
    addressElement: { type: String },
    phoneMiddle: { type: String },
    addressMiddle: { type: String },
    phoneHigh: { type: String },
    addressHigh: { type: String },
    // link
    blog: { type: String },
    blogElement: { type: String },
    blogMiddle: { type: String },
    blogHigh: { type: String },
    blogScience: { type: String },
    email: { type: String },
    // Ask Counseling
    askInput: { type: String },
    askForm: { type: String },
    askSheet: { type: String },
    askStatus: { type: String },
    // Application Test
    applyElementSheet: { type: String },
    applyMiddleSheet: { type: String },
    applyHighSheet: { type: String },
    // Management New Student
    applyReserveSheet: { type: String },
    applyReserveStatus: { type: String },
    applyReserve: { type: String }, //
    applyReserveForm: { type: String }, //
    newStatus: { type: String },
    // Keynote
    keynoteReserveSheet: { type: String },
    keynoteReserve: { type: String },
    keynoteReserveForm: { type: String },
    keynoteElementReserveSheet: { type: String },
    keynoteElementReserve: { type: String },
    keynoteElementReserveForm: { type: String },
    keynoteMiddleReserveSheet: { type: String },
    keynoteMiddleReserve: { type: String },
    keynoteMiddleReserveForm: { type: String },
    keynoteHighReserveSheet: { type: String },
    keynoteHighReserve: { type: String },
    keynoteHighReserveForm: { type: String },
    keynoteScienceReserveSheet: { type: String },
    keynoteScienceReserve: { type: String },
    keynoteScienceReserveForm: { type: String },
    // Order
    order: { type: String },
    orderElement: { type: String },
    orderMiddle: { type: String },
    // Internet Resources
    gdriveFolder: { type: String },
    gdriveFolderGa: { type: String },
    gdriveFolderGaSc: { type: String },
    notionPage: { type: String },
    mockTest: { type: String },
    //
    members: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        userEmail: { type: String },
        userName: { type: String },
        userIntraPhone: { type: String },
      },
    ],
    events: [
      {
        date: { type: Date, required: true },
        title: { type: String, required: true },
      },
    ],
    notices: [
      {
        title: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
      },
    ],
    branches: [
      {
        branchObjectId: { type: Schema.Types.ObjectId, ref: "Branch" },
        branchId: { type: String, required: true },
      },
    ],
    quickLinks: [
      {
        title: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
    tuitions: [Number],
  },
  { versionKey: false, timestamps: true }
)

export default mongoose.models.Team ||
  mongoose.model("Team", TeamSchema, "teams") // schemaName, schemaObject, collectionName
