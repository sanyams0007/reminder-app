const mongoose = require("mongoose");
/* default: () => Date.now() + 1 * 24 * 60 * 60 * 1000, */
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
    index: true,
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
  sendEmail: {
    type: String,
  },
});

reminderSchema.methods.isItTheTime = function (date) {
  /* console.log("withinStart @ ", date);
  console.log("remind @ ", this.remindAt);
  console.log("withinEnd @ ", new Date(date.getTime() + 60000));
  console.log(this.remindAt >= date);
  console.log(this.remindAt < date.getTime() + 60000); */
  return (
    this.remindAt >= date && this.remindAt < new Date(date.getTime() + 60000)
  );
};

reminderSchema.statics.sendNotifications = function (callback) {
  // get Current Time
  const currentDateTime = new Date(Date.now() - 1000);
  /* console.log("Start @ ", currentDateTime);
  console.log("End @ ", new Date(currentDateTime.getTime() + 60000)); */
  Reminder.find().then(function (reminders) {
    reminders = reminders.filter(function (reminder) {
      return reminder.isItTheTime(currentDateTime);
    });
    if (reminders.length > 0) {
      sendNotifications(reminders);
    }
  });

  /* Sends reminders to all possible candidates 
  @param {array} of reminders in current minute
  */

  function sendNotifications(reminders) {
    reminders.forEach(function (reminder) {
      if (reminder.email) {
        console.log(
          "Sending email @ ",
          reminder.sendEmail,
          " Remind @ ",
          reminder.remindAt
        );
      }
      /* if (reminder.phone) console.log("phone"); */
    });
    if (callback) {
      callback.call();
    }
  }
};

const Reminder = mongoose.model("reminder", reminderSchema);

module.exports = Reminder;
