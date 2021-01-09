const express = require('express');
const router = new express.Router();
const {
    getReminders,
    createReminder,
    updateReminder,
    deleteReminder,
} = require("../controllers/reminderRoute");
const auth = require("../middleware/auth");

//@ ROUTE = /reminder
/* Private Route, Logged in Users can access it*/
router.get('/', auth, getReminders);
router.post('/', auth, createReminder);
router.patch('/:r_id', auth, updateReminder);
router.delete('/:r_id', auth, deleteReminder);



module.exports = router;