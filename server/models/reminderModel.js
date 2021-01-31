const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
//const Nexmo = require("nexmo");
const fast2sms = require("fast-two-sms");
/* default: () => Date.now() + 1 * 24 * 60 * 60 * 1000, */
/* default: () => Date.now() + 7*24*60*60*1000 */
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
  userEmail: {
    type: String,
  },
  userPhone: {
    type: Number,
  },
});

reminderSchema.methods.isItTheTime = function (date) {
  /* console.log("withinStart @ ", date);
  console.log("remind @ ", this.remindAt);
  console.log("withinEnd @ ", new Date(date.getTime() + 60000));
  console.log(this.remindAt >= date);
  console.log(this.remindAt < date.getTime() + 60000); */
  return (
    this.remindAt >= date && this.remindAt < new Date(date.getTime() + 50000)
  );
};

reminderSchema.statics.sendNotifications = function (callback) {
  // get Current Time
  const currentDateTime = new Date(Date.now() - 1000);
  /* console.log("Start @ ", currentDateTime);
  console.log("End @ ", new Date(currentDateTime.getTime() + 30000)); */
  Reminder.find().then(function (reminders) {
    reminders = reminders.filter(function (reminder) {
      return reminder.isItTheTime(currentDateTime);
    });
    if (reminders.length > 0) {
      console.log("length ", reminders.length);
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
          reminder.userEmail,
          " Remind @ ",
          reminder.remindAt
        );
        sendEmail(reminder);
      }
      if (reminder.phone) {
        console.log(
          "Sending Message @ ",
          reminder.userPhone,
          " Remind @ ",
          reminder.remindAt
        );
        sendMessage(reminder);
      }
      /* if (reminder.phone) console.log("phone"); */
    });
    if (callback) {
      callback.call();
    }
  }

  async function sendEmail(reminder) {
    try {
      //let testAccount = await nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        //port: 587,
        // secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.GMAIL_USER, // generated ethereal user
          pass: process.env.GMAIL_PASS, // generated ethereal password
        },
      });
      let info = await transporter.sendMail({
        from: '"EDAY Reminders 👻" <edayreminders@gmail.com>', // sender address
        to: reminder.userEmail, // list of receivers
        subject: "it's a Reminder", // Subject line
        text: "Hello there!", // plain text body
        html: `
            <p>Hello there you have a reminder for today,did you forgot it?</p>
            <h1>${reminder.title}</h1>
            <p>${reminder.message}</p>
      `, // html body
      });
      console.log(reminder.email, "  ", reminder.userEmail);
    } catch (error) {
      console.log(error);
    }
  }

  async function sendMessage(reminder) {
    let options = {
      authorization: process.env.F2S_AUTH_KEY,
      message: reminder.message,
      numbers: [reminder.userPhone],
    };
    try {
      const response = await fast2sms.sendMessage(options);
      //console.log(response);
    } catch (error) {
      console.log(error);
    }

    /* try {
      const nexmo = new Nexmo(
        {
          apiKey: "3e44bc99",
          apiSecret: "urxKZrRGc7Mik4SW",
        },
        { debug: true }
      );

      const from = "Eday Reminders";
      const to = `917726895816`;
      const text = "or lodu kaisa hai";

      nexmo.message.sendSms(from, to, text);
    } catch (error) {
      console.log(error);
    } */
  }
};

const Reminder = mongoose.model("reminder", reminderSchema);

module.exports = Reminder;
