const express = require("express");
const router = new express.Router();
const {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder,
  deleteAllReminders,
} = require("../controllers/reminderRoute");
const auth = require("../middleware/auth");

//@ ROUTE = 3000/reminders
/* Private Route, Logged in Users can access it*/
router.get("/", auth, getReminders);
router.post("/", auth, createReminder);
router.patch("/:_id", auth, updateReminder);
router.delete("/:_id", auth, deleteReminder);
//router.delete("/all", auth, deleteAllReminders);

module.exports = router;
