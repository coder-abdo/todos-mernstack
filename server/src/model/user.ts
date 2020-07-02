import mongoose, { Schema } from "mongoose";
const {
  Types: { ObjectId },
} = Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  todos: [
    {
      type: ObjectId,
      ref: "Todo",
    },
  ],
});
export default mongoose.model("User", userSchema);
