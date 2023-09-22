import mongoose from "mongoose"
import User from "@/models/user"

mongoose.set("debug", JSON.parse(process.env.MONGOOSE_DEBUG ?? ""))

const { Schema } = mongoose
const NoticeSchema = new mongoose.Schema(
  {
    createdBy: { type: String, required: true },
    createdFrom: { type: String, required: true },
    teamId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    isDeleted: { type: Boolean, default: false },
    deletedBy: { type: String },
    timezoneOffset: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true }
)

export default mongoose.models.Notice ||
  mongoose.model("Notice", NoticeSchema, "notices") // schemaName, schemaObject, collectionName
