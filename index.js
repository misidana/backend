const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const userRoute = require("./routes/userRoute");
const historyRoute = require("./routes/historyRoute");
const verifyToken = require("./middlewares/verifyToken");

const connectDB = mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    features: {
      auth: "/login, /register",
      reffLink: "/register?refferer=:username",
      history: "/history",
    },
  });
});

app.use(userRoute);
app.use("/history", verifyToken, historyRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
