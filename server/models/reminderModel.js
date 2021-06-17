const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const fast2sms = require("fast-two-sms");

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
      sendNotifications(reminders);
    }
  });

  /* Sends reminders to all possible candidates 
  @param {array} of reminders in current minute
  */

  function sendNotifications(reminders) {
    reminders.forEach(function (reminder) {
      if (reminder.email) {
        console.log("Sending email @ ", reminder.userEmail);
        sendEmail(reminder);
      }
      if (reminder.phone) {
        console.log("Sending Message @ ", reminder.userPhone);
        sendMessage(reminder);
      }
    });
    if (callback) {
      callback.call();
    }
  }

  async function sendEmail(reminder) {
    try {
      /* let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      }); */

      const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
          ciphers: "SSLv3",
        },
        auth: {
          user: process.env.OUTLOOK_USER,
          pass: process.env.OUTLOOK_PASS,
        },
      });

      
      let info = await transporter.sendMail({
        from: '"EDAY Reminders 👻" <edayreminders@outlook.com>', // sender address
        to: reminder.userEmail, // list of receivers
        subject: "It's a Reminder!", // Subject line
        text: reminder.message, // plain text body
        html: `
            <p>Hello there you have a reminder for today,did you forgot it ?</p>
            <h1>${reminder.title}</h1>
            <p>${reminder.message}</p>
      `, // html body
      });
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
    } catch (error) {
      console.log(error);
    }
  }
};

const Reminder = mongoose.model("reminder", reminderSchema);

module.exports = Reminder;
