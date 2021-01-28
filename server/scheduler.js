"use stict";

const CronJob = require("cron").CronJob;
const notificationsWorker = require("./workers/notificationsWorker");

const schedulerFactory = function () {
  return {
    start: function () {
      new CronJob(
        "00 * * * * *",
        function () {
          notificationsWorker.run();
        },
        null,
        true,
        ""
      );
    },
  };
};

module.exports = schedulerFactory();
