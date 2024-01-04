const express = require("express");
const {
  loginController,
  registerController,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/login", loginController);

router.post("/register", registerController);

router.get("/getusers", getAllUsers);

router.patch("/:userid", updateUser);

router.delete("/:userid", deleteUser);

module.exports = router;
