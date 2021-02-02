const userModel = require("../models/userModel");
const reminderModel = require("../models/reminderModel");
const mongoose = require("mongoose");

module.exports = {
  getReminders: async (req, res) => {
    const { user: _id } = req;
    try {
      const reminders = await reminderModel
        .find({ createdBy: _id })
        .sort({ createdAt: -1 });
      res.json(reminders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createReminder: async (req, res) => {
    const {
      title,
      message,
      remindAt,
      phone,
      email,
      userEmail,
      userPhone,
    } = req.body;
    let recDate = new Date(remindAt);
    let cmpDate = new Date(Date.now() + 1 * 1 * 1 * 30 * 1000);
    try {
      // if any field is blank
      if (!title || !message || !remindAt)
        return res.status(400).json({ msg: "Please fill all fields" });

      if (phone === false && email === false)
        return res
          .status(400)
          .json({ msg: "You must enable either Email or Mobile or Both" });

      if (recDate.getTime() < cmpDate.getTime())
        return res.status(400).json({
          msg: "Timer is too early ,set it for atleast 1 minute later",
        });

      // create new reminder
      const newReminder = new reminderModel({
        title,
        message,
        phone,
        email,
        createdBy: req.user,
        remindAt,
        userEmail,
        userPhone,
      });

      const savedReminder = await newReminder.save();
      //console.log(savedReminder);
      res.json(savedReminder);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateReminder: async (req, res) => {
    const { _id } = req.params;
    //console.log(req.body);
    const {
      title,
      message,
      remindAt,
      phone,
      email,
      userEmail,
      userPhone,
    } = req.body;
    let recDate = new Date(remindAt);
    let cmpDate = new Date(Date.now() + 30 * 1000);
    try {
      // validating id of object
      if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(400).json({ msg: "No Reminder with that id." });

      // if any field is blank
      if (!title || !message)
        return res
          .status(400)
          .json({ msg: "Title and Message can't be empty" });

      if (phone === false && email === false)
        return res
          .status(400)
          .json({ msg: "You must enable either Email or Mobile or Both" });

      if (recDate.getTime() < cmpDate.getTime())
        return res.status(400).json({
          msg: "Timer is too early ,set it for atleast 1 minute later",
        });

      const updatedReminder = await reminderModel.findByIdAndUpdate(
        _id,
        {
          title,
          message,
          phone,
          email,
          createdBy: req.user,
          remindAt,
          userEmail,
          userPhone,
        },
        { new: true }
      );
      //console.log(updatedReminder)
      res.json(updatedReminder);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteReminder: async (req, res) => {
    const { _id } = req.params;
    try {
      const reminder = await reminderModel.findOne({
        createdBy: req.user,
        _id: _id,
      });
      if (!mongoose.Types.ObjectId.isValid(_id) || !reminder)
        return res.status(400).json({ msg: "No Reminder found" });

      const deletedReminder = await reminderModel.findByIdAndDelete(_id);
      res.json(deletedReminder);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  deleteAllReminders: async (req, res) => {
    console.log(req.user);
    const { user: _id } = req;
    try {
      const deletedReminders = await reminderModel.remove({ createdBy: _id });
      res.json(deletedReminders);
    } catch (err) {
      res.json(err);
      res.status(500).json({ error: err.message });
    }
  },
};
