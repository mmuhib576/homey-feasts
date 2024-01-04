const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const Chef = require("../models/chefModel"); // Adjust the path to your models

router.post("/signin", async (req, res) => {
  const userLogin = req.body;
  const role = userLogin.role;

  try {
    // Define the model based on the role
    const userModel = role === "user" ? User : role === "chef" ? Chef : null;

    // Check if the role is valid
    if (!userModel) {
      return res.json({
        status: "error",
        error: "Invalid role",
      });
    }

    // Find the user or chef based on the role
    const dbUser = await userModel.findOne({ username: userLogin.userName });

    if (!dbUser) {
      return res.json({
        status: "error",
        error: `Invalid ${role} login`,
      });
    }

    const isCorrect = await bcrypt.compare(userLogin.password, dbUser.password);

    if (isCorrect) {
      const payload = {
        id: dbUser._id,
        username: dbUser.userName,
      };
      const token = jwt.sign(payload, "newSecretKey", { expiresIn: 86400 });

      // Use populate based on the role
      const authUser =
        role === "user"
          ? await User.findOne({ username: userLogin.userName })
              .populate({
                path: "favoriteMeals",
                populate: {
                  path: "chefName",
                  model: "Chef", // The model name for the Chef
                  select: "username", // Specify the fields you want to retrieve
                },
              })
              .populate("favoriteChefs")
              .exec()
          : role === "chef"
          ? await Chef.findOne({ username: userLogin.userName })
              .populate("meals")
              .exec()
          : null;

      return res.json({ status: "ok", user: token, role, authUser });
    } else {
      return res.json({ status: "error", user: false });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal Server Error" });
  }
});

// Sign up route

router.post("/signup", async (req, res) => {
  const user = req.body;
  const userModel = user.userType === "chef" ? Chef : User;

  try {
    const takenUsername = await userModel.findOne({ username: user.username });

    if (takenUsername) {
      return res.json({ status: "error", error: "username already taken" });
    }

    user.password = await bcrypt.hash(req.body.password, 10);

    const dbUser = new userModel({
      username: user.username.toLowerCase(),
      password: user.password,
      email: user.email,
      ...(user.userType === "chef" && {
        address: user.address,
        experienceLevel: user.experienceLevel,
      }),
    });

    await dbUser.save();
    return res.json({ status: "ok" });
  } catch (error) {
    console.error("An error occurred:", error);
    return res.json({ status: "error", error: "An error occurred" });
  }
});

module.exports = router;
