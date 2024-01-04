const mealsModel = require("../models/mealsModel");
const chefModel = require("../models/chefModel");
// var fs = require('fs');
// var path = require('path');
// var multer = require('multer');

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'uploads')
//   },
//   filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now())
//   }
// });

// var upload = multer({ storage: storage });

const createMeal = async (req, res) => {
  const { title, description, price, image, chefName } = req.body;

  try {
    // Create a new meal
    const newMeal = await mealsModel.create({
      title,
      description,
      price,
      image,
      chefName,
    });

    // Find the chef by _id and update the meals array
    const updatedChef = await chefModel.findByIdAndUpdate(
      chefName,
      { $push: { meals: newMeal._id } }, // Assuming 'meals' is the array in the Chef model
      { new: true } // Return the updated chef document
    );

    // Respond with the newly created meal
    res.status(201).json(newMeal);
  } catch (error) {
    console.error("Error adding meal:", error);
    res.status(500).json({ error: "Error adding meal" });
  }
};

const getAllMeals = async (req, res) => {
  try {
    const meals = await mealsModel.find().populate("chefName");
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMeal = async (req, res) => {
  try {
    const meal = await mealsModel.find({ _id: req.params.mealid });
    res.json(meal);
  } catch (error) {
    res.status(500).json({ error: "No Meal Found" });
  }
};

const updateMeal = async (req, res) => {
  try {
    const updatedMeal = await mealsModel.findOneAndUpdate(
      { _id: req.params.mealid },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedMeal);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteMeal = async (req, res) => {
  const { mealid } = req.params;
  try {
    // Find the meal to get the chefId
    const meal = await mealsModel.findById(mealid);

    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    // Delete the meal
    await mealsModel.findByIdAndDelete(mealid);

    // Remove the meal from the chef's meals array
    await chefModel.findByIdAndUpdate(meal.chefName, {
      $pull: { meals: mealid },
    });

    res.status(200).send("deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createMeal, getAllMeals, getMeal, updateMeal, deleteMeal };
