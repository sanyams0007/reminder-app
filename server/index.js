const express = require("express");
const cors = require("cors");
const scheduler = require("./scheduler");
require("dotenv").config();
require("./dbs/connection");

/* Routers */
const UserRouter = require("./routes/userRouter");
const ReminderRouter = require("./routes/reminderRouter");
const FeedbackRouter = require("./routes/feedbackRouter");

/* Constant Variables */
const PORT = process.env.PORT || 5000;

/* Server App */
const app = express();

/* middlewares */
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Advance cors configuration
/* app.use(
  cors({
    origin: "https://edayreminders.netlify.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
  })
); */

/* API Routes */
app.get("/", (req, res) => res.send("Hello to Reminders API v2"));
app.use("/users", UserRouter);
app.use("/reminders", ReminderRouter);
app.use("/feedback", FeedbackRouter);

/* set up server for listening to port */
app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT}`);
});

/* Scheduler for App */
scheduler.start();

module.exports = app;
