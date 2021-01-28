const Reminder = require("../models/reminderModel");

const notificationWorkerFactory = function () {
  return {
    run: function () {
      Reminder.sendNotifications();
    },
  };
};

module.exports = notificationWorkerFactory();
