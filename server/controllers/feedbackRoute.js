const feedbackModel = require("../models/feedbackModel");

module.exports = {
  getFeedback: async (req, res) => {
    const { user: _id } = req;
    console.log(req.user);
    try {
      const feedback = await feedbackModel.findOne({ user: _id });
      if (!feedback) {
        res.json(null);
      }
      res.json({
        name: feedback.name,
        vote: feedback.vote,
        message: feedback.message,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createFeedback: async (req, res) => {
    const { name, vote, message } = req.body;
    try {
      newFeedback = new feedbackModel({
        name,
        vote,
        message,
        user: req.user,
      });
      const savedFeedback = await newFeedback.save();
      res.json(savedFeedback);
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  },
  updateFeedback: async (req, res) => {
    //const { user: _id } = req;
    try {
      const updatedFeedback = await feedbackModel.findByIdAndUpdate(
        req.user,
        req.body,
        { new: true }
      );
      //console.log(updatedFeedback)
      res.json(updatedFeedback);
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  },
};
