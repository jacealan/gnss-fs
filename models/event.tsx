import mongoose from "mongoose"
import User from "@/models/user"
import Team from "@/models/team"

mongoose.set("debug", JSON.parse(process.env.MONGOOSE_DEBUG ?? ""))

const { Schema } = mongoose
const EventSchema = new mongoose.Schema(
  {
    createdBy: { type: String, required: true },
    createdFrom: { type: String, required: true },
    teamId: { type: String, required: true },
    category: { type: String },
    title: { type: String, required: true },
    onDate: { type: Date },
    isDeleted: { type: Boolean, default: false },
    deletedBy: { type: String },
    timezoneOffset: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true }
)

export default mongoose.models.Event ||
  mongoose.model("Event", EventSchema, "events") // schemaName, schemaObject, collectionName
