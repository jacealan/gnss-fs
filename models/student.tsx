import mongoose from "mongoose"
import NAUser from "@/models/naUser"
import Team from "@/models/team"
import { ObjectId } from "mongodb"

try {
  mongoose.set("debug", JSON.parse(process.env.MONGOOSE_DEBUG ?? ""))
} catch {}

const { Schema } = mongoose
const StudentSchema = new mongoose.Schema(
  {
    branchId: { type: String, required: true },
    studentId: { type: String, required: true },
    loginId: { type: String, required: true },
    loginPw: { type: String, required: true },
    name: {
      type: String,
      required: true,
      minlength: [2, "이름은 2자 이상입니다"],
      maxlength: [10, "이름은 10자 이하입니다"],
    },
    phoneStudent: {
      type: String,
      minlength: [13, "핸드폰번호는 010-0000-0000 처럼 입력합니다"],
      maxlength: [13, "핸드폰번호는 010-0000-0000 처럼 입력합니다"],
    },
    phoneParent: {
      type: String,
      required: true,
      minlength: [13, "핸드폰번호는 010-0000-0000 처럼 입력합니다"],
      maxlength: [13, "핸드폰번호는 010-0000-0000 처럼 입력합니다"],
    },
    out: {
      type: Boolean,
      required: true,
      default: false,
    },
    birthYear: {
      type: Number,
      required: true,
    },
    class1: {
      type: String,
    },
    class2: {
      type: String,
    },
    button1Title: {
      type: String,
      required: true,
      default: "",
    },
    button1Link: {
      type: String,
      required: true,
      default: "",
    },
    button2Title: {
      type: String,
      required: true,
      default: "",
    },
    button2Link: {
      type: String,
      required: true,
      default: "",
    },
    button3Title: {
      type: String,
      required: true,
      default: "",
    },
    button3Link: {
      type: String,
      required: true,
      default: "",
    },
    button4Title: {
      type: String,
      required: true,
      default: "",
    },
    button4Link: {
      type: String,
      required: true,
      default: "",
    },
    button5Title: {
      type: String,
      required: true,
      default: "",
    },
    button5Link: {
      type: String,
      required: true,
      default: "",
    },
    timezoneOffset: { type: Number, default: -32400000 },
  },
  { versionKey: false, timestamps: true }
)

export default mongoose.models?.Student ||
  mongoose.model("Student", StudentSchema, "students") // schemaName, schemaObject, collectionName
