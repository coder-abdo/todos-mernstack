import mongoose, { Schema } from "mongoose";

const {
  Types: { ObjectId },
} = Schema;
const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  isCompleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: ObjectId,
    ref: "User",
  },
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
