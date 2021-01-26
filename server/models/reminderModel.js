const mongoose = require("mongoose");
/* default: () => Date.now() + 7*24*60*60*1000 */
//const currDate = new Date();
const reminderSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  remindAt: {
    type: Date,
    /* default: () => Date.now() + 1 * 24 * 60 * 60 * 1000, */
  },
  phone: {
    type: Boolean,
    default: false,
  },
  email: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  isCurrentlyScheduled: {
    type: Boolean,
    default: false,
  },
});

const Reminder = mongoose.model("reminder", reminderSchema);

module.exports = Reminder;
