const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chefSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    city: { type: String },
    State: { type: String },
  },
  meals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meal",
    },
  ],
  experienceLevel: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
});

const chefModel = mongoose.model("Chef", chefSchema);

module.exports = chefModel;
