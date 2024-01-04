const feedbackModel = require("../models/feedbackModel");

// const createFeedback = async (req, res) => {
//   try {
//     const { userId, ...feedbackData } = req.body;
//     const newFeedback = new feedbackModel({
//       ...feedbackData,
//       name: userId,
//     });

//     await newFeedback.save();
//     res.status(201).json({
//       success: true,
//       newFeedback,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error,
//     });
//   }
// };

const createFeedback = async (req, res, next) => {
  try {
    const { name, feedback, rating } = req.body;
    console.log(req.body);

    // Assuming userId is passed in the request body; you may adjust it based on your authentication mechanism

    const newFeedback = new feedbackModel({
      name,
      feedback,
      rating,
    });

    const savedFeedback = await newFeedback.save();

    res.status(201).json(savedFeedback);
  } catch (error) {
    console.error("Error creating feedback:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedbackModel.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createFeedback, getFeedbacks };
