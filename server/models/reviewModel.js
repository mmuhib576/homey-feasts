const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const reviewSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    chef: { type: Schema.Types.ObjectId, ref: "Chef" },
    rating: ["1", "2", "3", "4", "5"],
    review: {
      type: String,
    },
    reviewDate: {
      type: Date,
      default: Date.now,
    },
  },
  
);

const reviewModel = mongoose.model("Review", reviewSchema);

module.exports = reviewModel;
