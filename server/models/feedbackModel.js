const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Replace 'User' with your actual User model name
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const feedbackModel = mongoose.model("Feedback", feedbackSchema);

module.exports = feedbackModel;
