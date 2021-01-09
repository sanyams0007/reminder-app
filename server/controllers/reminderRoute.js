const userModel = require('../models/userModel');
const reminderModel = require('../models/reminderModel');
const mongoose = require('mongoose');

module.exports = {
    getReminders: async (req, res) => {
        const { user: _id } = req;
        try {
            const reminders = await reminderModel.find({ createdBy: _id }).sort({ createdAt: -1 });
            res.json(reminders);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    createReminder: async (req, res) => {
        const { title, message, remindAt, phone, email } = req.body;
        try {
            // if any field is blank
            if (!title || !message)
                return res.status(400).json({ msg: "Title and Message can't be empty" });

            // create new reminder
            const newReminder = new reminderModel({
                title,
                message,
                phone,
                email,
                createdBy: req.user,
            });

            const savedReminder = await newReminder.save();
            res.json(savedReminder);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateReminder: async (req, res) => {
        const { r_id: _id } = req.params;
        const reminder = req.body;
        try {
            // validating id of object
            if (!mongoose.Types.ObjectId.isValid(_id))
                return res
                    .status(400)
                    .json({ msg: "No Reminder with that id." });

            // if any field is blank
            if (!reminder.title || !reminder.message)
                return res.status(400).json({ msg: "Title and Message can't be empty" });

            const updatedReminder = await reminderModel.findByIdAndUpdate(_id, reminder, { new: true });
            res.json(updatedReminder);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteReminder: async (req, res) => {
        const { r_id: _id } = req.user;
        try {
            if (!mongoose.Types.ObjectId.isValid(_id))
                return res
                    .status(400)
                    .json({ msg: "No Reminder found" });

            const deletedReminder = await reminderModel.findByIdAndDelete(_id);
            res.json(deletedReminder);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }

    },
};