const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteMeals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
    },
  ],
  favoriteChefs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chef",
    },
  ],
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
