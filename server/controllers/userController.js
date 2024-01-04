const userModel = require("../models/userModel");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });

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
    const newUser = new userModel(req.body);

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

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.params.userid }, // Use an object to specify the filter
      req.body,
      { new: true } // Return the updated document
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteUser = await userModel.findOneAndDelete(req.params.userId);
    res.status(200).send("deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  loginController,
  registerController,
  getAllUsers,
  updateUser,
  deleteUser,
};
