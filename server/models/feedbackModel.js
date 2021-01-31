const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  vote: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const Feedback = new mongoose.model("feedback", feedbackSchema);

module.exports = Feedback;
