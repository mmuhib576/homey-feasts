const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mealsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  chefName: {
    type: Schema.Types.ObjectId,
    ref: "Chef",
  },
  price: {
    type: String,
    required: true,
  },
});

const mealsModel = mongoose.model("Meal", mealsSchema);

module.exports = mealsModel;
