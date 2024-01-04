const reviewModel = require("../models/reviewModel");




const createReview = async (req, res) => {
  try {
    const newReview = new reviewModel(req.body);

    await newReview.save();
    res.status(201).json({
      success: true,
      newReview,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const getAllReviews=async(req,res)=>{
  try {
    const reviews=await reviewModel.find()
    res.status(200).json(reviews)
  } catch (error) {
    res.status(500).json(error)
  }
}



module.exports = { createReview,getAllReviews};
