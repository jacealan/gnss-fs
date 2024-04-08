import mongoose from "mongoose"
// import User from "@/models/user"

try {
  mongoose.set("debug", JSON.parse(process.env.MONGOOSE_DEBUG ?? ""))
} catch {}

const { Schema } = mongoose
const GstvSchema = new mongoose.Schema(
  {
    order: { type: Number, default: 0 },
    link: { type: String, required: true },
    title: { type: String },
    description: { type: String },
    attachment: { type: String },
    // show: { type: Boolean, default: true },
    // startDate: { type: Date },
    // endDate: { type: Date },
    // isDeleted: { type: Boolean, default: false },
    // deletedBy: { type: String },
    timezoneOffset: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true }
)

export default mongoose.models.Gstv ||
  mongoose.model("Gstv", GstvSchema, "gstvs") // schemaName, schemaObject, collectionName
