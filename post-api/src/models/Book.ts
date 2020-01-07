import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema(
  {
    title: { type: String, required: true, minlength: 2 },
    text: { type: String }
  },
  {
    strict: "throw",
    timestamps: true
  }
);

export default mongoose.model("Book", schema);
