const chefModel = require("../models/chefModel");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await chefModel.findOne({ email, password });

    if (!user) {
      return res.status(404).send("not found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const registerController = async (req, res) => {
  try {
    const newUser = new chefModel(req.body);

    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const getAllChefs = async (req, res) => {
  try {
    const chefs = await chefModel.find();
    res.status(200).json(chefs);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getChef = async (req, res) => {
  try {
    const chef = await chefModel.find({ _id: req.params.userid });
    res.json(chef);
  } catch (error) {
    res.status(500).json({ error: "No Chef Found" });
  }
};

const updateChef = async (req, res) => {
  try {
    const updatedChef = await chefModel.findOneAndUpdate(
      { _id: req.params.userid }, // Assuming userId is the MongoDB ObjectId
      req.body,
      { new: true } // To return the updated document
    );

    if (!updatedChef) {
      // Handle the case where the chef with the specified ID is not found
      return res.status(404).json({ message: "Chef not found" });
    }

    res.status(200).json({ message: "Chef Updated", chef: updatedChef });
  } catch (error) {
    console.error("Error updating chef:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteChef = async (req, res) => {
  try {
    const deleteChef = await chefModel.findOneAndDelete(req.params.userId);
    res.status(200).send("deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  loginController,
  registerController,
  getAllChefs,
  getChef,
  updateChef,
  deleteChef,
};
