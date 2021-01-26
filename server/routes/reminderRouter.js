const express = require("express");
const router = new express.Router();
const {
  getReminders,
  createReminder,
  updateReminder,
  deleteReminder,
} = require("../controllers/reminderRoute");
const auth = require("../middleware/auth");

//@ ROUTE = 3000/reminders
/* Private Route, Logged in Users can access it*/
router.get("/", auth, getReminders);
router.post("/", auth, createReminder);
router.patch("/:_id", auth, updateReminder);
router.delete("/:_id", auth, deleteReminder);

module.exports = router;
