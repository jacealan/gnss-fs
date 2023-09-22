import mongoose from "mongoose"

mongoose.set("debug", JSON.parse(process.env.MONGOOSE_DEBUG ?? ""))

const { Schema } = mongoose
const NAUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this pet."],
      maxlength: [60, "Name cannot be more than 60 characters"],
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    emailVerified: {
      type: Boolean,
    },
  },
  { versionKey: false, timestamps: true }
)

export default mongoose.models.NAUser ||
  mongoose.model("NAUser", NAUserSchema, "naUsers") // schemaName, schemaObject, collectionName
