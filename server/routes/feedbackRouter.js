const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const {
  createFeedback,
  updateFeedback,
  getFeedback,
} = require("../controllers/feedbackRoute");

router.get("/", auth, getFeedback);
router.post("/", auth, createFeedback);
router.patch("/", auth, updateFeedback);

module.exports = router;
