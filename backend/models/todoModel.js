const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
  todo: {
    type: String,
    required: [true, "please add the todo"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
