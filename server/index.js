const express = require("express");
//const mongoose = require("mongoose");
//const reminderModel = require("./models/reminderModel");
const cors = require("cors");
const scheduler = require("./scheduler");
require("dotenv").config();
require("./dbs/connection");

/* Routers */
const UserRouter = require("./routes/userRouter");
const ReminderRouter = require("./routes/reminderRouter");

/* Constant Variables */
const PORT = process.env.PORT | 5000;

/* Server App */
const app = express();

/* middlewares */
app.use(express.json());
app.use(cors());

/* API Routes */
app.get("/", (req, res) => res.send("HELLO FROM BACKEND"));
app.use("/users", UserRouter);
app.use("/reminders", ReminderRouter);

/* Scheduler for App */

/* set up server for listening to port */
app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT}`);
});

scheduler.start();
module.exports = app;
