import mongoose from "mongoose"
import NAUser from "@/models/naUser"
import Team from "@/models/team"
import { ObjectId } from "mongodb"

try {
  mongoose.set("debug", JSON.parse(process.env.MONGOOSE_DEBUG ?? ""))
} catch {}

const { Schema } = mongoose
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "이름은 2자 이상입니다"],
      maxlength: [60, "이름은 60자 이하입니다"],
    },
    email: {
      type: String,
      required: true,
      maxlength: [100, "이메일은 100자 이하입니다"],
    },
    anotherEmail: {
      type: String,
      maxlength: [100, "이메일은 100자 이하입니다"],
    },
    intraPhone: {
      type: String,
      required: [true, "내선번호가 없으면 ----를 입력합니다"],
      minlength: [4, "내선번호은 4자리수입니다"],
      maxlength: [4, "내선번호는 4자리수입니다"],
    },
    phone: {
      type: String,
      minlength: [13, "핸드폰번호는 010-0000-0000 처럼 입력합니다"],
      maxlength: [13, "핸드폰번호는 010-0000-0000 처럼 입력합니다"],
    },
    provider: {
      type: String,
      required: true,
    },
    id_token: {
      type: String,
      required: true,
    },
    naUserObjectId: {
      type: Schema.Types.ObjectId,
      ref: "NAUser",
      required: true,
    },
    teams: [
      {
        teamId: { type: String },
        teamObjectId: {
          type: Schema.Types.ObjectId,
          ref: "Team",
        },
        teamTitle: { type: String },
        roll: { type: String, default: "" },
        confirmed: { type: Boolean, default: false },
        isManager: { type: Boolean, default: false },
        editableInfo: { type: Boolean, default: false },
        editableLink: { type: Boolean, default: false },
        editableNotices: { type: Boolean, default: false },
        editableEvents: { type: Boolean, default: false },
      },
    ],
  },
  { versionKey: false, timestamps: true }
)

export default mongoose.models?.User ||
  mongoose.model("User", UserSchema, "users") // schemaName, schemaObject, collectionName
