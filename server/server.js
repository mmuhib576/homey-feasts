const express = require("express");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
dotenv.config();

connectDB();
const cors = require("cors");

const app = express();
app.use(cors());
// app.use(
//   cors({
//     origin: ["https://mealy-client.vercel.app"],
//     methods: ["POST", "GET", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://mealy-client.vercel.app"
//   ); // Allow any origin
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", require("./routes/userRoutes"));

app.use("/chefs", require("./routes/chefRoutes"));

app.use("/meals", require("./routes/mealRoutes"));

app.use("/orders", require("./routes/orderRoutes"));

app.use("/blog", require("./routes/blogPostRoutes"));

app.use("/comments", require("./routes/blogCommentRoutes"));

app.use("/feedback", require("./routes/feedbackRoutes"));

app.use("/review", require("./routes/reviewRoutes"));

app.use("/payment", require("./routes/paymentRoutes"));

app.use("/auth", require("./routes/authRoutes"));

app.listen("5001", () => {
  console.log("server running on port 5001");
});
