const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_STRING).then(() => {
    console.log("DB connected");
  });
};

module.exports = connectDB;
