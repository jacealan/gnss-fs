import mongoose from "mongoose"
import User from "@/models/user"

mongoose.set("debug", JSON.parse(process.env.MONGOOSE_DEBUG ?? ""))

const { Schema } = mongoose
const MessageSchema = new mongoose.Schema(
  {
    createdBy: { type: String, required: true },
    createdFrom: { type: String, required: true },
    toTeamId: { type: String },
    toUserEmail: { type: String },
    category: { type: String },
    message: { type: String, required: true },
    isRead: { type: Date },
    isDeleted: { type: Boolean, default: false },
    timezoneOffset: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true }
)

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema, "messages") // schemaName, schemaObject, collectionName
